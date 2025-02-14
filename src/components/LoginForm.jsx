"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowForm(true), 300)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === "admin") {
      onLogin("admin")
    } else if (username === "chef") {
      onLogin("department-head")
    } else if (username === "directeur") {
      onLogin("studies-director")
    } else if (username === "enseignant") {
      onLogin("teacher")
    } else if (username === "etudiant") {
      onLogin("student")
    } else {
      alert("Identifiants invalides")
    }
  }

  return (
    <div
      className={`card shadow-lg ${showForm ? "animate__animated animate__fadeIn" : "opacity-0"}`}
      style={{ maxWidth: "400px", width: "100%" }}
    >
      <div className="card-body p-5">
        <div className="text-center mb-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZQPYIu2c4AQqymWsBvjL2lrdVIhe4s.png"
            alt="ISIM Logo"
            className="mb-4"
            style={{ width: "80px", height: "80px" }}
          />
          <h2 className="card-title">Connexion</h2>
          <p className="text-muted">Veuillez vous connecter pour continuer</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm

