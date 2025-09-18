useEffect(() => {
  fetch("https://planora-event-platform.onrender.com/db-health")
    .then((res) => res.json())
    .then((data) => setStatus(`✅ Connected: ${JSON.stringify(data)}`))
    .catch((err) => {
      console.error("❌ Fetch failed:", err);
      setStatus("❌ Not connected");
    });
}, []);


