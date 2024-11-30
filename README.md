Tech Stack
Frontend: React (Next.js)
Backend: REST API (express.js or similar)
Styling: Tailwind CSS for UI components
Icons: Material Icons (used for the delete button)
Installation
Prerequisites
Node.js and npm installed on your machine.
A running backend API that handles shop data (for CRUD operations).
Steps to Install
Clone the repository:

git clone https://github.com/your-username/shop-dashboard.git
cd shop-dashboard
Install dependencies:

npm install
Run the development server:

npm run dev
The application will be available at http://localhost:3000.

Backend API
Ensure you have a backend API running (for example, built with Node.js, Express) that handles the following endpoints:

GET /shops - Fetch all shops.
POST /shops - Add a new shop.
PUT /shops/:id - Update a shop.
DELETE /shops/:id - Delete a shop.
If you don't have a backend yet, you can set up a simple mock server or replace it with a real API.

Environment Variables
You may need to configure environment variables in a .env file for backend URL connections, for example:
NEXT_PUBLIC_API_URL=http://localhost:5000
