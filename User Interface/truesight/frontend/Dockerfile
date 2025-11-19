FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies (this will be preserved by the named volume)
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 5173

# Install dependencies on start (ensures they're available even if volume mount overwrites)
# Then start dev server
CMD sh -c "npm install && npm run dev -- --host 0.0.0.0 --port 5173"

