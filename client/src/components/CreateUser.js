import React, { useState } from "react";
import axios from 'axios';
import {Form}  from 'react-bootstrap';
import {useHistory} from "react-router-dom";


export default function CreateUser() {
    const history = useHistory();
    const [user, setUser] = useState({
            firstName: "",
            lastName: "",
            position: "",
            gender: "",
            dateOfBirth: "",
            profilePicture: ""
    });

    const onFileSubmit = () => {
        axios.post("http://localhost:3000/user/create", user,{
            header:{
                "Content-Type":"Multipart/form-data"
            }
        }).then(() =>{
            window.location.reload(false)
        })
    };

        return (
            <div style={{ marginTop: 20}}>
                <h3 className="d-flex justify-content-center">Create New User</h3>
                <form className="flex-column d-flex align-items-center "
                      onSubmit={(e) => onFileSubmit(e)}
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
                        <Form.Group>
                            <Form.File id="file" label="Choose ProfilePicture"
                                       type ="file"
                                       required
                                       accept=".jpeg, .png, .jpg"
                                       value = {user.profilePicture}
                                       onChange={(event) =>{
                                           setUser({...user, profilePicture: event.target.file})
                                           console.log(event.target.files[0])
                                           console.log(user)
                                       }}
                            />
                        </Form.Group>
                    </div>
                    <div className="form-group d-flex justify-content-center w-50 mt-3">
                        <input
                            type="submit"
                            value="Save"
                            className="btn btn-primary m-1"

                        />
                        <input
                            type="submit"
                            value="Cancel"
                            className="btn btn-info m-1"
                            onClick={() => history.push("/users")}
                        />

                    </div>

                </form>
            </div>
        )
}
