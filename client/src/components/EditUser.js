import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Form, Col, Row, Container} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom'


export default function EditUser() {
    const {id} = useParams();
    const history = useHistory();
    const [userInfo, setUserInfo] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [selectedFile, setSelectedFile] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/user/${id}`).then((res) => {
            setUserInfo(res.data)
        })
    }, [id])

    const sendForm = React.useCallback(async () => {
        const formData = new FormData();
        formData.append("firstName", firstName)
        formData.append("lastName", lastName)
        formData.append("position", position)
        formData.append("gender", gender)
        formData.append("dateOfBirth", dateOfBirth)
        formData.append("profilePicture", selectedFile)

        await axios.put(`http://localhost:3000/user/update/${id}`, formData, {
            header: {
                "Content-type": "Multipart/form-data"
            }
        });
        history.push("/users")
    }, [history,id, firstName, lastName, position, gender, dateOfBirth, selectedFile])


    return (
        <Container fluid>
            <Col>
                <h3 className="d-flex justify-content-center">User Info</h3>
            </Col>
            <Row className="d-flex justify-content-center">
                <Col xs lg="2">
                    <img src={`http://localhost:3000/${userInfo.profilePicture}`} height="200" width="200" alt="img"
                    />
                </Col>
                <Col xs lg="6">
                        <div className="form-group w-50">
                            <label>FirstName: </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={userInfo.firstName}
                                onChange={(event) => {
                                    event.preventDefault()
                                    setFirstName(event.target.value)
                                }}
                            />
                        </div>
                        <div className="form-group w-50">
                            <label>LastName: </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={userInfo.lastName}
                                onChange={(event) => {
                                    event.preventDefault()
                                    setLastName(event.target.value)
                                }}
                            />
                        </div>
                        <div className="form-group w-50">
                            <label>Position: </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={userInfo.position}
                                onChange={(event) => {
                                    event.preventDefault()
                                    setPosition(event.target.value)
                                }}
                            />
                        </div>
                        <div className="form-group w-50">
                            <label>Gender: </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={userInfo.gender}
                                onChange={(event) => {
                                    event.preventDefault()
                                    setGender(event.target.value)
                                }}
                            />
                        </div>
                        <div className="form-group w-50">
                            <label>Date Of Birth: </label>
                            <input
                                type="Date"
                                className="form-control"
                                defaultValue={userInfo.dateOfBirth}
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
                                           defaultValue ={userInfo.profilePicture}
                                           onChange={(event) => {
                                               event.preventDefault()
                                               setSelectedFile(event.target.files[0])
                                           }}
                                />
                            </Form.Group>
                        </div>
                        <div className="form-group d-flex justify-content-center w-50 mt-3">
                            <button className="btn btn-primary m-1"
                                    onClick={sendForm}>
                                Save
                            </button>
                            <button className="btn btn-info m-1"
                                    onClick={() => history.push("/users")}>
                                Cancel
                            </button>
                        </div>
                </Col>
            </Row>
        </Container>
    )
}
