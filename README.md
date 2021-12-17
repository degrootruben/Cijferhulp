# Cijferhulp
App om gemiddelden te berekenen en cijfers bij te houden.


## Project structure
### Backend
Alles onder `backend/` is voor de backend. Dit omvat de API en de database.

#### Development
Om de backend in een development environment te starten:
1. `cd backend`
2. `touch .env`
3. Vul de nodige waarden in het `.env` bestand volgens `.env.sample`
4. Start de backend en de dev database: `npm run dev`

Zorg ervoor dat je `npm run dev:down` na gebruik uitvoert zodat de dev database weer wordt afgesloten.

#### Testen
Om de backend te testen:
1. `cd backend`
2. `touch test/api-tests/.env`
3. Vul de nodige waarden in het `test/api-tests/.env` bestand volgens `test/api-tests/.env.sample`
3. Start een lege test database met het `docker-compose` bestand in `tests/api-tests/docker-run-test-database.yml` en start de backend: `npm run test:up`
4. Start jest: `npm run test`

Zorg ervoor dat je `npm run test:down` na gebruik uitvoert zodat de test database weer wordt afgesloten.


### Frontend
Alles onder `frontend/` is voor de React frontend, gemaakt met Create-React-App

#### Development
Start de frontend in dev mode met `cd frontend && yarn start`.

## Production
frontend wordt gehost op netlify
backend + postgresql wordt gehost op heroku


