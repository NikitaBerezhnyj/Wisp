# Dockerfile для server
FROM node:18

# Встановлення робочої директорії
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код
COPY . .

# Виставляємо порт
EXPOSE 3001

# Запускаємо сервер
CMD ["npm", "start"]

