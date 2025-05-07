import PropTypes from "prop-types"

function StudentDashboard({ onLogout }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800">Tableau de bord Étudiant</h2>
        <button onClick={onLogout} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Déconnexion
        </button>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-lg font-semibold mb-4">Mon planning examens</h3>
        <p className="text-gray-700">Affichage des examens avec les détails (matière, date, heure, salle).</p>
      </div>
    </div>
  )
}

StudentDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export default StudentDashboard

