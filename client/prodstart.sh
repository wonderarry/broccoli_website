#!/bin/bash

# Step 1: Test and reload Nginx configuration
nginx -t
nginx

# Step 2: Request and renew the SSL certificate using Certbot
certbot --nginx -d tournaments.megahello.ee --email wonderarry@gmail.com --agree-tos -v

# Step 3: Make it run permanently
tail -f /dev/null