import React from "react";
import { Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import EditeUser from "./components/EditeUser";
import CreateUser from "./components/CreateUser";
import UsersList from "./components/UsersList";

const App = () => {
    return (
        <div>
            <Navbar />
            <Route exact path="/users">
                <UsersList />
            </Route>
            <Route path="/user/update/:id" component={EditeUser} />
            <Route path="/user/create">
                <CreateUser />
            </Route>
        </div>
    );
};

export default App;