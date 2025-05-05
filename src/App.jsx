"use client"

import { useState, useEffect } from "react"
import LoginForm from "./components/LoginForm"
import AdminDashboard from "./components/AuthContent/AdminDashboard"
import DepartmentHeadDashboard from "./components/AuthContent/DepartmentHeadDashboard"
import StudiesDirectorDashboard from "./components/AuthContent/StudiesDirectorDashboard"
import TeacherDashboard from "./components/AuthContent/TeacherDashboard"
import StudentDashboard from "./components/AuthContent/StudentDashboard"
import PWAInstallPrompt from "./components/PWAInstallPrompt"
import "./App.css"

function App() {
  const [userRole, setUserRole] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("ServiceWorker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("ServiceWorker registration failed: ", err)
          },
        )
      })
    }

    // Handle online/offline status
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [])

  const handleLogin = (role) => {
    setUserRole(role)
    // Store user role in localStorage for persistence
    localStorage.setItem("userRole", role)
  }

  const handleLogout = () => {
    setUserRole(null)
    // Clear user role from localStorage
    localStorage.removeItem("userRole")
  }

  // Check for stored user role on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole")
    if (storedRole) {
      setUserRole(storedRole)
    }
  }, [])

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
      {!isOnline && (
        <div className="offline-banner alert alert-warning m-0 text-center">
          Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent être limitées.
        </div>
      )}

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
                <span className="d-none d-md-inline">Calendrier des examens et de surveillance</span>
                <span className="d-inline d-md-none">Examens</span>
              </a>
              <button onClick={handleLogout} className="btn btn-outline-light">
                Déconnexion
              </button>
            </div>
          </nav>
          <main className="flex-grow-1 overflow-auto position-relative">{renderDashboard()}</main>
          <footer className="bg-dark text-white py-2">
            <div className="container text-center">
              <p className="mb-0 small">© 2024 ISIM. Tous droits réservés.</p>
            </div>
          </footer>
        </div>
      ) : (
        <div className="centered-layout">
          <div className="container">
            <PWAInstallPrompt />
            {renderDashboard()}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
