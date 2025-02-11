import PropTypes from "prop-types"

function StudiesDirectorDashboard({ onLogout }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800">Tableau de bord Directeur des Études</h2>
        <button onClick={onLogout} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Déconnexion
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-lg font-semibold mb-4">Validation finale</h3>
          <div className="space-y-2">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Valider le planning global
            </button>
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Approuver l'envoi final
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <p className="text-gray-700">Affichage des notifications de validation et de modification.</p>
        </div>
      </div>
    </div>
  )
}

StudiesDirectorDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export default StudiesDirectorDashboard

