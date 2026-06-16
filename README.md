# Yala — Frontend

Frontend del marketplace de **subastas y venta directa de coleccionables geek** (Pokémon TCG, Funko Pop, comics) para LatAm. Precios en soles (S/.), interfaz en español.

Proyecto del curso **CS2031 — Desarrollo Basado en Plataformas (UTEC)**. Consume el backend de Yala (Spring Boot).

---

## Stack

- **Vite 5** + **React 18**
- **react-router-dom 6** (ruteo)
- Design system propio (bundle en `src/ds/`)
- Autenticación **JWT** contra el backend (access token 1h + refresh token 7d)

## Requisitos

- **Node.js** 18+ y npm
- El **backend de Yala** corriendo (ver [Conexión al backend](#conexión-al-backend))

## Puesta en marcha

```bash
npm install      # instalar dependencias
npm run dev      # dev server en http://localhost:5173
```

## Conexión al backend

Para evitar CORS en desarrollo, el frontend usa un **proxy de Vite**: todas las llamadas a `/api`
se reenvían a `http://localhost:8081` (configurado en `vite.config.js`).

Levantá el backend en modo local (usa **H2 en memoria**, no necesita PostgreSQL):

```bash
# desde la carpeta del backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=openapi          # Linux / macOS
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=openapi"    # Windows (PowerShell)
# → escucha en http://localhost:8081
```

> Con ese perfil el backend arranca **vacío**. Creá una cuenta desde la pantalla de registro para empezar a usar la app.

### Variable de entorno (opcional)

Por defecto el cliente usa la base relativa `/api/v1` (vía el proxy). Para apuntar a otro backend
(por ejemplo uno desplegado), creá un archivo `.env` en la raíz del frontend:

```
VITE_API_BASE_URL=https://tu-backend.com/api/v1
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Dev server con HMR en `:5173` |
| `npm run build` | Build de producción a `dist/` |
| `npm run preview` | Sirve localmente el build de producción |

## Estructura

```
src/
├── api/                 # Comunicación con el backend
│   ├── client.js        #   Fetch wrapper: base URL, JWT, refresh automático en 401
│   ├── auth.js          #   login / register / getCurrentUser / logout
│   └── tokens.js        #   Tokens en localStorage
├── auth/
│   └── AuthContext.jsx  # Estado de sesión global → hook useAuth()
├── ds/                  # Design system: componentes, tokens, íconos, mock data
├── screens/             # Pantallas de la app (Home, subastas, checkout, etc.)
├── App.jsx              # Router + layout + sistema de toasts
└── main.jsx             # Entry point (monta AuthProvider)
```

## Estado del proyecto

- ✅ 14 pantallas navegables (Home, detalle, subasta en vivo, checkout, dashboard de vendedor, admin…)
- ✅ Autenticación conectada al backend real (login / registro / tienda, sesión JWT con refresh)
- 🔲 En progreso: reemplazar la mock data (`src/ds/data.js`) por los endpoints reales
      (listings, subastas, órdenes, notificaciones, categorías)
- 🔲 Pendiente: tiempo real (WebSocket STOMP), checkout con MercadoPago, gate de verificación de identidad

## Convenciones

- **Código** (identificadores, comentarios) en inglés; **UI y textos** de cara al usuario en español.
- Cada pantalla inyecta su CSS al montar (patrón `ensure()`), usando los tokens del design system.
- Todo lo que toca el backend pasa por `src/api/` — las pantallas no hacen `fetch` directo.
