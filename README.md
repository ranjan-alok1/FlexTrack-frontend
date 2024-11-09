# FlexTrack

Flextrack is a fitness tracker app designed to help users manage and log their workouts efficiently. It allows users to add detailed workout entries, track calories burned, and analyze workout progress over time.

## Features
### Add Workouts:
Log workouts by category, sets, reps, weight, duration, and calories burned.
### Track Progress: 
Get a detailed breakdown of daily and weekly workout statistics.
### User Dashboard: 
View total calories burned, workout count, and other metrics.
### Dynamic Entry Validation:
Adds workouts by date, avoiding duplicate entries.

## Installation
### Clone the Repository:

#### bash
Copy code
git clone https://github.com/yourusername/flextrack.git
cd flextrack
#### Install Dependencies:

#### bash
Copy code
npm install
#### Environment Variables: 
Create a .env file with the following keys:
MONGO_URI: MongoDB URI
JWT_SECRET: Secret key for JWT authentication
REACT_APP_EMAILJS_USER_ID: EmailJS user ID for contact forms
REACT_APP_EMAILJS_SERVICE_ID: EmailJS service ID
REACT_APP_EMAILJS_TEMPLATE_ID: EmailJS template ID
### Run the App:
#### bash
Copy code
npm run dev
## Tech Stack
### Backend:
Node.js, Express
### Database:
MongoDB
## Usage
### Adding Workouts:
Use the provided format to log workouts:
### diff
Copy code
#Category
-Workout Name
-Sets x Reps
-Weight
-Duration (in minutes)
## Tracking: 
Access the dashboard to view workout stats and summaries.
Contact Form: Send queries or feedback via the contact form.
## Contributions
Feel free to fork the project, open issues, and submit pull requests for new features or bug fixes.

## License
This project is licensed under the MIT License.

