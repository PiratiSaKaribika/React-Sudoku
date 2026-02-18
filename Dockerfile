# BUILD THE APP

FROM node:22.14.0 AS build

# Make non-root group
RUN groupadd -r notroot && useradd -r -g notroot -m notroot

# Set work directory
WORKDIR /app

# Copy all package json files (package.json and package-lock.json)
COPY package*.json ./

# Set notroot ownership of workdir
RUN chown -R notroot .

# Set user to non-root
USER notroot

# Install modules (in this order to make use of caching)
RUN npm install

# Copy the rest of the files
COPY --chown=notroot:notroot . .

# Build the app
RUN npm run build



# SERVE STATIC FILES WITH NGINX

FROM nginx:alpine

# Copy static files to nginx html
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (http)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]