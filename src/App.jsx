"use client"

import { useState } from "react"
import LoginForm from "./components/LoginForm"
import AdminDashboard from "./components/AdminDashboard"
import DepartmentHeadDashboard from "./components/DepartmentHeadDashboard"
import StudiesDirectorDashboard from "./components/StudiesDirectorDashboard"
import TeacherDashboard from "./components/TeacherDashboard"
import StudentDashboard from "./components/StudentDashboard"
import "./App.css"

function App() {
  const [userRole, setUserRole] = useState(null)

  const handleLogin = (role) => {
    setUserRole(role)
  }

  const handleLogout = () => {
    setUserRole(null)
  }

  const renderDashboard = () => {
    switch (userRole) {
      case "admin":
        return <AdminDashboard onLogout={handleLogout} />
      case "department-head":
        return <DepartmentHeadDashboard onLogout={handleLogout} />
      case "studies-director":
        return <StudiesDirectorDashboard onLogout={handleLogout} />
      case "teacher":
        return <TeacherDashboard onLogout={handleLogout} />
      case "student":
        return <StudentDashboard onLogout={handleLogout} />
      default:
        return <LoginForm onLogin={handleLogin} />
    }
  }

  return (
    <div className={`app-container ${userRole ? "logged-in" : ""}`}>
      {userRole ? (
        <div className="full-screen-layout">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <a className="navbar-brand d-flex align-items-center" href="#">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZQPYIu2c4AQqymWsBvjL2lrdVIhe4s.png"
                  alt="ISIM Logo"
                  className="me-2"
                  style={{ width: "40px", height: "40px" }}
                />
                <span>Calendrier des examens et de surveillance</span>
              </a>
              <button onClick={handleLogout} className="btn btn-outline-light">
                Déconnexion
              </button>
            </div>
          </nav>
          <main className="flex-grow-1 overflow-auto">{renderDashboard()}</main>
          <footer className="bg-dark text-white py-3">
            <div className="container text-center">
              <p className="mb-0">© 2024 ISIM. Tous droits réservés.</p>
            </div>
          </footer>
        </div>
      ) : (
        <div className="centered-layout">{renderDashboard()}</div>
      )}
    </div>
  )
}

export default App

