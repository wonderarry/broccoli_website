# Use Node.js to build the client
FROM node:18 as clientbuild
WORKDIR /app/client
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM nginx:latest
# Copy in the build files
COPY --from=clientbuild /app/client/build /usr/share/nginx/html
# Add the nginx configuration
COPY ./nginx/conf /etc/nginx/conf.d
COPY ./prodstart.sh .
RUN apt install certbot


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]