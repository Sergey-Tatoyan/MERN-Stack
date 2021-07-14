import React, { useState } from "react";
import axios from 'axios';
import {Form}  from 'react-bootstrap';
import {useHistory} from "react-router-dom";


export default function CreateUser() {
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [selectedFile, setSelectedFile] = useState("");

    const sendForm = React.useCallback(async ()=> {
        const formData = new FormData();
            formData.append("firstName", firstName)
            formData.append("lastName", lastName)
            formData.append("position", position)
            formData.append("gender", gender)
            formData.append("dateOfBirth", dateOfBirth)
            formData.append("profilePicture", selectedFile)

            await axios.post("http://localhost:3000/user/create", formData,{
                header:{
                    "Content-type": "Multipart/form-data"
                }
            })
                history.push("/users")
        },[history,firstName,lastName,position,gender,dateOfBirth,selectedFile])

        return (
            <div style={{marginTop: 20}}>
                <h3 className="d-flex justify-content-center">Create New User</h3>
                <div className="flex-column d-flex align-items-center ">
                    <div className="form-group w-50" >
                        <label>FirstName: </label>
                        <input required
                               type="text"
                               className="form-control"
                               onChange={(event) => {
                                   event.preventDefault()
                                   setFirstName( event.target.value)
                               }}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>LastName: </label>
                        <input required
                               type="text"
                               className="form-control"
                               onChange={(event) => {
                                   event.preventDefault()
                                   setLastName(event.target.value)
                               }}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>Position: </label>
                        <input required
                               type="text"
                               className="form-control"
                               onChange={(event) => {
                                   event.preventDefault()
                                   setPosition(event.target.value)
                               }}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>Gender: </label>
                        <input required
                               type="text"
                               className="form-control"
                               onChange={(event) => {
                                   event.preventDefault()
                                   setGender(event.target.value)
                               }}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>Date Of Birth: </label>
                        <input required
                               type="Date"
                               className="form-control"
                               onChange={(event) => {
                                   event.preventDefault()
                                   setDateOfBirth(event.target.value)
                               }}
                        />
                    </div>
                    <div className="form-group w-50 mt-3">
                        <Form.Group>
                            <Form.File id="file" label="Choose ProfilePicture"
                                       type="file"
                                       onChange={(event) => {
                                           event.preventDefault()
                                           setSelectedFile(event.target.files[0])
                                       }}
                            />
                        </Form.Group>
                    </div>
                    <div className="form-group d-flex justify-content-center w-50 mt-3">
                        <button onClick={sendForm} className="btn btn-primary m-1">
                            Save
                        </button>
                        <button className="btn btn-info m-1"
                                onClick={() => history.push("/users")}>
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        )
}
