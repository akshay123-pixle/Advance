import logo from "./logo.svg";
import "./App.css";
import Profile from "./Profile";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();
  if (isLoading) {
    return <div>The application is loading</div>;
  }
  if (error) {
    return <div>Oops some error occured</div>;
  }

  return (
    <div className="App">
      <h2>Octa Testing App</h2>
      {isAuthenticated ? (
        <div>
          <p1>user is logged in</p1>
          <Profile />
          <p>
            For logout: <Logout />
          </p>
        </div>
      ) : (
        <div>

          <p>Please login with creds</p>
          <Login/>
        </div>
      )}
    </div>
  );
}

export default App;
