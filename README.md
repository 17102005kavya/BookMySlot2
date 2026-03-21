# Appointment Booking API

This project implements a **student-professor appointment booking system**.  
Students can view available slots and book appointments, while professors can manage their slots.

---

## 🛠️ Technologies Used

- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas (Mongoose ORM)  
- **Authentication:** JWT-based auth with role-based access  
- **Testing:** Postman  
- **Version Control:** Git

----
## 📝 API Endpoints

### **1. Authentication APIs**

| Endpoint | Method | Request Body | Description | Auth Required |
|----------|--------|--------------|-------------|---------------|
| `/auth/register` | POST | `{ "name", "email", "password", "role" }` | Register a new user (student or professor) | ❌ |
| `/auth/login` | POST | `{ "email", "password" }` | Login and get JWT token | ❌ |

---

### **2. Student APIs**

| Endpoint | Method | Request Body / Params | Description | Auth Required |
|----------|--------|---------------------|-------------|---------------|
| `/student/slots/:professorId` | GET | `professorId` in URL | Get all available slots for a professor | ✅ Student |
| `/student/book` | POST | `{ "professorId", "date", "time" }` | Book an appointment | ✅ Student |
| `/student/appointments` | GET | — | List all appointments booked by the student | ✅ Student |

---

### **3. Professor APIs** *(optional if implemented)*

| Endpoint | Method | Request Body / Params | Description | Auth Required |
|----------|--------|---------------------|-------------|---------------|
| `/professor/slots` | POST | `{ "date", "time" }` | Create available slots | ✅ Professor |
| `/professor/appointments` | GET | — | List all appointments booked with the professor | ✅ Professor |
| `/professor/slots/:slotId` | DELETE | `slotId` in URL | Delete a specific slot | ✅ Professor |

---

### **4. Notes**

- JWT authentication is required for all `/student` and `/professor` routes.  
- Role-based access: `authorizeRole("student")` for student routes, `authorizeRole("professor")` for professor routes.  

