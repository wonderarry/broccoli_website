# Use Node.js to build the client
FROM node:18 as clientbuild
WORKDIR /app/client
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=clientbuild /app/client/build /usr/share/nginx/html
RUN apt install certbot


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]