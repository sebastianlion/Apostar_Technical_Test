# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa un servidor para servir el frontend, por ejemplo, en el puerto 3001
EXPOSE 3001
CMD ["npm", "run", "start"]
# CMD ["npx", "serve", "-s", "build", "-l", "3001"]