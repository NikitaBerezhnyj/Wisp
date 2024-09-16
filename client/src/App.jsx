import React, { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Search from "./components/Search";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Base.css";

function App() {
  const [activeComponent, setActiveComponent] = useState("Feed");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState("signIn");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Feed":
        return <Feed />;
      case "Profile":
        return <Profile />;
      case "Search":
        return <Search />;
      default:
        return <Feed />;
    }
  };

  const renderAuthentication = () => {
    return authMode === "signIn" ? (
      <SignIn
        onSignIn={() => setIsAuthenticated(true)}
        onSwitchToSignUp={() => setAuthMode("signUp")}
      />
    ) : (
      <SignUp
        onSignUp={() => setIsAuthenticated(true)}
        onSwitchToSignIn={() => setAuthMode("signIn")}
      />
    );
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Header />
          <Navigation
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
          <div className="content-container">{renderComponent()}</div>
        </>
      ) : (
        <>{renderAuthentication()}</>
      )}
    </>
  );
}

export default App;
