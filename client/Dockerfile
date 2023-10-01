# Use Node.js to build the client
FROM node:18 as clientbuild
WORKDIR /app/client
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM ubuntu/nginx
## System nginx setup ##

# # Install nginx
# RUN apt install nginx
# # Setup firewall
# RUN ufw allow 'Nginx Full'
# # Don't run nginx on reboot
# RUN systemctl disable nginx
# # Don't run nginx during image creation as well
# RUN systemctl stop nginx

## Setup for the website ##

# Copy in the build files
COPY --from=clientbuild /app/client/build /var/www/html/
# Add the nginx configuration
COPY ./nginx/conf/tournaments.megahello.ee.conf /etc/nginx/conf.d
RUN pwd

# Install certbot
RUN apt update
RUN apt install python3 python3-venv libaugeas0 -y
RUN python3 -m venv /opt/certbot/
RUN /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot certbot-nginx
RUN ln -s /opt/certbot/bin/certbot /usr/bin/certbot

RUN nginx -c /etc/nginx/nginx.conf


# Add in the production bash script
COPY ./prodstart.sh .
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]