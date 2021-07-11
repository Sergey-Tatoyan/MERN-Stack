import React, {useEffect, useState} from "react";
import axios from 'axios';
import  DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {Edit} from "@material-ui/icons";
import EditUser from "./EditUser";

export default function UsersList() {
    const [userList, setUserList] = useState([]);

    const deleteUser = (id) =>{
       axios.delete(`http://localhost:3000/user/delete/${id}`).then(() =>{
           window.location.reload(false)
       })
        window.location.reload()
    }

    useEffect(() =>{
        axios.get("http://localhost:3000/users").then((res) =>{
            setUserList( res.data)
        })
    }, [])


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
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList.map((user, key) =>(
                        <tr key = {key}>
                            <th>
                            <img src={`http://localhost:3000/${user.profilePicture}`} height="100" width="100" alt="img"/>
                            </th>
                            <th>{user.firstName}</th>
                            <th>{user.lastName}</th>
                            <th>{user.position}</th>
                            <th>{user.gender}</th>
                            <th>{user.dateOfBirth}</th>
                            <th>
                                <IconButton aria-label="delete"  color="secondary" onClick={() => deleteUser(user._id)}>
                                <DeleteIcon />
                            </IconButton></th>
                            <th><IconButton aria-label="edit" color="primary" onClick={() => EditUser(user._id)}>
                                <Edit />
                            </IconButton></th>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        );
}