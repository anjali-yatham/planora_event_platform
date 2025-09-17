import React from "react";
import Routes from "./Routes";

function App() {
  return (
    <Routes />
  );
}

export default App;
import BackendHealthCheck from "./pages/BackendHealthCheck";

function App() {
  return (
    <div>
      <h1>Planora Event Platform</h1>
      <BackendHealthCheck />
    </div>
  );
}

export default App;
