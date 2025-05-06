"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"

function RoomManagement({ onBack }) {
  const [rooms, setRooms] = useState([])
  const [reservations, setReservations] = useState([])
  const [currentReservation, setCurrentReservation] = useState({
    roomId: "",
    
    numberOfStudents: 0,
  })
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    // Fetch rooms and reservations data
    fetchRooms()
    fetchReservations()
  }, [])

  const fetchRooms = async () => {
    // This is a placeholder. Replace with actual API call
    const mockRooms = [
      { id: 1, name: "Salle A", capacity: 50 },
      { id: 2, name: "Salle B", capacity: 75 },
      { id: 3, name: "Salle C", capacity: 100 },
      { id: 4, name: "Salle D", capacity: 30 },
    ]
    setRooms(mockRooms)
  }

  const fetchReservations = async () => {
    // This is a placeholder. Replace with actual API call
    const mockReservations = [
      { id: 1, roomId: 1, examId: 1, date: "2023-06-15", startTime: "09:00", endTime: "11:00", numberOfStudents: 40 },
      { id: 2, roomId: 2, examId: 2, date: "2023-06-16", startTime: "14:00", endTime: "16:00", numberOfStudents: 60 },
    ]
    setReservations(mockReservations)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentReservation((prev) => ({ ...prev, [name]: value }))
  }

  const checkRoomAvailability = (roomId, date, startTime, endTime) => {
    return !reservations.some(
      (reservation) =>
        reservation.roomId === Number.parseInt(roomId) &&
        reservation.date === date &&
        ((startTime >= reservation.startTime && startTime < reservation.endTime) ||
          (endTime > reservation.startTime && endTime <= reservation.endTime) ||
          (startTime <= reservation.startTime && endTime >= reservation.endTime)),
    )
  }

  const findAlternativeRoom = (date, startTime, endTime, numberOfStudents) => {
    return rooms.find(
      (room) => room.capacity >= numberOfStudents && checkRoomAvailability(room.id, date, startTime, endTime),
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { roomId, date, startTime, endTime, numberOfStudents } = currentReservation
    const selectedRoom = rooms.find((room) => room.id === Number.parseInt(roomId))

    if (!selectedRoom) {
      setNotification("Veuillez sélectionner une salle valide.")
      return
    }

    if (selectedRoom.capacity < numberOfStudents) {
      setNotification(
        `Alerte : La capacité de la salle (${selectedRoom.capacity}) est insuffisante pour le nombre d'étudiants (${numberOfStudents}).`,
      )
      return
    }

    if (!checkRoomAvailability(roomId, date, startTime, endTime)) {
      const alternativeRoom = findAlternativeRoom(date, startTime, endTime, numberOfStudents)
      if (alternativeRoom) {
        setNotification(
          `La salle ${selectedRoom.name} n'est pas disponible. Salle alternative suggérée : ${alternativeRoom.name}`,
        )
      } else {
        setNotification(
          "Aucune salle disponible pour ce créneau. Veuillez choisir un autre horaire ou diviser les étudiants.",
        )
      }
      return
    }

    // If all checks pass, add the reservation
    const newReservation = {
      id: Date.now(),
      ...currentReservation,
      roomId: Number.parseInt(roomId),
    }
    setReservations([...reservations, newReservation])
    setNotification("Réservation ajoutée avec succès.")
    setCurrentReservation({
      roomId: "",
      
      numberOfStudents: 0,
    })
  }

  return (
    <div className="container">
      <h2 className="mb-4">Gestion des Salles</h2>
      {notification && (
        <div className="alert alert-info" role="alert">
          {notification}
        </div>
      )}
      <div className="row">
        <div className="col-md-6">
          <h3>Liste des Salles</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Capacité</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>{room.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h3>Ajouter une Salle</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomId" className="form-label">
                Salle
              </label>
              <select
                id="roomId"
                name="roomId"
                className="form-select"
                value={currentReservation.roomId}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionnez une salle</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} (Capacité: {room.capacity})
                  </option>
                ))}
              </select>
            </div>
            
            
            
            <div className="mb-3">
              <label htmlFor="numberOfStudents" className="form-label">
                Nombre étudiants
              </label>
              <input
                type="number"
                className="form-control"
                id="numberOfStudents"
                name="numberOfStudents"
                value={currentReservation.numberOfStudents}
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
      <div className="mt-4">
        <h3>Réservations actuelles</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Salle</th>
              <th>Examen ID</th>
              <th>Date</th>
              <th>Heure de début</th>
              <th>Heure de fin</th>
              <th>Nombre étudiants</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{rooms.find((room) => room.id === reservation.roomId)?.name}</td>
                <td>{reservation.examId}</td>
                <td>{reservation.date}</td>
                <td>{reservation.startTime}</td>
                <td>{reservation.endTime}</td>
                <td>{reservation.numberOfStudents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={onBack} className="btn btn-secondary mt-4">
        Retour
      </button>
    </div>
  )
}

RoomManagement.propTypes = {
  onBack: PropTypes.func.isRequired,
}

export default RoomManagement