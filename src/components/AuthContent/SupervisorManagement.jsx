"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"

function SupervisorManagement({ onBack }) {
  const [supervisors, setSupervisors] = useState([])
  const [notification, setNotification] = useState(null)
  const [newSupervisor, setNewSupervisor] = useState({
    user_id: "",
    name: "",
    grade: "",
    subject: "",
  })

  useEffect(() => {
    fetchSupervisors()
  }, [])

  const fetchSupervisors = async () => {
    const mockSupervisors = [
      { user_id: "101", name: "Mme. Fatiha", grade: "A", subject: "Math" },
      { user_id: "102", name: "Mr. Karim", grade: "B", subject: "Physics" },
    ]
    setSupervisors(mockSupervisors)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewSupervisor((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSupervisor = (e) => {
    e.preventDefault()
    const { user_id, name, grade, subject } = newSupervisor

    if (!user_id || !name || !grade || !subject) {
      setNotification("Veuillez remplir tous les champs pour ajouter un surveillant.")
      return
    }

    const newEntry = {
      ...newSupervisor,
    }

    setSupervisors((prev) => [...prev, newEntry])
    setNotification("Nouveau surveillant ajouté.")
    setNewSupervisor({ user_id: "", name: "", grade: "", subject: "" })
  }

  return (
    <div className="container">
      <h2 className="mb-4">Gestion des Surveillants</h2>

      {notification && (
        <div className="alert alert-info" role="alert">
          {notification}
        </div>
      )}

      <div className="row">
        {/* Left Column: Supervisor list */}
        <div className="col-md-6">
          <h3>Liste des Surveillants</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Grade</th>
                <th>Matière</th>
              </tr>
            </thead>
            <tbody>
              {supervisors.map((sup, index) => (
                <tr key={`${sup.user_id}-${index}`}>
                  <td>{sup.user_id}</td>
                  <td>{sup.name}</td>
                  <td>{sup.grade}</td>
                  <td>{sup.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Column: Form to add a new supervisor */}
        <div className="col-md-6">
          <h3>Ajouter un Surveillant</h3>
          <form onSubmit={handleAddSupervisor}>
            <div className="mb-3">
              <label htmlFor="user_id" className="form-label">ID</label>
              <input
                type="text"
                className="form-control"
                id="user_id"
                name="user_id"
                value={newSupervisor.user_id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nom</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newSupervisor.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="grade" className="form-label">Grade</label>
              <input
                type="text"
                className="form-control"
                id="grade"
                name="grade"
                value={newSupervisor.grade}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Matière</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={newSupervisor.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </form>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-end">
        <button onClick={onBack} className="btn btn-secondary">
          Retour
        </button>
      </div>
    </div>
  )
}

SupervisorManagement.propTypes = {
  onBack: PropTypes.func.isRequired,
}

export default SupervisorManagement