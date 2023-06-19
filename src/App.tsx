import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import DogList from "./components/DogList";
import { UserContextProvider, UserContext } from "./contexts/UserContext";
import { Login, Search } from "./components";

const App: React.FC = () => {
  const { user } = React.useContext(UserContext);
  console.log("user data ===", user);
  return (
    <RecoilRoot>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="dogs"
              element={user ? <DogList /> : <Navigate to="/" />}
            />
            <Route
              path="search"
              // element={user ? <Search /> : <Navigate to="/" />}
              element={<Search />}
            />
          </Routes>
        </Router>
      </UserContextProvider>
    </RecoilRoot>
  );
};

export default App;
