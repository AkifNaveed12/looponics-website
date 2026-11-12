"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Calendar, Check, ArrowUpRight, Video } from "lucide-react";
import styles from "./BookingModal.module.css";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [minDateTime, setMinDateTime] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [meetLink, setMeetLink] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");

  const overlayRef = useRef<HTMLDivElement>(null);

  // Set min datetime to current local time + 15 min buffer
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 15);
      const pad = (n: number) => String(n).padStart(2, "0");
      const minString = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
        now.getDate()
      )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
      setMinDateTime(minString);
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setStatus("idle");
    setErrorMsg(null);
    setName("");
    setEmail("");
    setDateTime("");
    setMessage("");
    setHoneypot("");
    onClose();
  };

  const convertLocalToIsoWithOffset = (localDateTimeStr: string): string => {
    const date = new Date(localDateTimeStr);
    const pad = (n: number) => String(Math.floor(Math.abs(n))).padStart(2, "0");
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const offsetStr = `${sign}${pad(offsetMinutes / 60)}:${pad(
      offsetMinutes % 60
    )}`;

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const mins = pad(date.getMinutes());
    const secs = pad(date.getSeconds());

    return `${year}-${month}-${day}T${hours}:${mins}:${secs}${offsetStr}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !dateTime) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    const isoStartTime = convertLocalToIsoWithOffset(dateTime);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      startTime: isoStartTime,
      message: message.trim(),
      website: honeypot.trim(),
    };

    setStatus("loading");

    // Primary endpoint is Next.js proxy route /api/book-call (avoids CORS),
    // fallback directly to FastAPI server if needed.
    const directApiUrl =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1")
        ? "http://localhost:8000/book-call"
        : "https://loop-btqc.onrender.com/book-call";

    let response: Response;
    try {
      // First attempt via internal /api/book-call proxy
      response = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // If internal route is not available (404), fall back to direct backend URL
      if (response.status === 404) {
        response = await fetch(directApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
    } catch {
      try {
        response = await fetch(directApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (networkErr) {
        setStatus("idle");
        setErrorMsg(
          "Could not connect to the booking server. Please verify your connection or try again."
        );
        return;
      }
    }

    try {
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        if (data.bookingId) {
          try {
            sessionStorage.setItem("looponics_booking_id", data.bookingId);
          } catch {}
          setBookingId(data.bookingId);
        }
        setMeetLink(data.meetLink || "");
        setStatus("success");
      } else if (response.status === 409) {
        setStatus("idle");
        setErrorMsg(
          "That time slot is already booked or unavailable on our calendar. Please select another time."
        );
      } else if (response.status === 429) {
        setStatus("idle");
        setErrorMsg(
          "Too many booking requests from your connection. Please wait a little while before trying again."
        );
      } else if (response.status === 400) {
        setStatus("idle");
        setErrorMsg(
          data.detail ||
            "Cannot book an appointment in the past. Please select an upcoming slot."
        );
      } else {
        setStatus("idle");
        setErrorMsg(
          data.detail ||
            "Unable to complete booking right now. Please try again or email info@looponics.tech."
        );
      }
    } catch {
      setStatus("idle");
      setErrorMsg("An unexpected error occurred. Please try again shortly.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className={styles.modalBox}>
        <button
          type="button"
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {status === "idle" && (
          <>
            <div className={styles.header}>
              <span className={styles.badge}>CALENDAR INTEGRATION</span>
              <h3 id="booking-modal-title" className={styles.title}>
                Schedule a Call
              </h3>
              <p className={styles.subtitle}>
                Pick a time to connect with the Looponics team via Google Meet.
              </p>
            </div>

            {errorMsg && (
              <div className={`${styles.alert} ${styles.alertError}`}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Bot Honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
                aria-hidden="true"
              />

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="client-name">
                  Full Name <span className={styles.required}>*</span>
                </label>
                <input
                  id="client-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="client-email">
                  Email Address <span className={styles.required}>*</span>
                </label>
                <input
                  id="client-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="client-datetime">
                  Date & Time <span className={styles.required}>*</span>
                </label>
                <input
                  id="client-datetime"
                  type="datetime-local"
                  required
                  min={minDateTime}
                  className={styles.input}
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />
                <span className={styles.helpText}>
                  Times are automatically scheduled in your browser&apos;s local
                  timezone.
                </span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="client-message">
                  Project Details / Note (Optional)
                </label>
                <textarea
                  id="client-message"
                  rows={3}
                  placeholder="Tell us briefly about what you'd like to automate or build..."
                  className={styles.textarea}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Calendar size={18} />
                Confirm Booking
              </button>
            </form>
          </>
        )}

        {status === "loading" && (
          <div className={styles.loaderBox}>
            <div className={styles.spinner} />
            <h4 className={styles.loaderTitle}>
              Scheduling your Google Meet call...
            </h4>
            <p className={styles.loaderSubtitle}>
              Connecting to Google Calendar and generating video link. If the
              server is waking up from sleep, this may take up to 60 seconds.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className={styles.successBox}>
            <div className={styles.successIcon}>
              <Check size={32} />
            </div>
            <h4 className={styles.successTitle}>Your Call is Booked!</h4>
            <p className={styles.successMsg}>
              A Google Calendar invitation with a Google Meet link has been sent
              to <strong>{email}</strong>.
            </p>

            {meetLink && (
              <div className={styles.meetCard}>
                <span className={styles.meetCardLabel}>Google Meet Link</span>
                <a
                  href={meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.meetLink}
                >
                  <Video size={16} />
                  <span>Join Video Meeting</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            )}

            <button
              type="button"
              onClick={handleClose}
              className={styles.closeDoneBtn}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
