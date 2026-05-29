# Resume Analyzer

A web application that analyzes resumes and provides AI-powered feedback and improvement suggestions.

## Features

* Upload and analyze resumes
* AI-generated feedback and recommendations
* Resume score evaluation
* Suggestions for improving content and structure
* User authentication using JWT
* Secure backend built with Node.js and Express
* MongoDB database integration

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt
* cookieParser

### AI

* Gemini API

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file

```env
PORT=3000
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development server

```bash
npm run dev
```

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

#### Login User

```http
POST /api/auth/login
```

#### Logout User

```http
POST /api/auth/logout
```

## Project Structure

```text
src/
├── controller/
├── db/
├── models/
├── routes/
├── utils/
├── app.js
server.js
```

## Future Improvements

* Refresh token authentication
* Role-based authorization
* Resume history tracking
* PDF parsing support
* Advanced AI recommendations

## Author

Harsh Yadav
