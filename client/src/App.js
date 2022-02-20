import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook"; //скрипты для оживления input и тд
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";
import 'materialize-css'

function App() {

    const {token,login,logout,userId,ready} = useAuth()

    //определяем по наличию токена
    const isAuthenticated = !!token // !!  приведение к bool
    const routes = useRoutes(isAuthenticated)

    if(!ready){
        return <Loader />
    }

  return (
      <AuthContext.Provider value={{
          token, login,logout,userId,isAuthenticated
      }}>
          <Router>
              {isAuthenticated && <Navbar />}
            <div className="container">
                {routes}
            </div>
          </Router>
      </AuthContext.Provider>
  )
}

export default App;