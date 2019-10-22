FROM node:10
WORKDIR /app
COPY package.json /app
COPY server.js /app
COPY /server/ /app/server
COPY /test/ /app/test
COPY /config/ /app/config
RUN npm install
EXPOSE 3333
CMD [ "npm", "start" ]
