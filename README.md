# aplicacion-bancaria

Boilerplate inicial para el backend de la Aplicación Bancaria (NestJS + Sequelize + PostgreSQL).

## Estructura
- `src/` - código fuente
- `docker-compose.yml` - contenedor Postgres para desarrollo
- `.env.example` - variables de entorno (NO subir `.env` real)

## Quickstart
1. Copia `.env.example` a `.env` y ajusta variables.
2. `npm install`
3. Levanta Postgres (local o `docker-compose up -d`)
4. `npm run start:dev`


## Endpoints (quick)
- POST /api/users/register -> register (body: name, email, password)
- POST /api/users/login -> login (body: email, password)
- GET /api/users/me -> get current user (requires Authorization: Bearer <token>)
- POST /api/transactions -> create transfer (requires Authorization, body: receiver_id, amount, description?)
- GET /api/transactions -> list user's transactions (requires Authorization)
- GET /api/transactions/:id -> transaction details (requires Authorization)

## Run locally (dev)
1. Copy `.env.example` to `.env` and fill values.
2. `npm install`
3. Start Postgres (e.g. `docker-compose up -d`)
4. `npm run start:dev`
# aplicacion-bancaria
