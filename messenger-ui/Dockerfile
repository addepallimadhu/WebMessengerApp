FROM node:12.22 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn config set strict-ssl false
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]