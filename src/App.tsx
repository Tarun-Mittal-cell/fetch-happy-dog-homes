import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import LoginPage from "./components/LoginPage";
import DogList from "./components/DogList";
import { UserContextProvider, UserContext } from "./contexts/UserContext";
import Search from "./components/Search";

const App: React.FC = () => {
  const { user } = React.useContext(UserContext);
  console.log("user data ===", user);
  return (
    <RecoilRoot>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="dogs"
              element={user ? <DogList /> : <Navigate to="/" />}
            />
            <Route
              path="search"
              element={user ? <Search /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </UserContextProvider>
    </RecoilRoot>
  );
};

export default App;
