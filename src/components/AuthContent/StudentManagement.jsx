"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"

function StudentManagement({ onBack }) {
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [notification, setNotification] = useState(null)
  const [editingStudent, setEditingStudent] = useState(null)
  const [newStudent, setNewStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    filiere: "",
    createdAt: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    // Fetch students data
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    // This is a placeholder. Replace with actual API call
    const mockStudents = [
      {
        id: "STD001",
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean.dupont@example.com",
        filiere: "Informatique",
        createdAt: "2023-01-15",
      },
      {
        id: "STD002",
        firstName: "Marie",
        lastName: "Laurent",
        email: "marie.laurent@example.com",
        filiere: "Mathématiques",
        createdAt: "2023-02-20",
      },
      {
        id: "STD003",
        firstName: "Ahmed",
        lastName: "Benali",
        email: "ahmed.benali@example.com",
        filiere: "Physique",
        createdAt: "2023-03-10",
      },
      {
        id: "STD004",
        firstName: "Sophie",
        lastName: "Martin",
        email: "sophie.martin@example.com",
        filiere: "Chimie",
        createdAt: "2023-04-05",
      },
      {
        id: "STD005",
        firstName: "Thomas",
        lastName: "Petit",
        email: "thomas.petit@example.com",
        filiere: "Informatique",
        createdAt: "2023-05-12",
      },
    ]
    setStudents(mockStudents)
  }

  const handleNewStudentChange = (e) => {
    const { name, value } = e.target
    setNewStudent((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddStudent = (e) => {
    e.preventDefault()
    if (newStudent.firstName && newStudent.lastName && newStudent.id && newStudent.email && newStudent.filiere) {
      const studentWithId = {
        ...newStudent,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setStudents([...students, studentWithId])
      setNewStudent({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        filiere: "",
        createdAt: new Date().toISOString().split("T")[0],
      })
      setNotification("Étudiant ajouté avec succès.")
      setTimeout(() => setNotification(null), 3000)
    } else {
      setNotification("Veuillez remplir tous les champs obligatoires.")
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
  }

  const handleUpdateStudent = (e) => {
    e.preventDefault()
    setStudents(students.map((s) => (s.id === editingStudent.id ? editingStudent : s)))
    setEditingStudent(null)
    setNotification("Informations de l'étudiant mises à jour.")
    setTimeout(() => setNotification(null), 3000)
  }

  const handleEditingChange = (e) => {
    const { name, value } = e.target
    setEditingStudent((prev) => ({ ...prev, [name]: value }))
  }

  const handleDeleteStudent = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
      setStudents(students.filter((s) => s.id !== id))
      setNotification("Étudiant supprimé.")
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredStudents = students.filter((student) => {
    const searchTermLower = searchTerm.toLowerCase()
    return (
      student.id.toLowerCase().includes(searchTermLower) ||
      student.firstName.toLowerCase().includes(searchTermLower) ||
      student.lastName.toLowerCase().includes(searchTermLower) ||
      student.email.toLowerCase().includes(searchTermLower) ||
      student.filiere.toLowerCase().includes(searchTermLower)
    )
  })

  return (
    <div className="container">
      <h2 className="mb-4">Gestion des Étudiants</h2>
      {notification && (
        <div className="alert alert-info" role="alert">
          {notification}
        </div>
      )}

      <div className="row mb-4">
        <div className="col-md-6">
          <h3>Ajouter un nouvel étudiant</h3>
          <form onSubmit={handleAddStudent} className="mb-4">
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                ID
              </label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={newStudent.id}
                onChange={handleNewStudentChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Prénom
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={newStudent.firstName}
                onChange={handleNewStudentChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Nom
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={newStudent.lastName}
                onChange={handleNewStudentChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={newStudent.email}
                onChange={handleNewStudentChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="filiere" className="form-label">
                Filière
              </label>
              <select
                className="form-select"
                id="filiere"
                name="filiere"
                value={newStudent.filiere}
                onChange={handleNewStudentChange}
                required
              >
                <option value="">Sélectionner une filière</option>
                <option value="Informatique">Informatique</option>
                <option value="Mathématiques">Mathématiques</option>
                <option value="Physique">Physique</option>
                <option value="Chimie">Chimie</option>
                <option value="Biologie">Biologie</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Ajouter étudiant
            </button>
          </form>
        </div>

        <div className="col-md-6">
          {editingStudent && (
            <div className="mb-4">
              <h3>Modifier étudiant</h3>
              <form onSubmit={handleUpdateStudent}>
                <div className="mb-3">
                  <label htmlFor="edit-id" className="form-label">
                    ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit-id"
                    name="id"
                    value={editingStudent.id}
                    onChange={handleEditingChange}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-firstName" className="form-label">
                    Prénom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit-firstName"
                    name="firstName"
                    value={editingStudent.firstName}
                    onChange={handleEditingChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-lastName" className="form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit-lastName"
                    name="lastName"
                    value={editingStudent.lastName}
                    onChange={handleEditingChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="edit-email"
                    name="email"
                    value={editingStudent.email}
                    onChange={handleEditingChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-filiere" className="form-label">
                    Filière
                  </label>
                  <select
                    className="form-select"
                    id="edit-filiere"
                    name="filiere"
                    value={editingStudent.filiere}
                    onChange={handleEditingChange}
                    required
                  >
                    <option value="">Sélectionner une filière</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Mathématiques">Mathématiques</option>
                    <option value="Physique">Physique</option>
                    <option value="Chimie">Chimie</option>
                    <option value="Biologie">Biologie</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-createdAt" className="form-label">
                    Date de création
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="edit-createdAt"
                    name="createdAt"
                    value={editingStudent.createdAt}
                    onChange={handleEditingChange}
                    disabled
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    Enregistrer
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingStudent(null)}>
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3>Liste des étudiants</h3>
        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un étudiant (ID, nom, prénom, email, filière...)"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Filière</th>
                <th>Date de création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.filiere}</td>
                    <td>{student.createdAt}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEditStudent(student)}>
                          Modifier
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteStudent(student.id)}>
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    {searchTerm ? "Aucun étudiant ne correspond à votre recherche." : "Aucun étudiant enregistré."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <button onClick={onBack} className="btn btn-secondary mt-2">
        Retour
      </button>
    </div>
  )
}

StudentManagement.propTypes = {
  onBack: PropTypes.func.isRequired,
}

export default StudentManagement