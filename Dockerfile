# Use an official Node.js runtime as the base image
FROM node:18

# Cria o diretório de trabalho no contêiner
RUN mkdir -p /build/node_modules && chown -R node:node /build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /build

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package.json ./

# Muda o usuário para 'node' para rodar comandos com permissões não-root
USER node

# Instala as dependências da aplicação usando npm
RUN npm install

# Copia o código da aplicação para o diretório de trabalho
COPY --chown=node:node . .

# Garante permissões corretas para o diretório /app
RUN chmod -R 777 /app

# Executa o build da aplicação
RUN npm run build

# Exponha uma porta para a aplicação Node.js ouvir
EXPOSE 3000

# Inicia a aplicação Node.js
CMD ["npm", "run", "start"]
