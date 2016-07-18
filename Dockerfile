FROM docker.otenv.com/ot-node-base-6:latest

ADD app /var/www/waitlist-dashboard
WORKDIR /var/www/waitlist-dashboard
ADD package.json /var/www/waitlist-dashboard/
RUN npm set registry "http://artifactory.otenv.com:8081/artifactory/api/npm/npm-virtual" \
  npm cache clear && npm install --production
# RUN npm install -g bower && bower --allow-root install

CMD ["node", "./server/bin/www"]
