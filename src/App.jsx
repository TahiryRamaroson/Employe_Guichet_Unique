import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, Responsable } from "@/layouts";

function App() {

  return (
    <Routes>
      <Route path="/intervenant/*" element={<Dashboard />} />
      <Route path="/responsable/*" element={<Responsable />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  )
}

export default App
