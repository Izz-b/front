"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"

function SupervisorManagement({ onBack }) {
  const [supervisors, setSupervisors] = useState([])
  const [exams, setExams] = useState([])
  const [assignments, setAssignments] = useState([])
  const [rooms, setRooms] = useState([])
  const [notification, setNotification] = useState(null)
  const [newSupervisor, setNewSupervisor] = useState({
    user_id: "",
    exam_id: "",
    room_id: "",
  })

  useEffect(() => {
    fetchSupervisors()
    fetchExams()
    fetchRooms()
    fetchAssignments()
  }, [])

  const fetchSupervisors = async () => {
    // Replace with your actual API call if needed
    const mockSupervisors = [
      { invigilator_id: 1, user_id: 101 },
      { invigilator_id: 2, user_id: 102 },
    ]
    setSupervisors(mockSupervisors)
  }

  const fetchExams = async () => {
    const mockExams = [
      { exam_id: 1, subject: "Mathematics", date: "2023-06-15", time: "09:00" },
      { exam_id: 2, subject: "Physics", date: "2023-06-16", time: "14:00" },
    ]
    setExams(mockExams)
  }

  const fetchRooms = async () => {
    const mockRooms = [
      { room_id: 1, name: "Room A" },
      { room_id: 2, name: "Room B" },
    ]
    setRooms(mockRooms)
  }

  const fetchAssignments = async () => {
    const mockAssignments = [
      {
        invigilator_id: 1,
        exam_id: 1,
        room_id: 1,
        created_at: new Date().toISOString(),
      },
    ]
    setAssignments(mockAssignments)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewSupervisor((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSupervisor = (e) => {
    e.preventDefault()
    const { user_id, exam_id, room_id } = newSupervisor

    if (!user_id || !exam_id || !room_id) {
      setNotification("Veuillez remplir tous les champs pour ajouter un surveillant.")
      return
    }

    const newInvigilator = {
      ...newSupervisor,
      invigilator_id: Date.now(),
      created_at: new Date().toISOString(),
    }

    setSupervisors((prev) => [...prev, newInvigilator])
    setNotification("Nouveau surveillant ajouté.")
    setNewSupervisor({ user_id: "", exam_id: "", room_id: "" })
  }

  const autoAssignSupervisors = () => {
    const newAssignments = exams
      .map((exam) => {
        const availableSupervisors = supervisors.filter(
          (supervisor) =>
            !assignments.some(
              (assignment) =>
                assignment.exam_id === exam.exam_id &&
                assignment.invigilator_id === supervisor.invigilator_id
            )
        )

        if (availableSupervisors.length > 0) {
          const randomSupervisor =
            availableSupervisors[Math.floor(Math.random() * availableSupervisors.length)]
          const assignedRoom = rooms[Math.floor(Math.random() * rooms.length)]
          return {
            invigilator_id: randomSupervisor.invigilator_id,
            exam_id: exam.exam_id,
            room_id: assignedRoom.room_id,
            created_at: new Date().toISOString(),
          }
        }
        return null
      })
      .filter((assignment) => assignment !== null)

    setAssignments((prev) => [...prev, ...newAssignments])
    setNotification("Affectations automatiques effectuées.")
  }

  return (
    <div className="container">
      <h2 className="mb-4">Affectation des Surveillants</h2>
      {notification && (
        <div className="alert alert-info" role="alert">
          {notification}
        </div>
      )}
      <div className="row">
        {/* Left Column: List of current assignments */}
        <div className="col-md-6">
          <h3>Liste des Affectations</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Surveillant ID</th>
                <th>Examen ID</th>
                <th>Salle ID</th>
                <th>Créé le</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={`${assignment.invigilator_id}-${assignment.exam_id}`}>
                  <td>{assignment.invigilator_id}</td>
                  <td>{assignment.exam_id}</td>
                  <td>{assignment.room_id}</td>
                  <td>{new Date(assignment.created_at).toLocaleString()}</td>
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
              <label htmlFor="user_id" className="form-label">
                ID utilisateur
              </label>
              <input
                type="text"
                className="form-control"
                id="user_id"
                name="user_id"
                placeholder="ID utilisateur"
                value={newSupervisor.user_id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exam_id" className="form-label">
                Examen
              </label>
              <select
                id="exam_id"
                name="exam_id"
                className="form-select"
                value={newSupervisor.exam_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionner un examen</option>
                {exams.map((exam) => (
                  <option key={exam.exam_id} value={exam.exam_id}>
                    {exam.subject} - {exam.date}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="room_id" className="form-label">
                Salle
              </label>
              <select
                id="room_id"
                name="room_id"
                className="form-select"
                value={newSupervisor.room_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionner une salle</option>
                {rooms.map((room) => (
                  <option key={room.room_id} value={room.room_id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-between">
        <button onClick={autoAssignSupervisors} className="btn btn-warning">
          Affectation Automatique
        </button>
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
