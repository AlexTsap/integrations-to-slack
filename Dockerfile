FROM node:8.11.3

RUN mkdir -p /home/project
WORKDIR /home/project

COPY ./ ./

RUN npm i


CMD ["npm", "start"]
