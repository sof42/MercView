import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from './utils/config.js';
import '../customStyles/EditProfile.css';  // Import the CSS file

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.user.username || '',
            firstName: props.user.firstName || '',
            lastName: props.user.lastName || '',
            password: '',
            userId: props.user.userId
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({
                username: this.props.user.username,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                userId: this.props.user.userId
            });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, firstName, lastName, password, userId } = this.state;

        const data = {
            username,
            firstName,
            lastName,
            ...(password && { password })
        };
        console.log(data);
        axios.put(API_URL + `/users/edit/${userId}`, data, { withCredentials: true })
        .then((response) => {
            toast.success("Profile updated successfully!");
        })
        .catch((error) => {
            console.error("Error updating profile:", error.message);
            toast.error("Error updating profile.");
        });
    }

    render() {
        const { username, firstName, lastName, password } = this.state;
        return (
            <div id="edit-profile-card">
                <h2>Edit Profile</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password: (enter only if you want to change existing password)</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            </div>
        );
    }
}

export default EditProfile;
