FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g vite
COPY . .
# До релізний запуск
EXPOSE 5173
CMD ["npm", "run", "dev"]
# Запуск на релізі
# COPY --from=build /app/dist ./dist
# RUN npm install -g serve
# EXPOSE 5173
# CMD ["serve", "-s", "dist", "-l", "5173"]
