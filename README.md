# GiFlow

GiFlow is a web platform for sharing and viewing GIFs. It allows you to upload GIFs, store them in the backend, and access them from the frontend via an API. The platform is built with TypeScript, React, Node.js with Express, and MongoDB.

## Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- DataBase: MongoDB

## Installation

### Requirements

- Node.js >= 18
- npm >= 7
- MongoDB (Local or Atlas / Other)

### Clone the project and install dependencies

```bash
git clone https://github.com/sergiopen/GiFlow.git
cd GiFlow
npm install
npm run dev (if you changed the .env.example)
```

## Environment variables (FUNDAMENTAL)

#### To run this project, you will need to add the following environment variables to your `.env` file. Change your `.env.example` to `.env` accordingly.

### If you are working in local

#### backend/.env

`MONGO_URI=your_mongo_uri`

`JWT_SECRET=changethepassword`

> Only change `MONGO_URI` and `JWT_SECRET` if you are running MongoDB locally or Atlas / Other. The other keys can remain as defaults or blank for development.

#### frontend/.env

> You don't need to change nothing here

### If you are deploying to production

#### backend/.env

`PORT=your_production_port`

`MONGO_URI=your_production_mongo_uri`

`JWT_SECRET=your_jwt_secret`

`API_KEY=your_api_key`

`ANOTHER_API_KEY=your_other_api_key`

#### frontend/.env

`VITE_API_URL=https://your-production-backend-url.com`

> Make sure all production secrets are kept secure and never committed to the repository.
