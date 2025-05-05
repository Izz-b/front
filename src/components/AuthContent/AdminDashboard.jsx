"use client"

import { useState, useEffect } from "react"
import RoomManagement from "./RoomManagement"
import ExamManagement from "./ExamManagement"
import SupervisorManagement from "./SupervisorManagement"

function AdminDashboard() {
  const [activeView, setActiveView] = useState("main")
  const [exams, setExams] = useState([])
  const [invigilators, setInvigilators] = useState([])
  const [rooms, setRooms] = useState([])
  const [notifications, setNotifications] = useState([])
  const [filters, setFilters] = useState({
    date: "",
    subject: "",
    teacher: "",
    room: "",
    studyLevel: "",
  })
  const [showSupervisorManagement, setShowSupervisorManagement] = useState(false)

  // Fetch data (replace with actual API calls)
  useEffect(() => {
    // Fetch exams, invigilators, rooms, and notifications
    // setExams(fetchedExams)
    // setInvigilators(fetchedInvigilators)
    // setRooms(fetchedRooms)
    // setNotifications(fetchedNotifications)
  }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleExamChange = (action, exam) => {
    switch (action) {
      case "add":
        setExams([...exams, exam])
        addNotification(`Nouvel examen ajouté : ${exam.subject}`)
        break
      case "update":
        setExams(exams.map((e) => (e.id === exam.id ? exam : e)))
        addNotification(`Examen modifié : ${exam.subject}`)
        break
      case "delete":
        setExams(exams.filter((e) => e.id !== exam.id))
        addNotification(`Examen supprimé : ID ${exam.id}`)
        break
      default:
        console.error("Action non reconnue")
    }
  }

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, { id: Date.now(), message }])
    // Here you would also send notifications to students and supervisors
    // This is a placeholder for that functionality
    console.log("Notification sent to students and supervisors:", message)
  }

  const renderMainView = () => (
    <div className="container-fluid">
      <h2 className="mb-4">Planning Global</h2>
      <div className="row mb-4">
        <div className="col">
          <input
            type="date"
            className="form-control"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            placeholder="Filtrer par date"
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
            placeholder="Filtrer par matière"
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            name="teacher"
            value={filters.teacher}
            onChange={handleFilterChange}
            placeholder="Filtrer par enseignant"
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            name="room"
            value={filters.room}
            onChange={handleFilterChange}
            placeholder="Filtrer par salle"
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            name="studyLevel"
            value={filters.studyLevel}
            onChange={handleFilterChange}
            placeholder="Filtrer par niveau d'étude"
          />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Matière</th>
              <th>Enseignant</th>
              <th>Salle</th>
              <th>Surveillants</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.date}</td>
                <td>{exam.subject}</td>
                <td>{exam.supervisor}</td>
                <td>{exam.room}</td>
                <td>{exam.supervisor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderExamManagement = () => <ExamManagement onExamChange={handleExamChange} />

  const renderInvigilatorManagement = () => <SupervisorManagement onBack={() => setActiveView("main")} />

  const renderRoomManagement = () => (
    <div className="container">
      <h2 className="mb-4">Gestion des Salles</h2>
      <RoomManagement />
    </div>
  )

  const renderValidations = () => (
    <div className="container">
      <h2 className="mb-4">Validations</h2>
      <ul className="list-group">
        {notifications.map((notification) => (
          <li key={notification.id} className="list-group-item">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  )

  const renderScheduleSending = () => (
    <div className="container">
      <h2 className="mb-4">Envoi de Planning et Notifications</h2>
      <button className="btn btn-primary me-2">Envoyer le Planning par Email</button>
      <button className="btn btn-secondary">Envoyer une Notification de Changement</button>
    </div>
  )

  const renderSupervisorsManagement = () => <SupervisorManagement onBack={() => setActiveView("main")} />

  return (
    <div className="container-fluid pb-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Tableau de Bord Administrateur
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeView === "main" ? "active" : ""}`}
                  href="#"
                  onClick={() => setActiveView("main")}
                >
                  Planning Global
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeView === "exams" ? "active" : ""}`}
                  href="#"
                  onClick={() => setActiveView("exams")}
                >
                  Gestion des Examens
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${activeView === "supervisors" ? "active" : ""}`}
                  href="#"
                  onClick={() => setActiveView("supervisors")}
                >
                  Gestion des Surveillants
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeView === "rooms" ? "active" : ""}`}
                  href="#"
                  onClick={() => setActiveView("rooms")}
                >
                  Gestion des Salles
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeView === "validations" ? "active" : ""}`}
                  href="#"
                  onClick={() => setActiveView("validations")}
                >
                  Validations
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeView === "schedule" ? "active" : ""}`}
                  href="#"
                  onClick={() => setActiveView("schedule")}
                >
                  Envoi de Planning
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {activeView === "main" && renderMainView()}
      {activeView === "exams" && renderExamManagement()}
      {activeView === "invigilators" && renderInvigilatorManagement()}
      {activeView === "rooms" && renderRoomManagement()}
      {activeView === "validations" && renderValidations()}
      {activeView === "schedule" && renderScheduleSending()}
      {activeView === "supervisors" && renderSupervisorsManagement()}

      <div className="mt-4">
        <h3>Actions Rapides</h3>
        <button className="btn btn-outline-primary me-2 mb-2" onClick={() => setActiveView("exams")}>
          Gérer les Examens
        </button>
        <button className="btn btn-outline-secondary me-2 mb-2" onClick={() => setActiveView("invigilators")}>
          Gérer les Surveillants
        </button>
        <button className="btn btn-outline-info me-2 mb-2" onClick={() => setActiveView("rooms")}>
          Gérer les Salles
        </button>
        <button className="btn btn-outline-warning me-2 mb-2">Dupliquer une Session</button>
        <button className="btn btn-outline-success me-2 mb-2">Dupliquer le Calendrier</button>
      </div>
    </div>
  )
}

export default AdminDashboard
