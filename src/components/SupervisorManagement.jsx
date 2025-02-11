"use client"

import { useState } from "react"
import PropTypes from "prop-types"

function SupervisorManagement({ onBack }) {
  // ------------------ Data States ------------------
  const [supervisors, setSupervisors] = useState([
    { id: 1, name: "Surveillant 1", subject: "Mathématiques" },
    { id: 2, name: "Surveillant 2", subject: "Physique" },
    { id: 3, name: "Surveillant 3", subject: "Chimie" },
  ])
  const [supervisorReservations, setSupervisorReservations] = useState([])
  const [reservationData, setReservationData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    examSubject: "",
    location: "",
  })
  const [selectedSupervisor, setSelectedSupervisor] = useState("")

  // ------------------ Notification State ------------------
  const [notification, setNotification] = useState(null)

  // ------------------ Toggle States ------------------
  const [showSupervisorsList, setShowSupervisorsList] = useState(false)
  const [showAddSupervisorForm, setShowAddSupervisorForm] = useState(false)

  // ------------------ New Surveillant Form Data ------------------
  const [newSupervisor, setNewSupervisor] = useState({
    name: "",
    subject: "",
  })

  // ------------------ Handlers for Reservation ------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setReservationData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSupervisorChange = (e) => {
    setSelectedSupervisor(Number.parseInt(e.target.value, 10))
  }

  const handleReservationSubmit = (e) => {
    e.preventDefault()
    if (
      !selectedSupervisor ||
      !reservationData.date ||
      !reservationData.startTime ||
      !reservationData.endTime ||
      !reservationData.examSubject ||
      !reservationData.location
    ) {
      showNotification("Veuillez remplir tous les champs de réservation.")
      return
    }
    const supervisor = supervisors.find((sup) => sup.id === selectedSupervisor)
    if (!supervisor) {
      showNotification("Veuillez sélectionner un surveillant valide.")
      return
    }
    if (supervisor.subject.toLowerCase() === reservationData.examSubject.toLowerCase()) {
      showNotification("Le surveillant ne peut pas surveiller un examen de sa propre matière.")
      return
    }
    const existingReservations = supervisorReservations.filter(
      (res) => res.supervisor === selectedSupervisor && res.date === reservationData.date,
    )
    const newStart = new Date(`${reservationData.date}T${reservationData.startTime}`)
    const newEnd = new Date(`${reservationData.date}T${reservationData.endTime}`)
    const conflict = existingReservations.some((res) => {
      const existingStart = new Date(`${res.date}T${res.startTime}`)
      const existingEnd = new Date(`${res.date}T${res.endTime}`)
      return newStart < existingEnd && newEnd > existingStart
    })
    if (conflict) {
      showNotification("Conflit de réservation détecté pour ce surveillant.")
      return
    }
    const newReservation = {
      id: Date.now(),
      supervisor: selectedSupervisor,
      ...reservationData,
    }
    setSupervisorReservations((prev) => [...prev, newReservation])
    resetReservationForm()
    showNotification("Réservation du surveillant effectuée avec succès !")
  }

  const resetReservationForm = () => {
    setReservationData({
      date: "",
      startTime: "",
      endTime: "",
      examSubject: "",
      location: "",
    })
    setSelectedSupervisor("")
  }

  // ------------------ Handlers for Adding a Surveillant ------------------
  const handleNewSupervisorInputChange = (e) => {
    const { name, value } = e.target
    setNewSupervisor((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSupervisorSubmit = (e) => {
    e.preventDefault()
    if (!newSupervisor.name || !newSupervisor.subject) {
      showNotification("Veuillez renseigner le nom et la matière du surveillant.")
      return
    }
    const supervisorToAdd = {
      id: Date.now(),
      name: newSupervisor.name,
      subject: newSupervisor.subject,
    }
    setSupervisors((prev) => [...prev, supervisorToAdd])
    setNewSupervisor({ name: "", subject: "" })
    setShowAddSupervisorForm(false)
    showNotification("Surveillant ajouté avec succès !")
  }

  // ------------------ Notification Helper ------------------
  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  // ------------------ Component Render ------------------
  return (
    <div className="space-y-6">
      {notification && (
        <div className="fixed top-4 right-4 max-w-md bg-white border-l-4 border-green-500 rounded-lg shadow-lg p-4">
          <p className="text-green-700">{notification}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Affecter les surveillants</h2>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Retour
          </button>
        </div>

        {showSupervisorsList ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Liste des surveillants</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matière
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {supervisors.map((sup) => {
                  const supReservations = supervisorReservations.filter((res) => res.supervisor === sup.id)
                  const reservedDates = [...new Set(supReservations.map((r) => r.date))]
                  return (
                    <tr key={sup.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sup.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sup.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {supReservations.length > 0 ? (
                          <span className="text-red-600">Réservé le : {reservedDates.join(", ")}</span>
                        ) : (
                          <span className="text-green-600">Libre</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <button
              onClick={() => setShowSupervisorsList(false)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Retour
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setShowSupervisorsList(true)}
              className="mb-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Afficher les surveillants
            </button>

            {showAddSupervisorForm ? (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un surveillant</h3>
                <form onSubmit={handleAddSupervisorSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="newSupervisorName">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="newSupervisorName"
                      name="name"
                      value={newSupervisor.name}
                      onChange={handleNewSupervisorInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Ex. Surveillant 4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="newSupervisorSubject">
                      Matière
                    </label>
                    <input
                      type="text"
                      id="newSupervisorSubject"
                      name="subject"
                      value={newSupervisor.subject}
                      onChange={handleNewSupervisorInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Ex. Histoire"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                      Ajouter le surveillant
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddSupervisorForm(false)}
                      className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Réserver un surveillant</h3>
                <form onSubmit={handleReservationSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="supervisor">
                      Surveillant
                    </label>
                    <select
                      id="supervisor"
                      name="supervisor"
                      value={selectedSupervisor}
                      onChange={handleSupervisorChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sélectionnez un surveillant</option>
                      {supervisors.map((sup) => (
                        <option key={sup.id} value={sup.id}>
                          {sup.name} - Matière : {sup.subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="date">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={reservationData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="startTime">
                        Heure de début
                      </label>
                      <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={reservationData.startTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="endTime">
                        Heure de fin
                      </label>
                      <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={reservationData.endTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="examSubject">
                      Matière de l'examen
                    </label>
                    <input
                      type="text"
                      id="examSubject"
                      name="examSubject"
                      value={reservationData.examSubject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Ex. Biologie"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="location">
                      Lieu de l'examen
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={reservationData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Sélectionnez une salle</option>
                      <option value="Salle 1">Salle 1</option>
                      <option value="Salle 2">Salle 2</option>
                      <option value="Salle 3">Salle 3</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700"
                  >
                    Réserver le surveillant
                  </button>
                </form>
                <button
                  onClick={() => setShowAddSupervisorForm(true)}
                  className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                  Ajouter un surveillant
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

SupervisorManagement.propTypes = {
  onBack: PropTypes.func.isRequired,
}

export default SupervisorManagement

