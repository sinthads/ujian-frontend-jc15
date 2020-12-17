import React, { Component } from 'react';
import {Input, Button } from "reactstrap";
import {connect} from "react-redux";
import {loginAction} from "../redux/actions";
import Axios from 'axios';
import {api_url} from '../helpers/api_url';
import {Redirect} from "react-router-dom";


class LoginPage extends Component {
    state = { 
        loginInfo : {
            email: "",
            password: ""
        }
     }

     onchangeInput = (e) => {
		this.setState({
            loginInfo: { 
                ...this.state.loginInfo,
                [e.target.id]: e.target.value },
        });
        console.log(this.state.loginInfo)
	};

     clickLogin = () => {
        var regex = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
		const { email, password } = this.state.loginInfo;

		if (email.match(regex) && password.match(regex)) {
			Axios.get(`${api_url}/users?email=${email}&password=${password}`)
				.then((res) => {
					if (res.data.length === 1) {
						this.props.loginAction(res.data[0]);
						localStorage.setItem("id", res.data[0].id);
					} else if (res.data.length === 0) {
						Axios.post(`${api_url}/users`, { email: email, password: password })
							.then((res) => {
								this.props.loginAction(res.data);
								localStorage.setItem("id", res.data.id);
								console.log(res.data);
							})
							.catch((err) => {
								console.log(err);
							});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("Email dan password harus mengandung angka dan minimal 6 karakter");
		}

     }

    render() { 
        const { userID } = this.props;
		if (userID !== 0) {
			return <Redirect to="/" />;
		}

        return ( 
            <div>
                <div>
                    <Input
                    placeholder="Email"
                    type="email"
                    id="email"
                    onChange={this.onchangeInput}
                    />
                </div>
                <div>
                    <Input
                    placeholder="Password"
                    type="password"
                    id="password"
                    onChange={this.onchangeInput}
                    />
                </div>
                <div>
                    <Button  onClick={this.clickLogin}>
                        Log In
                    </Button>
                </div>
                
            </div>
         );
    }
}

const mapStatetoProps = (state) => {
    return {
        userID: state.user.id,
        userEmail: state.user.email
    }
}
 
export default connect(mapStatetoProps, {loginAction})
(LoginPage);