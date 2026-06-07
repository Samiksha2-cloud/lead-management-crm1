# Lead Management CRM

A full-stack Lead Management CRM application built for the Websites.co.in internship assignment.

## Live Demo

- Frontend: (https://lead-management-crm1.vercel.app/)
- Backend: https://lead-crm-backend-ifof.onrender.com/

## Features

- Add, view, edit and delete leads
- Lead status tracking (New, Contacted, Qualified, Converted, Lost)
- Search leads by name, email or company
- Filter leads by status
- Dashboard with lead statistics
- Pagination
- Responsive design

## Tech Stack

| Layer       | Technology           | Reason                                    |
| ----------- | -------------------- | ----------------------------------------- |
| Frontend    | React.js + Vite      | Fast, component-based UI development      |
| Styling     | Tailwind CSS         | Utility-first, responsive design quickly  |
| Routing     | React Router DOM     | Client-side navigation between pages      |
| HTTP Client | Axios                | Clean API calls from frontend to backend  |
| Backend     | Node.js + Express.js | Lightweight, fast REST API server         |
| Database    | MongoDB Atlas        | Flexible NoSQL, perfect for CRM data      |
| ODM         | Mongoose             | Schema validation and MongoDB interaction |
| Validation  | Express Validator    | Server-side input validation              |
| Dev Tool    | Nodemon              | Auto-restart server on file changes       |

## Project Structure

lead-crm/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── middleware/
│ │ └── errorHandler.js
│ ├── models/
│ │ └── Lead.js
│ ├── routes/
│ │ └── leads.js
│ ├── .env
│ ├── .gitignore
│ ├── package.json
│ └── server.js
└── frontend/
├── src/
│ ├── api/
│ │ └── leads.js
│ ├── components/
│ │ ├── Navbar.jsx
│ │ └── LeadCard.jsx
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── AddLead.jsx
│ │ └── EditLead.jsx
│ ├── App.jsx
│ └── index.css
└── package.json

## API Endpoints

| Method | Endpoint         | Description                                     |
| ------ | ---------------- | ----------------------------------------------- |
| GET    | /api/leads       | Get all leads (with search, filter, pagination) |
| GET    | /api/leads/stats | Get dashboard statistics                        |
| GET    | /api/leads/:id   | Get single lead                                 |
| POST   | /api/leads       | Create new lead                                 |
| PUT    | /api/leads/:id   | Update lead                                     |
| DELETE | /api/leads/:id   | Delete lead                                     |

## Setup Instructions

### Prerequisites

- Node.js v18+
- MongoDB Atlas account

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Developed By

Samiksha — B.Sc. Information Technology, Semester VI  
Internship Assignment — Websites.co.in
