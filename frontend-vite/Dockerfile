FROM node:24.4.1-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5137

CMD ["npm", "run", "dev", "--", "--host"]