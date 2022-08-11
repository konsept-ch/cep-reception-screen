# syntax=docker/dockerfile:1

# Stage 1 - the build process
FROM node:16.16-alpine as build-deps
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.23-alpine
COPY --from=build-deps /usr/src/app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "'daemon off;'"]
