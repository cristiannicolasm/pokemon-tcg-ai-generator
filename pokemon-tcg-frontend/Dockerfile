# Dockerfile para Vite/React
FROM node:22.12-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4173
CMD ["npm", "run", "dev", "--", "--host=0.0.0.0", "--port=4173"]