"use client"

import { useState, useEffect } from "react"

function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    // Check if the device is iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    setIsIOS(isIOSDevice)

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setInstallPrompt(e)
    })

    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      setInstallPrompt(null)
    })
  }, [])

  const handleInstallClick = () => {
    if (!installPrompt) return

    // Show the install prompt
    installPrompt.prompt()

    // Wait for the user to respond to the prompt
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt")
      } else {
        console.log("User dismissed the install prompt")
      }
      setInstallPrompt(null)
    })
  }

  if (isInstalled) return null

  return (
    <div className="pwa-install-prompt p-3 bg-light rounded shadow-sm mb-3">
      {isIOS ? (
        <div className="d-flex align-items-center">
          <div>
            <h5 className="mb-1">Installer l'application</h5>
            <p className="mb-0 small">
              Pour installer cette application sur votre iPhone : appuyez sur <span className="fw-bold">Partager</span>{" "}
              <i className="bi bi-share"></i> puis
              <span className="fw-bold"> Sur l'écran d'accueil</span>.
            </p>
          </div>
        </div>
      ) : installPrompt ? (
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="mb-1">Installer l'application</h5>
            <p className="mb-0 small">
              Installez cette application sur votre appareil pour un accès rapide et hors ligne.
            </p>
          </div>
          <button onClick={handleInstallClick} className="btn btn-primary">
            Installer
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default PWAInstallPrompt
