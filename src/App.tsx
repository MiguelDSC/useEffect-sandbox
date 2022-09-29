import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Login from "./assets/components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem("username") || "");
    }
  }, []);

  const logouthandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login
          onLogin={(data) => {
            setIsLoggedIn(data);
          }}
          getUsername={(data) => {
            setUsername(data);
          }}
        />
      ) : (
        <>
          <h1>Welcome {username}!</h1>
          <button onClick={logouthandler}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
