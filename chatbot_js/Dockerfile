FROM node:20-slim

# Instala Chromium (usado pelo whatsapp-web.js via puppeteer-core)
RUN apt-get update && \
    apt-get install -y chromium && \
    rm -rf /var/lib/apt/lists/*

# Caminho padrão do Chromium dentro da imagem
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia deps e instala
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta da API do chatbot
EXPOSE 3000

# Comando padrão
CMD ["npm", "start"]
