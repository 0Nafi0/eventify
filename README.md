# Eventify - Event Management Portal

Eventify is a comprehensive event management platform tailored for university clubs. It empowers club admins to organize events and enables students to browse, register, and manage their event participation. With dedicated dashboards for both students and admins, Eventify streamlines event management and enhances campus engagement.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features) - [Student Features](#student-features)
- [Admin Features](#admin-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Challenges & Advanced Features](#challenges--advanced-features)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

Eventify provides a user-friendly platform for university clubs to manage and attend events. The system supports two user roles—students and admins—with robust features for event registration, management, and participation tracking. Students can easily register for events and monitor their registrations, while admins have full control over event creation, modification, and attendee management.

---

## Features

### Student Features

- Browse Upcoming Events:View a list of all upcoming university club events.
- Register/Unregister for Events: Sign up for events or cancel registrations as needed.
- Personal Dashboard: Manage and view all registered events in one place.

### Admin Features

- Create New Events:Add events with details such as title, description, date, time, location, and optional images.
- Edit/Delete Events: Modify or remove events as required.
- View Event Attendees: Access a list of students registered for each event.
- Admin Dashboard: Monitor event stats, attendee counts, and event popularity.

---

## Tech Stack

Frontend:

- React
- Bootstrap 5
- Axios

Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

Deployment:

- Vercel (Frontend)
- Render (Backend)

---

## Installation

### Frontend

```bash
git clone https://github.com/0Nafi0/eventify.git
cd eventify/frontend
npm install
npm run dev
```

### Backend

```bash
cd ../backend
npm install
# Create a .env file with the following:
# MONGO_URI=your_mongodb_uri
# OPENAI_API_KEY=your_openai_api_key
npm run dev
```

---

## Usage

1. Start both the frontend and backend servers.
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. Register or log in as a Student or Admin.
4. Students can browse and register for events, and view their dashboard.
5. Admins can create, edit, or delete events and manage attendees from the admin dashboard.

---

## Challenges & Advanced Features

- Automatic Certificate Generator: Students can download participation certificates after events.
- Event Recommendations: (Planned) Suggests relevant events based on user interests.
- Event Search and Filters:(Planned) Search and filter events by category, date, or keyword.
- Dark Mode/Light Mode Toggle:Switch between dark and light themes.
- Admin Analytics Dashboard: View event statistics and attendee data.

## Deployment

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request.
