# syntax=docker/dockerfile:1

# Stage 1 - the build process
FROM node:18-slim as build-deps
ARG REACT_APP_SERVICES_URL
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 - the static server
FROM nginx:1.25.2
COPY --from=build-deps /usr/src/app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "'daemon off;'"]
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost/ || exit 1
