FROM node:11-alpine

RUN mkdir -p /usr/local/bin

WORKDIR /usr/local/bin

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "start"]