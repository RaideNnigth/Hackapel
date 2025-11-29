# Use a small Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies (prod + dev, so nodemon is available if you want)
RUN npm install

# Copy the rest of the backend code
COPY . .

# Set env
ENV NODE_ENV=production

# Expose backend port
EXPOSE 3000

# Start the app
CMD ["npm", "start", "dev"]
