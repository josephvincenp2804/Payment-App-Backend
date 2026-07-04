# Payment Collection App - Backend

This is the **Node.js & Express** backend REST API for the Payment Collection project. It uses **Prisma ORM** with **PostgreSQL** to securely store loan details and track EMI payments.

## Features
- **Express.js API:** Fast and robust REST endpoints.
- **PostgreSQL Database:** Secure and scalable relational database schema.
- **Prisma ORM:** Type-safe database queries and migrations.
- **Robust Error Handling:** Input validation and structured JSON error responses.

---

## 1. Project Setup Steps

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL Database Server

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/josephvincenp2804/Payment-App-Backend.git
   cd Payment-App-Backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Create a `.env` file in the root directory.
   - Add your database connection string and port:
     ```
     PORT=5000
     DATABASE_URL="postgresql://username:password@localhost:5432/payment_collection?schema=public"
     ```
4. Initialize the Database:
   - Run Prisma migrations to generate the tables:
     ```bash
     npx prisma db push
     ```
   - Seed the database with sample customer profiles:
     ```bash
     npm run prisma:seed
     ```

---

## 2. How to Run Locally

To run the application in a local development environment:
1. Start the server using Nodemon for hot-reloading:
   ```bash
   npm run dev
   ```
2. The server will run on `http://localhost:5000`.
3. You can test the endpoints using Postman or cURL.

### API Endpoints
- **`GET /customers`**: Retrieve loan details of all customers.
- **`POST /payments`**: Process an EMI payment. Requires `{"account_number": "100001", "payment_amount": 5000}`.
- **`GET /payments/:account_number`**: Retrieve payment history for a specific account.

---

## 3. CI/CD Pipeline Configuration

The CI/CD pipeline for this backend is built using **GitHub Actions**. The configuration file is located at `.github/workflows/backend.yml`.

### Pipeline Workflow:
1. **Trigger:** Automatically runs when code is pushed to the `main` branch.
2. **Environment:** Executes on an `ubuntu-latest` virtual environment.
3. **Setup Node:** Installs Node.js v18.
4. **Dependency Installation:** Runs `npm ci` for a clean install.
5. **Code Validation:** Ensures the backend starts successfully and there are no syntax errors.

---

## 4. Deployment Steps on AWS EC2

This API is currently deployed live on a public AWS EC2 server. The deployment process follows these steps:

1. **Launch EC2 Instance:** An Ubuntu 24.04 server is launched.
2. **System Setup:** Node.js, npm, PostgreSQL, and PM2 are installed via the initialization script.
3. **Database Configuration:** A dedicated `payment_user` and `payment_collection` database are created securely in PostgreSQL.
4. **Code Retrieval:** The backend repository is cloned directly into `/home/ubuntu/app/payment-collection-backend`.
5. **Install & Migrate:** `npm install` and `npx prisma db push` are executed to prepare the database.
6. **PM2 Daemon:** The Express server is started using PM2 (`pm2 start src/server.js --name backend`) to ensure it runs continuously in the background.
7. **Nginx Reverse Proxy:** Nginx is configured to listen on port 80 and forward API requests to the local Node.js server running on port 5000.
8. **Live API URL:** `http://13.60.11.46/customers`

---

## 5. Screenshots

### PostgreSQL Database Evidence
Here is the proof that the application is successfully connected to and storing data inside a real PostgreSQL database on the AWS EC2 instance:

**Customers Table:**
![PostgreSQL Customers Table](docs/screenshots/postgres-customers.png)

**Payments Table:**
![PostgreSQL Payments Table](docs/screenshots/postgres-payments.png)
