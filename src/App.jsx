import RegisterPage from "./Components/Pages/RegisterPage";
import LoginPage from "./Components/Pages/LoginPage";
import ProtectedRoate from './Components/ProtectedRoate.jsx'
import ProfilePage from './Components/Pages/ProfilePage.jsx'
import PublicRoute from './Components/PublicRoate.jsx'
import Dashboard from './Components/Pages/Admin/Dashboard.jsx'
import AdminRoute from './Components/AdminRoate.jsx'
import Home from './Components/Pages/Home.jsx'
import NotFound from './Components/Pages/ErrorPage/Error.jsx'
import { Route, Routes } from "react-router-dom";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/dashboard" element={<AdminRoute><Dashboard/></AdminRoute>} />
      <Route path="/Home" element={<ProtectedRoate><Home /></ProtectedRoate>}/>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>}/>
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>}/>
      <Route path="Profile" element={<ProtectedRoate><ProfilePage /></ProtectedRoate>}/>
      <Route path="*" element={token ? (<NotFound />) : (<NotFound />)}/>
    </Routes>
  )
}

export default App;