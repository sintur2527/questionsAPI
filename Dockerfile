FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /hammer-questions/server
COPY . /hammer-questions/server
RUN npm install
EXPOSE 4000
CMD npm start