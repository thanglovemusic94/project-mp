FROM node:14-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install
COPY . ./

RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build  /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 3005
CMD ["nginx","-g","daemon off;"]
