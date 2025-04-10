import PropTypes from "prop-types"
import { useState, useEffect } from "react"

function StudiesDirectorDashboard({ onLogout }) {
  const [globalSchedule, setGlobalSchedule] = useState([])
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Mock data for the global schedule (could be replaced by an API call)
    const mockSchedule = [
      { id: 1, exam: "Mathématiques", department: "Sciences", date: "2023-06-15", time: "09:00-11:00", room: "Salle A" },
      { id: 2, exam: "Physique", department: "Sciences", date: "2023-06-16", time: "13:00-15:00", room: "Salle B" },
      { id: 3, exam: "Histoire", department: "Lettres", date: "2023-06-17", time: "10:00-12:00", room: "Salle C" },
    ]
    setGlobalSchedule(mockSchedule)

    // Mock data for notifications from departments
    const mockNotifications = [
      { id: 1, department: "Sciences", message: "Planning validé par le chef de département Sciences." },
      { id: 2, department: "Lettres", message: "Modification demandée sur l'examen d'Histoire." },
    ]
    setNotifications(mockNotifications)
  }, [])

  const handleValidatePlanning = () => {
    // Implement validation logic here
    alert("Le planning global a été validé.")
  }

  const handleFinalSend = () => {
    // Implement final sending logic here (e.g., sending emails to teachers and students)
    alert("L'envoi final du planning a été approuvé.")
  }

  const handleContact = () => {
    // Implement contact logic here (e.g., open a messaging modal or redirect to a contact form)
    alert("Ouverture du canal de communication avec les administrateurs et chefs de département.")
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800">
          Tableau de bord Directeur des Études
        </h2>
        <button onClick={onLogout} className="btn btn-outline-primary me-2 mb-2">
          Déconnexion
        </button>
      </div>

      {/* Global Schedule Section */}
      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h3 className="text-lg font-semibold mb-4">Planning Global de l'Institution</h3>
        {globalSchedule.length > 0 ? (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Examen</th>
                <th className="px-4 py-2 border">Département</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Heure</th>
                <th className="px-4 py-2 border">Salle</th>
              </tr>
            </thead>
            <tbody>
              {globalSchedule.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border">{item.exam}</td>
                  <td className="px-4 py-2 border">{item.department}</td>
                  <td className="px-4 py-2 border">{item.date}</td>
                  <td className="px-4 py-2 border">{item.time}</td>
                  <td className="px-4 py-2 border">{item.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun planning disponible.</p>
        )}
      </section>

      {/* Final Validation & Notifications Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Final Validation */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h3 className="text-lg font-semibold mb-4">Validation Finale</h3>
          <p className="text-gray-700 mb-4">
            Vérifiez la conformité et la cohérence du planning global après validation de chaque chef de département.
          </p>
          <div className="space-y-2">
            <button onClick={handleValidatePlanning} className="btn btn-outline-primary me-2 mb-2"            >
              Valider le planning complet
            </button>
            <button
              onClick={handleFinalSend}
              className="btn btn-outline-primary me-2 mb-2"            >
              Approuver l'envoi final
            </button>
          </div>
        </div>

        {/* Notifications & Communication */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h3 className="text-lg font-semibold mb-4">Notifications et Approbations</h3>
          {notifications.length > 0 ? (
            <ul className="space-y-2 mb-4">
              {notifications.map((notif) => (
                <li key={notif.id} className="border p-2 rounded">
                  <strong>{notif.department} :</strong> {notif.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">Aucune notification pour le moment.</p>
          )}
          <button
            onClick={handleContact}
            className="btn btn-outline-primary me-2 mb-2"          >
            Contacter Administrateurs / Chefs de Département
          </button>
        </div>
      </section>
    </div>
  )
}

StudiesDirectorDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export default StudiesDirectorDashboard
