import { useEffect, useState } from "react";
import "./WelcomeOverlay.css";

import backgroundImage from "../assets/construction-bg.jpg";
import welcomeImage from "../assets/welcome.png";

const STORAGE_KEY = "sahirate-welcome-dismissed";

export default function WelcomeOverlay({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);

    if (!dismissed) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  const closeOverlay = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");

    document.body.style.overflow = "";

    setIsOpen(false);

    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 250);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="welcome-overlay"
      role="presentation"
    >
      <div
        className="welcome-backdrop"
        onClick={closeOverlay}
        aria-hidden="true"
      >
        <img
          src={backgroundImage}
          alt=""
          className="welcome-bg"
          draggable={false}
        />
      </div>

      <section
        className="welcome-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="welcome-close"
          onClick={closeOverlay}
          aria-label="Close welcome message"
        >
          ×
        </button>

        <div className="welcome-content">
          <img
            src={welcomeImage}
            id="welcome-title"
            alt="Welcome to SahiRate"
            className="welcome-poster"
            draggable={false}
          />
        </div>
      </section>
    </div>
  );
}