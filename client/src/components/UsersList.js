import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const User = (props) => (
    <tr>
        <td>{props.user.firstName}</td>
        <td>{props.user.lastName}</td>
        <td>{props.user.position}</td>
        <td>{props.user.gender}</td>
        <td>{props.user.dateOfBirth}</td>
        <td>{props.user.profilePicture}</td>
        <td>
            <Link to={"/user/update/" + props.user._id}>EditUser</Link> |
            <a
                href="/user/delete/"
                onClick={() => {
                    props.deleteUser(props.user._id);
                }}
            >
                Delete User
            </a>
        </td>
    </tr>
);

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.state = { users: [] };
    }

    componentDidMount() {
        axios
            .get("http://localhost:3000/users")
            .then((response) => {
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteUser(id) {
        axios.delete("http://localhost:3000/user/delete/" + id).then((response) => {
            console.log(response.data);
        });

        this.setState({
            user: this.state.users.filter((el) => el._id !== id),
        });
    }

    usersList() {
        return this.state.users.map((currentUser) => {
            return (
                <User
                    user={currentUser}
                    deleteUser={this.deleteUser}
                    key={currentUser._id}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <h3 className="d-flex justify-content-center">Users List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Profile Picture</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Position</th>
                        <th>Gender</th>
                        <th>Date Of Birth</th>
                    </tr>
                    </thead>
                    <tbody>{this.usersList}</tbody>
                </table>
            </div>
        );
    }
}