# Base stage: Install dependencies and build app
FROM node:20 AS base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Rebuild native modules like bcrypt for the Docker environment
RUN npm rebuild bcrypt --build-from-source

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Development stage
FROM base AS dev
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# Production stage
FROM base AS prod
ENV NODE_ENV=production
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]