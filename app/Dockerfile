FROM node:16-alpine AS DEV 

ENV PORT 3009
ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install --frozen-lockfile

COPY . /usr/src/app

RUN npm run build
EXPOSE 3009

# Running the app
CMD "npm" "run" "dev"
