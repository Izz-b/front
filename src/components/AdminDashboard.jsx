"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import RoomManagement from "./RoomManagement"
import SupervisorManagement from "./SupervisorManagement"
import RoomList from "./RoomList"

function AdminDashboard({ onLogout }) {
  const [exams, setExams] = useState([])
  const [notification, setNotification] = useState(null)
  const [formData, setFormData] = useState({
    subject: "",
    department_id: "",
    exam_date: "",
    start_time: "",
    end_time: "",
    difficulty: 1,
    coefficient: 1,
    is_duplicate: false,
  })

  const [showRoomManagement, setShowRoomManagement] = useState(false)
  const [showExamManagement, setShowExamManagement] = useState(false)
  const [showSupervisorManagement, setShowSupervisorManagement] = useState(false)
  const [showExamList, setShowExamList] = useState(false)
  const [showRoomList, setShowRoomList] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(formData).every((field) => field !== "")) {
      const newExam = { ...formData, id: Date.now() }
      setExams((prevExams) => [...prevExams, newExam])
      setFormData({
        subject: "",
        department_id: "",
        exam_date: "",
        start_time: "",
        end_time: "",
        difficulty: 1,
        coefficient: 1,
        is_duplicate: false,
      })
      setNotification("Examen ajouté avec succès!")
      setTimeout(() => setNotification(null), 3000)
    } else {
      setNotification("Veuillez remplir tous les champs")
      setTimeout(() => setNotification(null), 3000)
    }
  }

  if (showRoomManagement) {
    return <RoomManagement onBack={() => setShowRoomManagement(false)} />
  }

  if (showRoomList) {
    return <RoomList onBack={() => setShowRoomList(false)} />
  }

  if (showExamManagement) {
    return (
      <div className="space-y-6">
        {notification && (
          <div
            className="notification fixed top-4 right-4 max-w-md bg-white border-l-4 border-green-500 rounded-lg shadow-lg p-4"
            role="alert"
          >
            <p className="text-green-700">{notification}</p>
          </div>
        )}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Gérer les examens</h2>
            <button
              onClick={() => {
                setShowExamManagement(false)
                setShowExamList(false)
              }}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Retour
            </button>
          </div>

          {showExamList ? (
            <div>
              <div className="card-hover bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Liste des examens</h3>
                <div className="table-container">
                  {exams.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Matière
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Département
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Heure de début
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Heure de fin
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Difficulté
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Coefficient
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Est une copie
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {exams.map((exam) => (
                          <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.subject}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.department_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.exam_date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.start_time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.end_time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.difficulty}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.coefficient}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {exam.is_duplicate ? "Oui" : "Non"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Aucun examen ajouté pour le moment.</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowExamList(false)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Retour
              </button>
            </div>
          ) : (
            <div>
              <div className="card-hover bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un examen</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="subject">
                      Matière
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Entrez la matière"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="department_id">
                      ID du département
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="department_id"
                      type="number"
                      name="department_id"
                      value={formData.department_id}
                      onChange={handleInputChange}
                      placeholder="Entrez l'ID du département"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="exam_date">
                      Date de l'examen
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="exam_date"
                      type="date"
                      name="exam_date"
                      value={formData.exam_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="start_time">
                      Heure de début
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="start_time"
                      type="time"
                      name="start_time"
                      value={formData.start_time}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="end_time">
                      Heure de fin
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="end_time"
                      type="time"
                      name="end_time"
                      value={formData.end_time}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="difficulty">
                      Difficulté
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="difficulty"
                      type="number"
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      min="1"
                      max="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="coefficient">
                      Coefficient
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="coefficient"
                      type="number"
                      name="coefficient"
                      value={formData.coefficient}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="is_duplicate"
                        checked={formData.is_duplicate}
                        onChange={handleInputChange}
                        className="form-checkbox"
                      />
                      <span className="text-sm font-medium text-gray-700">Est une copie</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700"
                  >
                    Ajouter l'examen
                  </button>
                </form>
              </div>
              
            </div>
          )}
        </div>
      </div>
    )
  }

  if (showSupervisorManagement) {
    return <SupervisorManagement onBack={() => setShowSupervisorManagement(false)} />
  }

  return (
    <div className="space-y-6">
      {notification && (
        <div
          className="notification fixed top-4 right-4 max-w-md bg-white border-l-4 border-green-500 rounded-lg shadow-lg p-4"
          role="alert"
        >
          <p className="text-green-700">{notification}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Tableau de bord Administrateur</h2>
          <div className="flex items-center space-x-4">
            <div className="logo-container w-12 h-12">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZQPYIu2c4AQqymWsBvjL2lrdVIhe4s.png"
                alt="ISIM Logo"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setShowExamManagement(true)}
            className="card-hover bg-white p-4 rounded-lg shadow text-blue-600 font-medium hover:bg-blue-50 transition-colors"
          >
            Gérer les examens
          </button>
          
          <button
            onClick={() => setShowRoomManagement(true)}
            className="card-hover bg-white p-4 rounded-lg shadow text-blue-600 font-medium hover:bg-blue-50 transition-colors"
          >
            Gérer les salles
          </button>
          <button
            onClick={() => setShowSupervisorManagement(true)}
            className="card-hover bg-white p-4 rounded-lg shadow text-blue-600 font-medium hover:bg-blue-50 transition-colors"
          >
            Affecter les surveillants
          </button>
          <button className="card-hover bg-white p-4 rounded-lg shadow text-blue-600 font-medium hover:bg-blue-50 transition-colors">
            Dupliquer une session
          </button>
          <button className="card-hover bg-white p-4 rounded-lg shadow text-blue-600 font-medium hover:bg-blue-50 transition-colors">
            Envoyer le planning
          </button>
        </div>
      </div>
    </div>
  )
}

AdminDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export default AdminDashboard

