# syntax=docker/dockerfile:1

# Stage 1 - the build process
FROM node:16.17-alpine as build-deps
ARG REACT_APP_SERVICES_URL
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
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost/ || exit 1
