FROM docker.otenv.com/ot-node-base-4.3:latest

ADD app /var/www/waitlist-dashboard
WORKDIR /var/www/waitlist-dashboard
ADD package.json /var/www/waitlist-dashboard/
RUN npm install

CMD ["node", "./server/bin/www"]
