import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Form, Col, Row, Container} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom'


export default function EditUser() {
    const {id} = useParams();
    const history = useHistory();
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/user/${id}`).then((res) => {
            setUserInfo(res.data)
        })
    }, [])

    const [user, setUser] = useState({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        position: userInfo.position,
        gender: userInfo.gender,
        dateOfBirth: userInfo.dateOfBirth,
        profilePicture: userInfo.profilePicture
    });
    const onFileSubmit = () => {
        axios.put(`http://localhost:3000/user/update/${id}`, user, {
            header: {
                "Content-Type": "Multipart/form-data"
            }
        }).then(() => {
            window.location.reload(false)
        })
    };

    return (
        <Container fluid>
        <Col>
            <h3 className="d-flex justify-content-center">User Info</h3>
        </Col>
            <Row className="d-flex justify-content-center">
            <Col  xs lg="2" >
            <img src={`http://localhost:3000/${userInfo.profilePicture}`} height="200" width="200" alt="img"
                 />
            </Col>
            <Col xs lg="6">
            <form
                  onSubmit={(e) => onFileSubmit(e)}
            >
                <div className="form-group w-50">
                    <label>FirstName: </label>
                    <input
                           type="text"
                           className="form-control"
                           value={user.firstName}
                           onChange={(event) => {
                               !event.target.value ?
                                   setUser({...user, firstName: userInfo.firstName})
                                   : setUser({...user, firstName: event.target.value})
                           }}
                    />
                </div>
                <div className="form-group w-50">
                    <label>LastName: </label>
                    <input
                           type="text"
                           className="form-control"
                           value={user.lastName}
                           onChange={(event) => {
                               setUser({...user, lastName: event.target.value})
                           }}
                    />
                </div>
                <div className="form-group w-50">
                    <label>Position: </label>
                    <input
                           type="text"
                           className="form-control"
                           value={user.position}
                           onChange={(event) => {
                               setUser({...user, position: event.target.value})
                           }}
                    />
                </div>
                <div className="form-group w-50">
                    <label>Gender: </label>
                    <input
                           type="text"
                           className="form-control"
                           value={user.gender}
                           onChange={(event) => {
                               setUser({...user, gender: event.target.value})
                           }}
                    />
                </div>
                <div className="form-group w-50">
                    <label>Date Of Birth: </label>
                    <input
                           type="Date"
                           className="form-control"
                           value={user.dateOfBirth}
                           onChange={(event) => {
                               setUser({...user, dateOfBirth: event.target.value})
                           }}
                    />
                </div>
                <div className="form-group w-50 mt-3">
                    <Form.Group>
                        <Form.File id="file" label="Choose ProfilePicture"
                                   type="file"
                                   accept=".jpeg, .png, .jpg"
                                   defaultValue = {userInfo.profilePicture}
                                   value={user.profilePicture}
                                   onChange={(event) => {
                                       setUser({...user, profilePicture: event.target.file})
                                       console.log(event.target.files[0])
                                       console.log(userInfo.profilePicture)
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
            </Col>
            </Row>
        </Container>
    )
}
