import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Calculator from "./pages/Calculator";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/calculator" component={Calculator} />

          <Route path="/">
            <h1 className="m-auto text-4xl text-white">No page found</h1>
          </Route>
        </Switch>

        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
