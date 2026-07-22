import { useEffect, useState } from "react";
import "./WelcomeOverlay.css";
import welcomeImage from "../assets/welcome.png";

export default function WelcomeOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  const STORAGE_KEY = "sahirate-welcome-dismissed";

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);

    if (!dismissed) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    document.body.style.overflow = "";
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="welcome-overlay">
      <div
        className="welcome-backdrop"
        onClick={handleClose}
      ></div>

      <div
        className="welcome-card"
        role="dialog"
        aria-modal="true"
        aria-label="Welcome to SahiRate"
      >
        {/* Close Button */}
        <button
          className="welcome-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="welcome-content">
          <img
            src={welcomeImage}
            alt="Welcome to SahiRate"
            className="welcome-poster"
          />
        </div>
      </div>
    </div>
  );
}