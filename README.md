# Funding Friends

## Description
Funding Friends is a full-stack donation site built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to make donations seamlessly while providing a user-friendly interface.

## Features
- **User Authentication**: Secure login and registration for users.
- **Donation System**: Make donations through a user-friendly interface.
- **Profile Management**: Users can view their donation history and manage their profiles.
- **Testing Mode**: Integrated with Stripe in testing mode for safe transactions.

## Technologies Used
- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Node.js, Express
- **Payment Processing**: Stripe

## Installation

### Prerequisites
- Node.js (v14 or later)

### Steps to Run the Application
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/figgynwtn/FundingFriends.git
   cd FundingFriends
   ```

2. **Set up the API**
   ```bash
   cd API
   npm install
   ```

3. **Run the API:**
   ```bash
   npm start
   ```
   The API will run on http://localhost:8080.

4. **Set Up the Client:**
   ```bash
   cd Client
   npm install
   ```

5. **Run the Client:**
   ```bash
   npm start
   ```

   The client will run on http://localhost:3000.

6. **Open Both Applications:** Make sure both the API and client are running 
   simultaneously.

## Testing the Application
### Test User Logins
You can test the login functionality with the following users. All passwords follow the format: Firstname1234 (with the first letter capitalized).

- Rebecca Howell
  - Email: rebecca.howell@example.com
  - Password: Rebecca1234
- Russell Wagner
  - Email: russell.wagner@example.com
  - Password: Russell1234
- Susan Rhodes
  - Email: susan.rhodes@example.com
  - Password: Susan1234
- Anne Grant
  - Email: anne.grant@example.com
  - Password: Anne1234
- Clifford Washington
  - Email: clifford.washington@example.com
  - Password: Clifford1234

### Stripe Testing
The application uses Stripe in testing mode, allowing you to make fake donations without actual charges. You can check your profile to see the new donations reflected there after testing.

## Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Any suggestions or improvements are welcome!

## License
This project is licensed under the MIT License - see the LICENSE file for details.
