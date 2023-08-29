# Expense Tracker Application

Welcome to the Expense Tracker application! The app allows users to track their expenses, manage their spending, and enjoy premium features for an enhanced experience.

## Features

- **User Authentication:** Users can sign up and log in securely using JSON Web Tokens (JWT).
- **Expense Creation:** Users can create new expenses by specifying the amount, description, and category.
- **Expense Deletion:** Users have the ability to delete their expenses, which are removed from the MySQL database.
- **Password Reset:** If a user forgets their password, they can initiate a password reset process and receive a reset link via email.
- **Premium Membership:** Users can upgrade to a premium membership that unlocks additional features.
- **Leaderboard:** Premium users can access a leaderboard that displays a list of all app users along with their total expense amounts.

## Premium Features

- **Leaderboard:** Premium users can view a leaderboard that showcases other users' total expense amounts, providing insights into spending habits.
- *More premium features will be added in the future!*

## Payment Integration

The application integrates with the Razorpy API for payment processing, allowing users to upgrade to premium membership seamlessly.


## Technologies Used

- Node.js: Server-side JavaScript runtime
- Express.js: Web application framework
- MySQL: Database management system
- JSON Web Tokens (JWT): User authentication
- Razorpy API: Payment gateway integration
- Nodemailer: Email sending library
