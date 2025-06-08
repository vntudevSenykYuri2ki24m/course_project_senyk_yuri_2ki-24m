FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache bash
RUN yarn install
RUN yarn add react-input-mask
EXPOSE 3000
CMD ["yarn", "start"]
