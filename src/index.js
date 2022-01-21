import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import { AuthProvider } from "./contexts/AuthContext";
import TestPage from "./pages/testLanding";
import PrivateRoute from "./components/privateRoute";
import NavigationDrawer from "./components/navigationDrawer";
import TourListPage from "./pages/tourListPage";
import PoiListPage from "./pages/poiListPage";
import CreateTourPage from "./pages/createTourPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/testpage"
            element={
              <PrivateRoute>
                <TestPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tourlist"
            element={
              <PrivateRoute>
                <TourListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/poilist"
            element={
              <PrivateRoute>
                <PoiListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/createtour"
            element={
              <PrivateRoute>
                <CreateTourPage />
              </PrivateRoute>
            }
          />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

/*
Need to look into the Navigate component and auth
<Navigate from="*" to="/" />
<Route path="/testpage" element={<TestPage />} />
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
ReactDOM.render(<App />, document.getElementById("root"));
