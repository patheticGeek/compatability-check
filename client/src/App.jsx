import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Calculator from "./pages/Calculator";
import { Toaster } from "react-hot-toast";
import cookies from "react-cookies";
import axiosClient from "./utils/axios";
import { useLoginState } from "./state";

function App() {
  const { login } = useLoginState();

  const checkUser = async () => {
    try {
      const token = cookies.load("token");
      if (token) {
        const response = await axiosClient.get("/verify-user");
        login(response.data.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 flex">
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/c/:referer" component={Calculator} />

          <Route path="/">
            <h1 className="m-auto text-4xl text-white">No page found</h1>
          </Route>
        </Switch>
      </div>

      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
