#!/bin/bash

# Step 1: Test and reload Nginx configuration
nginx -t && nginx -s reload

# Step 2: Request and renew the SSL certificate using Certbot
certbot --nginx -d tournaments.megahello.ee --email wonderarry@gmail.com --agree-tos -v

# Step 3: Add a cron job to renew the certificate daily at 12:00 PM
(crontab -l ; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -