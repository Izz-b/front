import { useState, useEffect } from "react"
import PropTypes from "prop-types"

function RoomList({ onBack }) {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    // Fetch rooms data from your API
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    // This is a placeholder. Replace with actual API call
    const mockRooms = [
      { id: 1, name: "Salle 1", isReserved: true, reservationDate: "2023-06-15" },
      { id: 2, name: "Salle 2", isReserved: false, reservationDate: null },
      { id: 3, name: "Salle 3", isReserved: true, reservationDate: "2023-06-16" },
      { id: 4, name: "Salle 4", isReserved: false, reservationDate: null },
    ]
    setRooms(mockRooms)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Liste des Salles</h2>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Retour
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom de la Salle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
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
    </div>
  )
}

RoomList.propTypes = {
  onBack: PropTypes.func.isRequired,
}

export default RoomList

