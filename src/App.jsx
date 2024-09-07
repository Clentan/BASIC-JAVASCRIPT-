
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Activity from "./PAGES/ACTIVITY/activity";
import Thuso from "./PAGES/THUSO/thuso";
import Layout from "./LAYOUT/Layout";
import Dashboard from "./PAGES/DASHBOARD/dashboard";
import Subjects from "./SUBJECTS/subjects";
import Forums from "./PAGES/FORUMS/forums";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/thuso" element={<Thuso />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/activity" element={<Activity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
