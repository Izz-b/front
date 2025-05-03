"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"

function DepartmentHeadDashboard() {
  // États pour la validation, les plannings, les détails des examens et les notifications de modifications
  const [validations, setValidations] = useState([])
  const [notification, setNotification] = useState(null)
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    status: "En attente",
  })
  const [plannings, setPlannings] = useState([])
  const [examDetails, setExamDetails] = useState([])
  const [modifications, setModifications] = useState([])

  useEffect(() => {
    // Données fictives pour la vue des plannings
    const mockPlannings = [
      { id: 1, day: "Lundi", exam: "Mathématiques", time: "09:00-11:00", room: "Salle 101", invigilator: "M. Dupont" },
      { id: 2, day: "Mardi", exam: "Physique", time: "13:00-15:00", room: "Salle 102", invigilator: "Mme. Durand" },
    ]
    setPlannings(mockPlannings)

    // Données fictives pour les détails des examens
    const mockExamDetails = [
      { id: 1, subject: "Mathématiques", room: "Salle 101", invigilator: "M. Dupont" },
      { id: 2, subject: "Physique", room: "Salle 102", invigilator: "Mme. Durand" },
    ]
    setExamDetails(mockExamDetails)

    // Données fictives pour les notifications de modification
    const mockModifications = [
      { id: 1, message: "Changement de salle pour l'examen de Mathématiques", date: new Date().toISOString() },
    ]
    setModifications(mockModifications)
  }, [])

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

  // Actions sur les notifications de modification
  const handleValidateModification = (id) => {
    setModifications((prev) => prev.filter((mod) => mod.id !== id))
    setNotification("Modification validée.")
    setTimeout(() => setNotification(null), 3000)
  }

  const handleReturnToAdmin = (id) => {
    setModifications((prev) => prev.filter((mod) => mod.id !== id))
    setNotification("Retour envoyé à l'administrateur.")
    setTimeout(() => setNotification(null), 3000)
  }

  // Filtrer les validations par type
  const surveillantValidations = validations.filter((val) => val.type === "Surveillant")
  const etudiantValidations = validations.filter((val) => val.type === "Étudiant")

  return (
    <div className="space-y-8 p-4">
      {/* En-tête */}
      <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800">
          Tableau de bord Chef de Département
        </h2>
      </div>

      {notification && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
          role="alert"
        >
          {notification}
        </div>
      )}

      {/* 1. Vue des plannings et informations spécifiques */}
      <section className="bg-white shadow-md p-6 rounded">
        <h3 className="text-xl font-bold mb-4">Vue des plannings et informations</h3>
        {plannings.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Jour</th>
                <th className="border px-4 py-2">Examen</th>
                <th className="border px-4 py-2">Heure</th>
                <th className="border px-4 py-2">Salle</th>
                <th className="border px-4 py-2">Surveillant</th>
              </tr>
            </thead>
            <tbody>
              {plannings.map((plan) => (
                <tr key={plan.id}>
                  <td className="border px-4 py-2">{plan.day}</td>
                  <td className="border px-4 py-2">{plan.exam}</td>
                  <td className="border px-4 py-2">{plan.time}</td>
                  <td className="border px-4 py-2">{plan.room}</td>
                  <td className="border px-4 py-2">{plan.invigilator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun planning disponible.</p>
        )}
      </section>

      {/* 2. Section de validation des entrées */}
      <section className="bg-white shadow-md p-6 rounded">
        <h3 className="text-xl font-bold mb-4">Validation des entrées</h3>

        {/* Validation des surveillants */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Validation des Surveillants</h4>
          {surveillantValidations.length > 0 ? (
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Nom</th>
                  <th className="border px-4 py-2">Statut</th>
                </tr>
              </thead>
              <tbody>
                {surveillantValidations.map((val) => (
                  <tr key={val.id}>
                    <td className="border px-4 py-2">{val.name}</td>
                    <td className="border px-4 py-2">{val.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucune validation de surveillant.</p>
          )}
        </div>

        {/* Validation des étudiants */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Validation des Étudiants</h4>
          {etudiantValidations.length > 0 ? (
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Nom</th>
                  <th className="border px-4 py-2">Statut</th>
                </tr>
              </thead>
              <tbody>
                {etudiantValidations.map((val) => (
                  <tr key={val.id}>
                    <td className="border px-4 py-2">{val.name}</td>
                    <td className="border px-4 py-2">{val.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucune validation d'étudiant.</p>
          )}
        </div>

        {/* Formulaire d'ajout de validation */}
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="text-lg font-semibold mb-4">Ajouter une validation</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Sélectionnez un type</option>
                <option value="Surveillant">Surveillant</option>
                <option value="Étudiant">Étudiant</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nom
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Entrez le nom"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary me-2 mb-2">
              Ajouter la validation
            </button>
          </form>
        </div>
      </section>

      {/* 3. Accès aux détails des examens */}
      <section className="bg-white shadow-md p-6 rounded">
        <h3 className="text-xl font-bold mb-4">Détails des examens</h3>
        {examDetails.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Matière</th>
                <th className="border px-4 py-2">Salle</th>
                <th className="border px-4 py-2">Surveillant</th>
              </tr>
            </thead>
            <tbody>
              {examDetails.map((exam) => (
                <tr key={exam.id}>
                  <td className="border px-4 py-2">{exam.subject}</td>
                  <td className="border px-4 py-2">{exam.room}</td>
                  <td className="border px-4 py-2">{exam.invigilator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun détail d'examen disponible.</p>
        )}
      </section>

      {/* 4. Notifications de modification */}
      <section className="bg-white shadow-md p-6 rounded">
        <h3 className="text-xl font-bold mb-4">Notifications de modification</h3>
        {modifications.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {modifications.map((mod) => (
                <tr key={mod.id}>
                  <td className="border px-4 py-2">{mod.message}</td>
                  <td className="border px-4 py-2">
                    {new Date(mod.date).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleValidateModification(mod.id)}
                      className="btn btn-outline-secondary me-2 mb-2"                    >
                      Valider
                    </button>
                    <button
                      onClick={() => handleReturnToAdmin(mod.id)}
                      className="btn btn-outline-secondary me-2 mb-2"                    >
                      Retour à l'administrateur
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucune notification de modification.</p>
        )}
      </section>
    </div>
  )
}

export default DepartmentHeadDashboard
