# Use Node.js to build the client
FROM node:18 as clientbuild
RUN apt update
WORKDIR /app/client
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM ubuntu/nginx
RUN apt update
## Setup for the website ##

# Copy in the build files
RUN mkdir /var/www/html/broccwebsite
COPY --from=clientbuild /app/client/build /var/www/html/broccwebsite
# Add the nginx configuration
COPY ./nginx/conf/tournaments.megahello.ee.conf /etc/nginx/conf.d
RUN pwd

# Install certbot

RUN apt install python3 python3-venv libaugeas0 -y
RUN python3 -m venv /opt/certbot/
RUN /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot certbot-nginx
RUN ln -s /opt/certbot/bin/certbot /usr/bin/certbot


# Add in the production bash script
COPY ./prodstart.sh .
RUN chmod +x ./prodstart.sh
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]