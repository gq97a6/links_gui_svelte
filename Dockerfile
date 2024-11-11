# Use a multi-stage build to keep the image size small
FROM node:18 AS production

# Set working directory
WORKDIR /app

# Copy the build folder and package files
COPY build ./build
COPY package.json ./
COPY package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Command to run the app
CMD ["node", "build/index.js"]

#Build and push
#docker buildx build --platform linux/amd64,linux/arm64 -t gq97a6/images:link_svelte-1.0.0 --push .