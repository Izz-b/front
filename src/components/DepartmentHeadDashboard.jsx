"use client"

import { useState } from "react"
import PropTypes from "prop-types"

function DepartmentHeadDashboard({ onLogout }) {
  const [validations, setValidations] = useState([])
  const [notification, setNotification] = useState(null)
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    status: "En attente",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.type && formData.name) {
      const newValidation = { ...formData, id: Date.now() }
      setValidations((prevValidations) => [...prevValidations, newValidation])
      setFormData({
        type: "",
        name: "",
        status: "En attente",
      })
      setNotification("Validation ajoutée avec succès!")
      setTimeout(() => setNotification(null), 3000)
    } else {
      setNotification("Veuillez remplir tous les champs")
      setTimeout(() => setNotification(null), 3000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800">Tableau de bord Chef de Département</h2>
        <button onClick={onLogout} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Déconnexion
        </button>
      </div>

      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-lg font-semibold mb-4">Ajouter une validation</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                Type
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="">Sélectionnez un type</option>
                <option value="Surveillant">Surveillant</option>
                <option value="Étudiant">Étudiant</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nom
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Entrez le nom"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ajouter la validation
            </button>
          </form>
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-lg font-semibold mb-4">Liste des validations</h3>
          {validations.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Nom</th>
                  <th className="px-4 py-2">Statut</th>
                </tr>
              </thead>
              <tbody>
                {validations.map((validation) => (
                  <tr key={validation.id}>
                    <td className="border px-4 py-2">{validation.type}</td>
                    <td className="border px-4 py-2">{validation.name}</td>
                    <td className="border px-4 py-2">{validation.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucune validation ajoutée pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  )
}

DepartmentHeadDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export default DepartmentHeadDashboard

