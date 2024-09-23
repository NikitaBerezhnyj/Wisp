# Dockerfile для client
FROM node:18

# Встановлення робочої директорії
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код
COPY . .

# Будуємо застосунок
RUN npm run build

# Виставляємо порт
EXPOSE 5173

# Запускаємо застосунок
CMD ["npm", "run", "dev"]
