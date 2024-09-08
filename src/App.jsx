
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Activity from "./PAGES/ACTIVITY/activity";
import Thuso from "./PAGES/THUSO/thuso";
import Layout from "./LAYOUT/Layout";
import Dashboard from "./PAGES/DASHBOARD/dashboard";
import Subjects from "./PAGES/SUBJECTS/subjects";
import Forums from "./PAGES/FORUMS/forums";
import Quiz from "./PAGES/ACTIVITY/quiz";
import Forum from "./PAGES/FORUMS/forum";
import LandingPage from "./PAGES/AUTH/landingpage";
import SignIn from "./PAGES/AUTH/signin";
import SignUp from "./PAGES/AUTH/signup";
import { AuthProvider } from "./PROVIDERS/DataProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/thuso" element={<Thuso />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/forums/:id" element={<Forum />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/activity/quiz/:subject" element={<Quiz />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
