# EHR_System
# EHR System Frontend

A modern and responsive **Electronic Health Records (EHR) system** built using **React (Vite)** and **SCSS**, designed to manage patient records, doctor schedules, and appointments.

---

## Tech Stack

- **Frontend:** Vite + React
- **Styling:** SCSS / CSS Modules
- **State Management:** React Hooks (useState, useEffect)
- **Routing:** React Router
- **API Integration:** Fetch (REST API)
- **Backend (connected via API):** Node.js + MySQL (deployed on Render)

---

## Features

### User & Patient Module
- Login / Registration
- Role-based dashboards (Admin / Doctor / Patient)
- Patient profile management

### Appointments
- Book and manage appointments
- View schedule by date or doctor
- Real-time status updates (Pending / Approved)

### Medical Records
- View patient history
- Add/edit visit notes
- Secure access to sensitive health data

### Admin Dashboard
- Manage doctors, patients, and system users
- Analytics section (e.g., total patients, bookings, etc.)

### UI/UX
- Fully responsive layout
- SCSS modular design system
- Sidebar navigation with collapsible menus

---

## How to Run Locally

### Prerequisites

- Node.js ≥ 16
- NPM or Yarn

### 📥 Clone the Repository

```bash
git clone https://github.com/your-username/ehr-system-frontend.git
cd ehr-system-frontend
npm run dev
