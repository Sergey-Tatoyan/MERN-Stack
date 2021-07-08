import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router";
import {Form} from "react-bootstrap";

class EditeUser extends Component {
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
            profilePicture: "",
            users: []
        };
    }
    // This will get the record based on the id from the database.
    componentDidMount() {
        axios
            .get("http://localhost:3000/user" + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    position: response.data.position,
                    gender: response.data.gender,
                    dateOfBirth: response.data.dateOfBirth,
                    profilePicture: response.data.profilePicture,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // These methods will update the state properties.
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
        const newEditedUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            position: this.state.position,
            gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth,
            profilePicture: this.state.profilePicture,
        };
        console.log(newEditedUser);

        // This will send a post request to update the data in the database.
        axios
            .post(
                "http://localhost:3000/user/update/" + this.props.match.params.id,
                newEditedUser
            )
            .then((res) => console.log(res.data));

        this.props.history.push("/users");
    }

    // This following section will display the update-form that takes the input from the user to update the data.
    render() {
        return (
            <div>
                <h3 align="center">Update User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>FirstName: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.firstName}
                            onChange={this.onChangeUserFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label>LastName: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.lastName}
                            onChange={this.onChangeUserLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Position: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.position}
                            onChange={this.onChangeUserPosition}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.gender}
                            onChange={this.onChangeUserGender}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date Of Birth: </label>
                        <input
                            type="date"
                            className="form-control"
                            value={this.state.dateOfBirth}
                            onChange={this.onChangeUserDateOfBirth}
                        />
                    </div>
                    <div className="form-group">
                        <Form.Group>
                            <Form.File id="exampleFormControlFile1" label="Choose ProfilePicture"
                                       value = {this.state.profilePicture}
                                       onChange={this.onChangeProfilePicture}/>
                        </Form.Group>
                    </div>

                    <br />

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Update User"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}


export default withRouter(EditeUser);