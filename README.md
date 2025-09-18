# LSCS Backend Exam – Products API

A simple RESTful Products API built with Node.js, Express, and MySQL. Implements full CRUD operations with input validation, layered architecture (routes → controllers → models → database), and proper HTTP status codes.


## Tech Stack
- **Backend:** Node.js + Express.js
- **Database:** MySQL 

**Dependencies:**
- **Validation:** `express-validator`
- **Environment config:** `dotenv`
- **Testing:** Jest + Supertest

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)
- **npm** or **yarn**

## Setup
1. Clone the repository:
	 ```powershell
	 git clone https://github.com/reniar-g/LSCS-Backend-Exam.git
	 ```

2. Navigate to the project directory:
	 ```powershell
	 cd LSCS-Backend-Exam
	 ```

3. Install dependencies:
	 ```powershell
	 npm install
	 ```
4. Create the database and table:
	 ```powershell
	 mysql -u root -p < schema.sql
	 ```
5. Copy `.env.example` to a new file `.env` and fill in with your credentials.
6. Start the server:
	 ```powershell
	 npm run dev
	 ```
	 Server defaults to `http://localhost:3000` ( can be overridden with `PORT` in `.env` file).

## Endpoints

| Method | Path             | Description                  | 
|--------|------------------|------------------------------|
| POST   | /products        | Create new product           | 
| GET    | /products        | List all products            | 
| GET    | /products/:id    | Get a product by its ID      | 
| PUT    | /products/:id    | Update product               |
| DELETE | /products/:id    | Delete product               |

## Automated Testing
Integration tests are implemented with Jest and Supertest:
- Covers all CRUD operations, validation, error cases, and edge scenarios.
- Tests use a real MySQL database and reset the products table before each run.
- To run tests:
	```powershell
	npm test
	```
- **Test file**: `tests/products.test.js`

## AI Usage Disclosure
Some parts of this codebase were created with the help of AI tools such as ChatGPT and Copilot. All code was reviewed and manually edited for correctness and clarity.

Generative AI was used in the following ways:
1. **Test File Creation**: Some Jest + Supertest integration tests for CRUD endpoints and validations were written with the help of AI.
2. **Documentation**: Assisted with README structure, setup instructions, and API documentation.
3. **Code Review**: Provided feedback on code questions, clarity, and errors.

## License
MIT – see `LICENSE`.

## Author

Developed by **[Rainer Gonzaga](https://github.com/reniar-g)**

