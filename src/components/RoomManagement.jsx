"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"

function RoomManagement({ onBack }) {
  const [rooms, setRooms] = useState([])
  const [exams, setExams] = useState([])
  const [reservations, setReservations] = useState([])
  const [departments, setDepartments] = useState([])
  const [activeView, setActiveView] = useState("main")
  const [notification, setNotification] = useState(null)

  const [newRoom, setNewRoom] = useState({
    subject: "",
    department_id: "",
    exam_date: "",
    start_time: "",
    end_time: "",
    difficulty: 1,
    coefficient: 1,
    is_duplicate: false,
  })

  const [newReservation, setNewReservation] = useState({
    exam_id: "",
    room_id: "",
  })

  useEffect(() => {
    // Fetch data from API or database
    // This is a placeholder. Replace with actual API calls.
    fetchRooms()
    fetchExams()
    fetchReservations()
    fetchDepartments()
  }, [])

  const fetchRooms = async () => {
    // Placeholder: Replace with actual API call
    const mockRooms = [
      { id: 1, name: "Salle 1", isReserved: true, reservationDate: "2023-06-15" },
      { id: 2, name: "Salle 2", isReserved: false, reservationDate: null },
      { id: 3, name: "Salle 3", isReserved: true, reservationDate: "2023-06-16" },
      { id: 4, name: "Salle 4", isReserved: false, reservationDate: null },
    ]
    setRooms(mockRooms)
  }

  const fetchExams = async () => {
    // Placeholder: Replace with actual API call
    const response = await fetch("/api/exams")
    const data = await response.json()
    setExams(data)
  }

  const fetchReservations = async () => {
    // Placeholder: Replace with actual API call
    const response = await fetch("/api/reservations")
    const data = await response.json()
    setReservations(data)
  }

  const fetchDepartments = async () => {
    // Placeholder: Replace with actual API call
    const response = await fetch("/api/departments")
    const data = await response.json()
    setDepartments(data)
  }

  const handleInputChange = (e, setterFunction) => {
    const { name, value, type, checked } = e.target
    setterFunction((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleAddRoom = async (e) => {
    e.preventDefault()
    // Placeholder: Replace with actual API call
    const response = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRoom),
    })
    if (response.ok) {
      setNotification("Salle ajoutée avec succès")
      fetchRooms()
      setNewRoom({
        subject: "",
        department_id: "",
        exam_date: "",
        start_time: "",
        end_time: "",
        difficulty: 1,
        coefficient: 1,
        is_duplicate: false,
      })
    } else {
      setNotification("Erreur lors de l'ajout de la salle")
    }
  }

  const handleAddReservation = async (e) => {
    e.preventDefault()
    // Placeholder: Replace with actual API call
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReservation),
    })
    if (response.ok) {
      setNotification("Réservation ajoutée avec succès")
      fetchReservations()
      setNewReservation({
        exam_id: "",
        room_id: "",
      })
    } else {
      setNotification("Erreur lors de l'ajout de la réservation")
    }
  }

  const renderMainView = () => (
    <div className="space-y-4">
      <button
        onClick={() => setActiveView("rooms")}
        className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Afficher les salles
      </button>
      <button
        onClick={() => setActiveView("addRoom")}
        className="w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Ajouter une salle
      </button>
      <button
        onClick={() => setActiveView("reservations")}
        className="w-full p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Réserver une salle
      </button>
    </div>
  )

  const renderRoomsView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Liste des salles</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom de la Salle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de Réservation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {room.isReserved ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Réservée
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Libre
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.reservationDate || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderAddRoomView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Ajouter une salle</h2>
      <form onSubmit={handleAddRoom} className="space-y-4">
        <input
          type="text"
          name="subject"
          value={newRoom.subject}
          onChange={(e) => handleInputChange(e, setNewRoom)}
          placeholder="Matière"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="department_id"
          value={newRoom.department_id}
          onChange={(e) => handleInputChange(e, setNewRoom)}
          placeholder="ID du département"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="exam_date"
          value={newRoom.exam_date}
          onChange={(e) => handleInputChange(e, setNewRoom)}
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          name="start_time"
          value={newRoom.start_time}
          onChange={(e) => handleInputChange(e, setNewRoom)}
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          name="end_time"
          value={newRoom.end_time}
          onChange={(e) => handleInputChange(e, setNewRoom)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="difficulty"
          value={newRoom.difficulty}
          onChange={(e) => handleInputChange(e, setNewRoom)}
          placeholder="Difficulté"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="coefficient"
          value={newRoom.coefficient}
          onChange={(e) => handleInputChange(e, setNewRoom)}
          placeholder="Coefficient"
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_duplicate"
            checked={newRoom.is_duplicate}
            onChange={(e) => handleInputChange(e, setNewRoom)}
            className="form-checkbox"
          />
          <span>Est une copie</span>
        </label>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Ajouter Salle
        </button>
      </form>
    </div>
  )

  const renderReservationsView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Réserver une salle</h2>
      <form onSubmit={handleAddReservation} className="space-y-4">
        <select
          name="exam_id"
          value={newReservation.exam_id}
          onChange={(e) => handleInputChange(e, setNewReservation)}
          className="w-full p-2 border rounded"
        >
          <option value="">Sélectionnez un examen</option>
          {exams.map((exam) => (
            <option key={exam.exam_id} value={exam.exam_id}>
              {exam.subject} - {exam.exam_date}
            </option>
          ))}
        </select>
        <select
          name="room_id"
          value={newReservation.room_id}
          onChange={(e) => handleInputChange(e, setNewReservation)}
          className="w-full p-2 border rounded"
        >
          <option value="">Sélectionnez une salle</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        <button type="submit" className="w-full p-2 bg-purple-500 text-white rounded">
          Réserver la Salle
        </button>
      </form>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Liste des Réservations</h3>
        <ul className="mt-2 space-y-2">
          {reservations.map((reservation) => (
            <li key={reservation.exam_room_id} className="p-2 bg-gray-100 rounded">
              Examen ID: {reservation.exam_id} - Salle ID: {reservation.room_id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{notification}</span>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Gestion des Salles et Examens</h1>
        <button onClick={onBack} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Retour
        </button>
      </div>
      {activeView === "main" && renderMainView()}
      {activeView === "rooms" && renderRoomsView()}
      {activeView === "addRoom" && renderAddRoomView()}
      {activeView === "reservations" && renderReservationsView()}
      {activeView !== "main" && (
        <button
          onClick={() => setActiveView("main")}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Retour au menu principal
        </button>
      )}
    </div>
  )
}

RoomManagement.propTypes = {
  onBack: PropTypes.func.isRequired,
}

export default RoomManagement

