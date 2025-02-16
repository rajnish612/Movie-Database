
# Movie & Product Management Platform

A modern full-stack web application built with React and Express for managing movies and e-commerce products. Features a clean, responsive UI and robust backend integration.

## Features

- Movie Management
  - Browse movie catalog
  - Add, edit, and remove movies
  - Search and filter functionality
  - Detailed movie information pages

- User Experience
  - Responsive design for all devices
  - Real-time updates
  - Fast and efficient data loading
  - Clean and intuitive interface

## Tech Stack

- **Frontend**
  - React 18 with TypeScript
  - Tailwind CSS for styling
  - React Query for state management
  - Wouter for routing

- **Backend**
  - Express.js
  - MongoDB with Mongoose
  - RESTful API architecture

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   MONGODB_URI=your_mongodb_uri
   PORT=5000
   QIKINK_API_KEY=your_qikink_api_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
└── shared/          # Shared TypeScript types
```

## API Endpoints

- `/api/movies` - Movie management


## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
