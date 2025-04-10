import PropTypes from "prop-types"
import { useState, useEffect } from "react"

function TeacherDashboard({ onLogout }) {
  const [sessions, setSessions] = useState([])
  const [futureSessions, setFutureSessions] = useState([])
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Mock data for current surveillance sessions
    const mockSessions = [
      {
        id: 1,
        room: "Salle A",
        date: "2023-09-01",
        time: "09:00 - 11:00",
        subject: "Mathématiques",
        classe: "ING 1 INFO TD1",
      },
      {
        id: 2,
        room: "Salle B",
        date: "2023-09-02",
        time: "13:00 - 15:00",
        subject: "Physique",
        classe: "LIC 2 INFO",
      },
    ]
    setSessions(mockSessions)

    // Mock data for future surveillance sessions
    const mockFutureSessions = [
      {
        id: 3,
        room: "Salle C",
        date: "2023-09-10",
        time: "10:00 - 12:00",
        subject: "Chimie",
        classe: "ING 1 INFO TD1",
      },
      {
        id: 4,
        room: "Salle D",
        date: "2023-09-15",
        time: "14:00 - 16:00",
        subject: "Biologie",
        classe: "LIC 2 INFO",
      },
    ]
    setFutureSessions(mockFutureSessions)

    // Mock data for notifications
    const mockNotifications = [
      {
        id: 1,
        message: "Changement de salle pour la session de Mathématiques.",
        read: false,
      },
      {
        id: 2,
        message: "Mise à jour de l'horaire pour la session de Physique.",
        read: false,
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800">
          Tableau de bord Enseignant
        </h2>
        <button onClick={onLogout} className="btn btn-outline-danger">
          Déconnexion
        </button>
      </div>

      {/* Current Surveillance Sessions in Table Format */}
      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h3 className="text-lg font-semibold mb-4">
          Mon planning de surveillance
        </h3>
        {sessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matière
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classe
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sessions.map((session) => (
                  <tr key={session.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.room}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.classe}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-700">
            Aucun créneau de surveillance pour le moment.
          </p>
        )}
      </section>

      {/* Notifications */}
      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h3 className="text-lg font-semibold mb-4">
          Notifications de mise à jour
        </h3>
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-center justify-between border p-4 rounded mb-2"
            >
              <span className={`text-gray-700 ${notif.read ? "line-through" : ""}`}>
                {notif.message}
              </span>
              {!notif.read && (
                <button
                  onClick={() => markNotificationAsRead(notif.id)}
                  className="btn btn-outline-danger"                >
                  Marquer comme lue
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-700">
            Aucune notification pour le moment.
          </p>
        )}
      </section>

      {/* Future Surveillance Sessions in Table Format */}
      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h3 className="text-lg font-semibold mb-4">Plannings futurs</h3>
        {futureSessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matière
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classe
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {futureSessions.map((session) => (
                  <tr key={session.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.room}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.classe}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-700">
            Aucun planning futur disponible.
          </p>
        )}
      </section>
    </div>
  )
}

TeacherDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export default TeacherDashboard
