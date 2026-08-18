# Simulador GNV - Clientes Nuevos - v11

Versión base: `2026.08.17.v1`.

## Cambios incorporados

1. **Origen de consulta obligatorio**
   - Campo
   - Base
   - Referido
   - El valor se registra en Google Sheets en la columna `OrigenConsulta`.

2. **Clave de usuario**
   - El usuario ingresa DNI + clave.
   - Las claves no se guardan en texto plano.
   - El backend genera hashes con `scrypt` + salt aleatorio.
   - El hash se guarda en `Usuarios.ClaveHash`.
   - La verificación ocurre únicamente en funciones backend de Vercel.

3. **Cambio de clave**
   - Botón `Cambiar clave` en la pantalla principal.
   - Se solicita clave actual, nueva clave y confirmación.
   - Política incluida: 8 a 64 caracteres, con al menos una mayúscula, una minúscula y un número.
   - Al actualizar correctamente:
     - `ForzarCambioClave = NO`
     - `FechaCambioClave = fecha/hora actual`
     - `FechaExpiracionClave = FechaCambioClave + DiasVigenciaClave`
     - `IntentosFallidos = 0`

4. **Cambio obligatorio cada 90 días**
   - Controlado por `Parametros.DiasVigenciaClave`.
   - Valor inicial: `90`.
   - También se respeta `Usuarios.ForzarCambioClave = SI`.

5. **Clave inicial**
   - Si `ClaveHash` está vacío, el backend valida contra `GNV_INITIAL_PASSWORD` de Vercel.
   - Ese acceso obliga inmediatamente a cambiar la clave.
   - Después de completar el enrolamiento de todos los usuarios, se recomienda retirar o rotar `GNV_INITIAL_PASSWORD`.

6. **Máximo diario de consultas**
   - Valor inicial global: `500`.
   - Se parametriza en `Parametros.LimiteDiarioDefault`.
   - `Usuarios.LimiteDiario` permite sobrescribir el valor para un usuario particular.
   - Si se quiere que un usuario herede el parámetro global, dejar su `LimiteDiario` vacío.
   - El control diario se mantiene en la hoja `ControlDiario` y se actualiza con `LockService` para evitar dobles registros concurrentes.
   - El límite se consume cuando una simulación se registra exitosamente en `Consultas`.

7. **Bloqueo por intentos fallidos**
   - `Parametros.MaxIntentosFallidos` inicia en `5`.
   - Al alcanzar ese valor se coloca `Bloqueado = SI`.
   - Un usuario bloqueado requiere intervención administrativa.

8. **Sesión segura de backend**
   - Luego de validar DNI + clave, Vercel entrega un token firmado y temporal.
   - `/api/registrar-consulta` obtiene el DNI desde el token y no confía en el DNI enviado por el navegador.
   - Duración actual del token: 8 horas.

## Hojas requeridas en Google Sheets

### `Consultas`
Cabecera incluida en:

`google-apps-script/headers.csv`

La nueva columna `OrigenConsulta` está ubicada después de `DNICliente`.

### `Usuarios`

```text
DNI
ClaveHash
Activo
LimiteDiario
ForzarCambioClave
FechaCambioClave
FechaExpiracionClave
UltimoAcceso
IntentosFallidos
Bloqueado
```

Puede copiarse aquí la información del Excel de usuarios preparado para el proyecto.

### `Parametros`

Valores iniciales:

```text
DiasVigenciaClave       90
LimiteDiarioDefault     500
MaxIntentosFallidos     5
ForzarCambioClaveInicial SI
```

### `ControlDiario`

```text
Fecha,DNIUsuario,Consultas
```

No es necesario mantenerla manualmente; Apps Script la actualiza.

## Actualización del Apps Script

1. Abrir el Google Sheet privado.
2. Ir a **Extensiones > Apps Script**.
3. Reemplazar el contenido anterior con `google-apps-script/Code.gs`.
4. En **Propiedades del script**, verificar `GNV_SHARED_SECRET`.
5. Ejecutar manualmente una vez la función `configurarHojas()` y autorizarla.
   - Si `Consultas` ya existe sin `OrigenConsulta`, la función inserta la columna después de `DNICliente`.
   - También crea `Usuarios`, `Parametros` y `ControlDiario` cuando falten.
6. Volver a desplegar el Web App usando **Administrar implementaciones > Editar > Nueva versión**.
7. Mantener la misma URL `/exec` o actualizar `GOOGLE_APPS_SCRIPT_URL` en Vercel si cambia.

## Variables de entorno de Vercel

Obligatorias:

```text
GOOGLE_APPS_SCRIPT_URL
GNV_SHARED_SECRET
GNV_INITIAL_PASSWORD
```

Recomendada:

```text
GNV_SESSION_SECRET
```

`AUTHORIZED_DNIS_JSON` deja de ser necesario en v11 porque la autorización se administra desde la hoja `Usuarios`.

Ninguna de estas variables debe tener prefijo `VITE_`.

## Primera puesta en marcha

1. Cargar los DNI en la hoja `Usuarios`.
2. Dejar `ClaveHash` vacío para los usuarios que todavía no se han enrolado.
3. Definir una clave temporal segura en `GNV_INITIAL_PASSWORD`.
4. Mantener `ForzarCambioClave = SI` inicialmente.
5. El usuario ingresa con la clave temporal.
6. El sistema obliga a definir una clave personal.
7. El backend guarda únicamente `salt:hash` en `ClaveHash`.
8. A los 90 días se vuelve a exigir cambio automáticamente.

## Consideraciones de seguridad

- No almacenar claves limpias en Google Sheets.
- No registrar claves en logs.
- No enviar `ClaveHash` al frontend.
- Mantener el Google Sheet privado.
- Restringir acceso al proyecto Vercel.
- Configurar `GNV_SHARED_SECRET`, `GNV_SESSION_SECRET` y `GNV_INITIAL_PASSWORD` como variables sensibles.
- Rotar la clave temporal después del enrolamiento inicial.

### Archivo de usuarios incluido

Se incluye `config/Usuarios_GNV_Control_Claves.xlsx` con los 381 DNI cargados.
Actualmente esos usuarios tienen `LimiteDiario = 500`, por lo que ese valor actúa como configuración individual. Si se desea administrar el límite únicamente desde `Parametros.LimiteDiarioDefault`, dejar vacía la columna `LimiteDiario` de los usuarios que deban heredar el valor global.
