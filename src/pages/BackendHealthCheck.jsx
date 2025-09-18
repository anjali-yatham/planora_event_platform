import React, { useEffect, useState } from "react";

function BackendHealthCheck() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    fetch("https://planora-event-platform.onrender.com/db-health") // ✅ correct endpoint
      .then((res) => res.json())
      .then((data) => setStatus(`✅ Connected: ${JSON.stringify(data)}`))
      .catch(() => setStatus("❌ Not connected"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Backend Connection Status</h2>
      <p>{status}</p>
    </div>
  );
}

export default BackendHealthCheck;

