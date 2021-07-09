import React, { Component } from "react";
import axios from 'axios';
import {Form} from "react-bootstrap";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserFirstName = this.onChangeUserFirstName.bind(this);
        this.onChangeUserLastName = this.onChangeUserLastName.bind(this);
        this.onChangeUserPosition = this.onChangeUserPosition.bind(this);
        this.onChangeUserGender = this.onChangeUserGender.bind(this);
        this.onChangeUserDateOfBirth = this.onChangeUserDateOfBirth.bind(this);
        this.onChangeProfilePicture= this.onChangeProfilePicture.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: "",
            lastName: "",
            position: "",
            gender: "",
            dateOfBirth: "",
            profilePicture: ""
        };
    }

     onChangeUserFirstName(e) {
        this.setState({
            firstName: e.target.value,
        });
    }

    onChangeUserLastName(e) {
        this.setState({
            lastName: e.target.value,
        });
    }

     onChangeUserPosition(e) {
        this.setState({
            position: e.target.value,
        });
    }

     onChangeUserGender(e) {
        this.setState({
            gender: e.target.value,
        });
    }

     onChangeUserDateOfBirth(e) {
        this.setState({
            dateOfBirth: e.target.value,
        });
    }

     onChangeProfilePicture(e) {
        this.setState({
            profilePicture: e.target.value,
        });
    }

// This function will handle the submission.
    onSubmit(e) {
        e.preventDefault();

        // When post request is sent to the create url, axios will add a new record(newUser) to the database.
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            position: this.state.position,
            gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth,
            profilePicture: this.state.profilePicture,
        };

        axios
            .post("http://localhost:3000/user/create/", newUser)
            .then((res) => console.log(res.data));

        // We will empty the state after posting the data to the database
        this.setState({
            firstName: "",
            lastName: "",
            position: "",
            gender: "",
            dateOfBirth: "",
            profilePicture: ""
        });
    }

    // This following section will display the form that takes the input from the user.
    render() {
        return (
            <div style={{ marginTop: 20}}>
                <h3 className="d-flex justify-content-center">Create New User</h3>
                <form className="flex-column d-flex align-items-center "
                      onSubmit={this.onSubmit}>
                    <div className="form-group w-50">
                        <label>FirstName: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.firstName}
                            onChange={this.onChangeUserFirstName}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>LastName: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.lastName}
                            onChange={this.onChangeUserLastName}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>Position: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.position}
                            onChange={this.onChangeUserPosition}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>Gender: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.gender}
                            onChange={this.onChangeUserGender}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>Date Of Birth: </label>
                        <input
                            type="Date"
                            className="form-control"
                            value={this.state.dateOfBirth}
                            onChange={this.onChangeUserDateOfBirth}
                        />
                    </div>
                    <div className="form-group w-50 mt-3">

                        <Form.Group>
                            <Form.File id="exampleFormControlFile1" label="Choose ProfilePicture"
                                       value = {this.state.profilePicture}
                                       onChange={this.onChangeProfilePicture}/>
                        </Form.Group>
                    </div>
                    <div className="form-group d-flex justify-content-center w-50 mt-3">
                        <input
                            type="submit"
                            value="Create User"
                            className="btn btn-primary m-1"
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
}
