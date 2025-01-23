FROM node:latest

WORKDIR /usr/src/api

COPY ./apps/backend .
COPY ./packages/core /usr/src/api/packages/core
COPY ./apps/backend/.env.production ./.env

RUN npm install --quiet --omit=optional --no-fund --log-level=error

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
