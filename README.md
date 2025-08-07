# 🏥 CliniCare — Doctor Appointment Booking App

CliniCare is a basic doctor appointment booking system built using **React (frontend)** and **Django REST Framework (backend)**. It allows users to view a list of doctors and book appointments after logging in.

---

## 💡 Features

- View all available doctors
- Login as a user to:
  - Book an appointment with any doctor
  - View your own appointment list
- Protected routes for booking and viewing appointments
- Clean and responsive UI using TailwindCSS

---

## ⚙️ How to Use

### 1. Start the Backend API (Django)

- Install Django + Django REST Framework
- Create a Django superuser or use the default credentials below
- Add doctors and users using the Django admin panel:

```bash
python manage.py createsuperuser
```

Then visit `/admin/` to add:

- Doctors with name, department and speciality.
- Users who can log in and book appointments.

### 2. Start the Frontend (React)

Run these commands inside your React project:

```bash
npm install
npm start
```

Then open your browser and visit:  
http://localhost:3000

### 🔒 Authentication

- User login is done using email and password
- JWT tokens (access & refresh) are stored in localStorage
- If the user is not logged in:
  - Booking and appointment pages are protected and will redirect to login

---

### 📝 Notes

- You must add doctors and users from the Django admin panel before testing
- Backend APIs should expose the following endpoints:
  - POST `/api/users/login/`
  - GET `/api/users/me/`
  - GET `/api/doctors/`
  - POST `/api/appointments/`
  - GET `/api/appointments/` (for logged-in user)

---

### 🛠️ Tech Used

- React.js
- React Router
- TailwindCSS
- Axios
- Django + Django REST Framework

---

**Author**: Nishal NM  
**LinkedIn**: [https://linkedin.com/in/nishal-nm](https://linkedin.com/in/nishal-nm)
