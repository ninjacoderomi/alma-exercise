# Project Setup and API Instructions

## Project Setup

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd tryalma-exercise
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

4. **Run the project:**
   ```sh
   npm start
   ```

## API Setup

1. **Start the API server:**
   ```sh
   npm run api
   ```

2. **API Endpoints:**
   - `GET /api/resource` - Fetches a list of resources.
   - `POST /api/resource` - Creates a new resource.
   - `PUT /api/resource/:id` - Updates a resource by ID.
   - `DELETE /api/resource/:id` - Deletes a resource by ID.

## Directory Structure

```
tryalma-exercise/
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── .env
├── .env.example
├── package.json
├── README.md
└── ...
```

- **src/api/controllers/**: Contains the API controllers.
- **src/api/models/**: Contains the database models.
- **src/api/routes/**: Contains the API route definitions.
- **src/api/services/**: Contains the business logic and services.
- **src/components/**: Contains reusable React components.
- **src/pages/**: Contains the page components.
- **src/styles/**: Contains the styling files.
- **src/utils/**: Contains utility functions.
