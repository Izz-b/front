"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Select from "react-select"  // Import react-select

function ExamManagement({ onExamChange }) {
  const [exams, setExams] = useState([])
  const [currentExam, setCurrentExam] = useState({
    id: null,
    subject: "",
    date: "",
    duration: "",
    startDateTime: "",
    endDateTime: "",
    room: "",
    supervisor: "",
  })
  
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Fetch exams from API
    // Placeholder data
    const fetchExams = async () => {
      setExams([
        { id: 1, subject: "Mathématiques", date: "2023-06-15", duration: "2h", room: "Salle A", supervisor: "Prof. Dupont" },
        { id: 2, subject: "Physique", date: "2023-06-16", duration: "3h", room: "Salle B", supervisor: "Prof. Martin" },
      ])
    }
    fetchExams()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentExam((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, selectedOption) => {
    setCurrentExam((prev) => ({ ...prev, [name]: selectedOption ? selectedOption.value : "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isEditing) {
      setExams(exams.map((exam) => (exam.id === currentExam.id ? currentExam : exam)))
      onExamChange("update", currentExam)
    } else {
      const newExam = { ...currentExam, id: Date.now() }
      setExams([...exams, newExam])
      onExamChange("add", newExam)
    }
    resetForm()
  }

  const handleEdit = (exam) => {
    setCurrentExam(exam)
    setIsEditing(true)
  }

  const handleDelete = async (id) => {
    setExams(exams.filter((exam) => exam.id !== id))
    onExamChange("delete", { id })
  }

  const resetForm = () => {
    setCurrentExam({
      id: null,
      subject: "",
      date: "",
      duration: "",
      startDateTime: "",
      endDateTime: "",
      room: "",
      supervisor: "",
    })
    
    setIsEditing(false)
  }

  // Options for the select boxes
  const roomOptions = [
    { value: "Salle A", label: "Salle A" },
    { value: "Salle B", label: "Salle B" },
    { value: "Salle C", label: "Salle C" },
  ]
  
  const supervisorOptions = [
    { value: "Prof. Dupont", label: "Prof. Dupont" },
    { value: "Prof. Martin", label: "Prof. Martin" },
    { value: "Prof. Leclerc", label: "Prof. Leclerc" },
  ]
  
  const subjectOptions = [
    { value: "Mathématiques", label: "Mathématiques" },
    { value: "Physique", label: "Physique" },
    { value: "Chimie", label: "Chimie" },
  ]

  return (
    <div className="container">
      <h2 className="mb-4">Gérer les Examens</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Matière</label>
          <Select
            id="subject"
            name="subject"
            value={subjectOptions.find(option => option.value === currentExam.subject)}
            onChange={(selectedOption) => handleSelectChange("subject", selectedOption)}
            options={subjectOptions}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={currentExam.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Durée</label>
          <input
            type="text"
            className="form-control"
            id="duration"
            name="duration"
            value={currentExam.duration}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
  <label htmlFor="startDateTime" className="form-label">Heure Début</label>
  <input
    type="time"
    className="form-control"
    id="startDateTime"
    name="startDateTime"
    value={currentExam.startDateTime}
    onChange={handleInputChange}
    required
  />
</div>

<div className="mb-3">
  <label htmlFor="endDateTime" className="form-label">Heure Fin</label>
  <input
    type="time"
    className="form-control"
    id="endDateTime"
    name="endDateTime"
    value={currentExam.endDateTime}
    onChange={handleInputChange}
    required
  />
</div>

        
        <div className="mb-3">
          <label htmlFor="room" className="form-label">Salle</label>
          <Select
            id="room"
            name="room"
            value={roomOptions.find(option => option.value === currentExam.room)}
            onChange={(selectedOption) => handleSelectChange("room", selectedOption)}
            options={roomOptions}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="supervisor" className="form-label">Surveillant responsable</label>
          <Select
            id="supervisor"
            name="supervisor"
            value={supervisorOptions.find(option => option.value === currentExam.supervisor)}
            onChange={(selectedOption) => handleSelectChange("supervisor", selectedOption)}
            options={supervisorOptions}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Modifier l'examen" : "Ajouter l'examen"}
        </button>
        
  <button
    type="button"
    className="btn btn-warning"
    onClick={() => {
      // Placeholder logic for automatic assignment
      alert("Affectation automatique déclenchée ! (logique à implémenter)")
    }}
  >
    Affectation Automatique
  </button>


        {isEditing && (
          <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
            Annuler
          </button>

        )}
      </form>

      <h3>Liste des Examens</h3>
      <table className="table">
      <thead>
  <tr>
    <th>Matière</th>
    <th>Date</th>
    <th>Durée</th>
    <th>Date Début</th>
    <th>Date Fin</th>
    <th>Salle</th>
    <th>Surveillant</th>
    <th>Actions</th>
  </tr>
</thead>

<tbody>
  {exams.map((exam) => (
    <tr key={exam.id}>
      <td>{exam.subject}</td>
      <td>{exam.date}</td>
      <td>{exam.duration}</td>
      <td>{exam.startDateTime}</td>
      <td>{exam.endDateTime}</td>
      <td>{exam.room}</td>
      <td>{exam.supervisor}</td>
      <td>
        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(exam)}>
          Modifier
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(exam.id)}>
          Supprimer
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  )
}

ExamManagement.propTypes = {
  onExamChange: PropTypes.func.isRequired,
}

export default ExamManagement
