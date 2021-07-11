import React, { useState } from "react";
import axios from 'axios';

export default function CreateUser() {
    const [user, setUser] = useState({
            firstName: "",
            lastName: "",
            position: "",
            gender: "",
            dateOfBirth: "",
            profilePicture: ""
    });


const createUser = () => {
        axios.post("http://localhost:3000/user/create/", user).then(() =>{
            window.location.reload(false)
        })
    };

        return (
            <div style={{ marginTop: 20}}>
                <h3 className="d-flex justify-content-center">Create New User</h3>
                <form className="flex-column d-flex align-items-center "
                    >
                    <div className="form-group w-50" >
                        <label>FirstName: </label>
                        <input required
                            type="text"
                            className="form-control"
                            value={user.firstName}
                            onChange={(event) =>{
                                setUser({...user, firstName: event.target.value})
                            }}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>LastName: </label>
                        <input required
                            type="text"
                            className="form-control"
                            value={user.lastName}
                            onChange={(event) =>{
                                setUser({...user, lastName: event.target.value})
                            }}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>Position: </label>
                        <input required
                            type="text"
                            className="form-control"
                            value={user.position}
                            onChange={(event) =>{
                                setUser({...user, position: event.target.value})
                            }}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>Gender: </label>
                        <input required
                            type="text"
                            className="form-control"
                            value={user.gender}
                            onChange={(event) =>{
                                setUser({...user, gender: event.target.value})
                            }}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>Date Of Birth: </label>
                        <input required
                            type="Date"
                            className="form-control"
                            value={user.dateOfBirth}
                            onChange={(event) =>{
                                setUser({...user, dateOfBirth: event.target.value})
                            }}
                        />
                    </div>
                    <div className="form-group w-50 mt-3">
                        <label> Choose ProfilePicture</label>
                        <input type="file" id="file"
                               value = {user.profilePicture}
                               onChange={(event) =>{
                                   setUser({...user, profilePicture: event.target.value})
                               }}
                        />
                    </div>
                    <div className="form-group d-flex justify-content-center w-50 mt-3">
                        <input
                            type="submit"
                            value="Create User"
                            className="btn btn-primary m-1"
                            onClick={createUser}
                        />
                        <input
                            type="submit"
                            value="Cancel"
                            className="btn btn-info m-1"
                        />

                    </div>

                </form>
            </div>
        );
}
