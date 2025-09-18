import React, { useEffect, useState } from "react";

function BackendHealthCheck() {
  const [status, setStatus] = useState("⏳ Checking...");

  useEffect(() => {
    console.log("🚀 Testing backend connection...");
    fetch(`${import.meta.env.VITE_BACKEND_URL}/db-health`)
      .then(res => res.json())
      .then(data => {
        console.log("✅ Frontend connected to Backend:", data);
        setStatus("✅ Connected to backend");
      })
      .catch(err => {
        console.error("❌ Frontend cannot reach Backend:", err);
        setStatus("❌ Not connected");
      });
  }, []);

  return <p>{status}</p>;
}

export default BackendHealthCheck;
