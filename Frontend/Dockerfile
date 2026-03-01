# Frontend Dockerfile - builds the Vite/React app and serves it with nginx

# 1. build stage
FROM node:20-alpine AS build
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci

# copy source and build
COPY . .
RUN npm run build

# 2. production stage
FROM nginx:alpine

# copy custom nginx configuration (overwrites default)
COPY nginx.conf /etc/nginx/nginx.conf

# copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# expose port and run nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
