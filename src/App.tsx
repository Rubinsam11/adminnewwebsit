import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import AddNews from "./components/AddNews";
import AdsPage from "./components/AdsPage";
import ListOfMembers from "./components/ListOfMembers";
import HistoryPage from "./components/HistoryPage";
import NewRegister from "./components/NewRegister";
import ProfilePage from "./components/ProfilePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [profileData, setProfileData] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleRegister = (data: any) => {
    setProfileData(data);
    setCurrentPage("profile");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
    setProfileData(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "ads":
        return <AdsPage onNavigate={setCurrentPage} />;
      case "addnews":
        return <AddNews onNavigate={setCurrentPage} />;
      case "members":
        return <ListOfMembers onNavigate={setCurrentPage} />;
      case "history":
        return <HistoryPage onNavigate={setCurrentPage} />;
      case "newregister":
        return (
          <NewRegister
            onNavigate={setCurrentPage}
            onRegisterSuccess={handleRegister}
          />
        );
      case "profile":
        return (
          <ProfilePage
            profile={
              profileData || {
                name: "",
                sex: "",
                dob: "",
                email: "",
                phone: "",
              }
            }
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <Dashboard
            onShowAds={() => setCurrentPage("ads")}
            onShowMembers={() => setCurrentPage("members")}
            onAddNews={() => setCurrentPage("addnews")}
            onShowHistory={() => setCurrentPage("history")}
            onShowNewRegister={() => setCurrentPage("newregister")}
            onShowProfilePage={() => setCurrentPage("profile")}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <div
      className="
        App 
        min-h-screen 
        bg-gradient-to-br from-slate-50 to-blue-50 
        flex 
        justify-center 
        items-center 
        p-4 sm:p-6 md:p-10 
      "
    >
      <div className="w-full max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-5xl bg-white rounded-lg shadow-md p-6 sm:p-8">
        {!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : renderPage()}
      </div>
    </div>
  );
}

export default App;