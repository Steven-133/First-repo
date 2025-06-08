# Accounting System - Login & Dashboard
 
A modern web-based accounting system with Firebase integration, featuring user authentication, role-based access control, and real-time database functionality.
 
## Features
 
- **User Authentication**: Secure login system with Firebase Realtime Database
- **Role-Based Access**: Different dashboard views for admin and regular users
- **Real-Time Data**: Live synchronization with Firebase for user sessions and activities
- **Responsive Design**: Modern, professional accounting-themed interface
- **Activity Logging**: Automatic tracking of user login/logout activities
- **Session Management**: Real-time session tracking and management
 
## Technology Stack
 
- **Frontend**: HTML5, CSS3, JavaScript (ES6)
- **Backend**: Firebase Realtime Database
- **Authentication**: Custom authentication with Firebase
- **Styling**: Modern CSS with gradients and animations
- **Database**: Firebase Realtime Database for user data and sessions
 
## Project Structure
 
```
├── index.html              # Main HTML file with login and dashboard
├── style.css               # Modern CSS styling with accounting theme
├── script.js               # JavaScript logic and Firebase integration
├── firebase-config.js      # Firebase configuration (legacy)
└── README.md              # This file
```
 
## Database Structure
 
The Firebase Realtime Database uses the following structure:
 
```json
{
  "users": {
    "username": {
      "email": "user@example.com",
      "name": "User Name",
      "password": "hashed_password",
      "role": "admin|user"
    }
  },
  "sessions": {
    "username": {
      "active": true,
      "loginTime": "6/1/2025, 4:11 PM",
      "timestamp": 1748765496915
    }
  },
  "activities": {
    "activityId": {
      "activity": "User logged in successfully",
      "timestamp": 1748765496915,
      "time": "6/1/2025, 4:11 PM",
      "user": "username"
    }
  }
}
```
 
## Setup Instructions
 
### 1. Firebase Configuration
 
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Realtime Database
3. Copy your Firebase configuration and update the `firebaseConfig` object in `script.js`
 
### 2. Database Rules
 
Set up Firebase Realtime Database rules for security:
 
```json
{
  "rules": {
    "users": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "sessions": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "activities": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```
 
### 3. Initial Setup
 
The system automatically initializes with demo users when first loaded. The initialization happens in the `initializeDemoUsers()` function.
 
## User Roles
 
### Admin Users
- Full dashboard access
- Can manage users, generate reports, access system settings
- Additional action buttons: Add User, System Settings, Manage Database, User Permissions
 
### Regular Users
- Limited dashboard access
- Can view profile, generate reports, view analytics
- Restricted action buttons based on permissions
 
## Usage
 
### Login
1. Open `index.html` in a web browser
2. The system will automatically initialize demo users in Firebase
3. Use any valid credentials to log in
4. The dashboard will load based on your user role
 
### Dashboard Features
- **Real-time Statistics**: User count, active sessions, revenue, growth metrics
- **Activity Feed**: Live feed of recent user activities
- **Quick Actions**: Role-based action buttons
- **Session Management**: Automatic session tracking and logout functionality
 
## Features in Detail
 
### Authentication System
- Validates credentials against Firebase Realtime Database
- Creates secure sessions with timestamps
- Supports role-based access control
- Automatic session cleanup on logout
 
### Real-time Updates
- Live activity feed updates
- Session status tracking
- User statistics updates
- Automatic data synchronization
 
### Security Features
- Password validation
- Session management
- Activity logging
- Secure Firebase integration
 
## Deployment on Replit
 
This project is designed to work seamlessly on Replit:
 
1. Fork this repository
2. Update Firebase configuration with your project details
3. Click the Run button to start the static web server
4. Open the preview to access your accounting system
 
## Customization
 
### Adding New Users
Users can be added directly to the Firebase database or through the admin interface (when implemented).
 
### Styling
The CSS uses a professional accounting theme with:
- Green and blue color scheme
- Modern gradients and animations
- Responsive design for all devices
- Professional typography
 
### Functionality
Extend the system by:
- Adding new dashboard widgets
- Implementing additional user roles
- Creating detailed reporting features
- Adding data export capabilities
 
## Browser Compatibility
 
- Chrome (recommended)
- Firefox
- Safari
- Edge
 
## License
This project is open source and available under the MIT License.