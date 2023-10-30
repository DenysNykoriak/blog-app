# Blog App

Created by Denys Nykoriak

## Init Guide

1. Add .env files to `/server` and `/client`

2. Run development Docker Compose

   - `docker compose -f docker-compose.dev.yml --env-file ./server/.env up --build -d`

3. Go to `/server` and run init command

   - `yarn migratedb`

4. Run server app

   - development: `yarn start:dev`
   - production: `yarn build` , `yarn start`

5. Run client app

   - development: `yarn dev`
   - production: `yarn build` , `yarn start`
