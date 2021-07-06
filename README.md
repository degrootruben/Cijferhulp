# Cijferhulp
App om gemiddelden te berekenen en cijfers bij te houden


## Project structure
`docker-compose up` om dev database te starten, deze heeft pgAdmin en een standaard postgres database

Alles onder `src/` is back-end code, in Typescript

Alles onder `frontend/` is de React front-end code, gemaakt met cra

In het `.env` bestand moet nu voor dev purposes deze parameters worden gegeven:
    SCHOOL=
    USERNAME_SOM=
    PASSWORD=

    PGUSER=postgres
    PGHOST=localhost
    PGPASSWORD=postgres
    PGDATABASE=cijferhulp
    PGPORT=5432

