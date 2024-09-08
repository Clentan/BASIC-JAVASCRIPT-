
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
import AddForum from "./PAGES/FORUMS/addForum";
import Challanges from "./PAGES/ACTIVITY/challanges";
import Profile from "./PAGES/PROFILE/profile";
import Subject from "./PAGES/SUBJECTS/subject";

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
            <Route path="/subjects/:subjectID" element={<Subject />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/forums/:id" element={<Forum />} />
            <Route path="/addforum" element={<AddForum />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/activity/quiz/:subject" element={<Quiz />} />
            <Route path="/activity/practicequiz/:subject/:topic" element={<Challanges />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
