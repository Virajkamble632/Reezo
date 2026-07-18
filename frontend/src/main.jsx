import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AuthProvider>
    <App />
    <Toaster
  position="top-center"
  toastOptions={{
    duration: 2000,

    style: {
      background: "rgba(15, 23, 42, 0.9)",
      color: "#F8FAFC",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(20px)",
      borderRadius: "18px",
      padding: "16px 20px",
      boxShadow: "0 10px 40px rgba(0,0,0,.45)",
      fontSize: "15px",
    },

    success: {
      iconTheme: {
        primary: "#22C55E",
        secondary: "#fff",
      },
    },

    error: {
      iconTheme: {
        primary: "#EF4444",
        secondary: "#fff",
      },
    },
  }}
/>
</AuthProvider>
  // </StrictMode>,
)
