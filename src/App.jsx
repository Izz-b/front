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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="blue-gradient shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="logo-container">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZQPYIu2c4AQqymWsBvjL2lrdVIhe4s.png"
                alt="ISIM Logo"
                className="w-full h-full"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">Calendrier des examens et de surveillance</h1>
          </div>
          {userRole && (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium button-hover"
            >
              Déconnexion
            </button>
          )}
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">{renderDashboard()}</div>
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 ISIM. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

