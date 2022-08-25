import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Signin from "./auth/Signin";
import AdminRoute from "./auth/AdminRoute";
import PageNotFound from "./component/PageNotFound";
import AddUser from "./component/user/AddUser";
import EditUser from "./component/user/EditUser";
import ListUser from "./component/user/ListUser";
import Report from "./component/Report";

const Routess = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signin" exact component={Signin} />
        <AdminRoute path="/admin" exact component={App} />
        <AdminRoute path="/users" exact component={ListUser} />
        <AdminRoute path="/adduser" exact component={AddUser} />
        <AdminRoute path="/edit/user/:id" exact component={EditUser} />
        <AdminRoute path="/report" exact component={Report} />

        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routess;
