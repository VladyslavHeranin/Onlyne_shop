import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Registration } from "./components/registration-and-login/registration.jsx"
import { Login } from "./components/registration-and-login/Login.jsx"
import { Header } from "./components/navigation-and-search-components/header.jsx"
import "materialize-css"
import { useDispatch, useSelector } from "react-redux"
import { Auth } from "./actions/user"
import { Users } from "./components/lists/users"
import { NavCreatePost } from "./components/navigation-and-search-components/navCreatePost"
import { useState } from "react"



function App() {

  const [modal, setModal] = useState("display")

  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.user.isAuth)

  const modalWindow = () => {
    return "display"
  }

  useEffect(() => {

    dispatch(Auth())

  }, [])

  return (
    <BrowserRouter>
      <div className="container" >
        <Header setModal={setModal} />
        {!isAuth ?
          <Switch>

            <Route exact path={"/registartion"} component={Registration} />
            <Route exact path={"/login"} component={Login} />

          </Switch>
          :
          <Switch>

            <Route >
              <NavCreatePost modalWindow={modalWindow} setModal={setModal} modal={modal} />
              <Users modal={modal} />
            </Route>


          </Switch>
        }
      </div>
    </BrowserRouter >
  );
}

export default App;
