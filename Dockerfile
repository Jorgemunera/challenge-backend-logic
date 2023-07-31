FROM node:14

WORKDIR /app

COPY backend_challenge.js /app/

RUN npm install

CMD ["node", "backend_challenge.js"]

