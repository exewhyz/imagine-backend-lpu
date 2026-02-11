# Imagine Backend

Express-based API for user auth and image generation using Google Gemini.

## Features

- User registration and login with JWT
- Protected image generation and retrieval
- Simple in-memory storage for users/images (placeholder for DB)

## Requirements

- Node.js 18+ (recommended)
- npm

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

````ini
PORT=4000
GEMINI_API_KEY=your_api_key
JWT_SECRET=your_secret
JWT_EXPIRE_TIME=24h
MONGODB_URI="add-your-db-url"
CLOUDINARY_API_SECRET="add-your-cloudinary-secret-key"
````

## How to Run

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your actual values.

3. **Start the server:**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:4000` (or your configured PORT).