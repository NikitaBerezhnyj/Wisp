FROM node:22.7.0-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g nodemon
RUN npm install -g dotenv
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
