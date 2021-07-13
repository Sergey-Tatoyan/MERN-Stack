import React from "react";
import { Route} from "react-router-dom";
import Navbar from "./components/NavBar";
import CreateUser from "./components/CreateUser";
import UsersList from "./components/UsersList";
import {Redirect} from "react-router";
import EditUser from "./components/EditUser"

const App = () => {
    return (
        <div>
            <Navbar />
            <Route exact path="/">
                <h1 className="d-flex justify-content-center"> Բարի գալուստ </h1>
            </Route>
            <Route exact path="/users">
                <UsersList />
            </Route>
            <Route path="/user/update/:id">
                <EditUser/>
            </Route>
            <Redirect from='/users/' to="/users/" />
            <Route path="/user/create" >
                    <CreateUser/>
            </Route>
            <Redirect from='/users/' to="/users/" />
        </div>
    );
};

export default App;