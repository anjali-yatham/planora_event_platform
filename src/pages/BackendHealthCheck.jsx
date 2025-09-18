import React, { useEffect, useState } from "react";

function BackendHealthCheck() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    fetch("http://localhost:5000/health") // 🔹 Replace with your Render backend URL later
      .then((res) => res.json())
      .then((data) => setStatus(`✅ Connected: ${JSON.stringify(data)}`))
      .catch(() => setStatus("❌ Not connected"));
  }, []);

  return (
    <div>
      <h2>Backend Connection Status</h2>
      <p>{status}</p>
    </div>
  );
}

export default BackendHealthCheck;

