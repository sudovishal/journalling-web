FROM node:20-alpine3.17
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]
EXPOSE 3000
