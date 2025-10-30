FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=build /app ./
EXPOSE 3000

ENV NODE_ENV=production
CMD ["npm", "start"]
