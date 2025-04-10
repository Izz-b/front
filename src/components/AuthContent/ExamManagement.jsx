"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"

function ExamManagement({ onExamChange }) {
  const [exams, setExams] = useState([])
  const [currentExam, setCurrentExam] = useState({
    id: null,
    subject: "",
    date: "",
    duration: "",
    room: "",
    supervisor: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Fetch exams from API
    // This is a placeholder. Replace with actual API call
    const fetchExams = async () => {
      // const response = await fetch('/api/exams');
      // const data = await response.json();
      // setExams(data);
      setExams([
        {
          id: 1,
          subject: "Mathématiques",
          date: "2023-06-15",
          duration: "2h",
          room: "Salle A",
          supervisor: "Prof. Dupont",
        },
        { id: 2, subject: "Physique", date: "2023-06-16", duration: "3h", room: "Salle B", supervisor: "Prof. Martin" },
      ])
    }
    fetchExams()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentExam((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isEditing) {
      // Update existing exam
      // const response = await fetch(`/api/exams/${currentExam.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(currentExam)
      // });
      // if (response.ok) {
      setExams(exams.map((exam) => (exam.id === currentExam.id ? currentExam : exam)))
      onExamChange("update", currentExam)
      // }
    } else {
      // Add new exam
      // const response = await fetch('/api/exams', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(currentExam)
      // });
      // if (response.ok) {
      //   const newExam = await response.json();
      const newExam = { ...currentExam, id: Date.now() }
      setExams([...exams, newExam])
      onExamChange("add", newExam)
      // }
    }
    resetForm()
  }

  const handleEdit = (exam) => {
    setCurrentExam(exam)
    setIsEditing(true)
  }

  const handleDelete = async (id) => {
    // Delete exam
    // const response = await fetch(`/api/exams/${id}`, { method: 'DELETE' });
    // if (response.ok) {
    setExams(exams.filter((exam) => exam.id !== id))
    onExamChange("delete", { id })
    // }
  }

  const resetForm = () => {
    setCurrentExam({ id: null, subject: "", date: "", duration: "", room: "", supervisor: "" })
    setIsEditing(false)
  }

  return (
    <div className="container">
      <h2 className="mb-4">Gérer les Examens</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Matière
          </label>
          <input
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={currentExam.subject}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
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
          <label htmlFor="duration" className="form-label">
            Durée
          </label>
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
          <label htmlFor="room" className="form-label">
            Salle
          </label>
          <input
            type="text"
            className="form-control"
            id="room"
            name="room"
            value={currentExam.room}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="supervisor" className="form-label">
            Surveillant responsable
          </label>
          <input
            type="text"
            className="form-control"
            id="supervisor"
            name="supervisor"
            value={currentExam.supervisor}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Modifier l'examen" : "Ajouter l'examen"}
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

