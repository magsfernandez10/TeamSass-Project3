import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import { Container, Row, Col } from "../components/Grid";
import LoginForm from "../components/LoginForm";
import axios from "axios";


class Login extends Component {
    //create state
    state = {
        username: "",
        password: "",
        redicrectTo: null
    };

    //function to take value of what enter in the search bar
    handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name
        // console.log (value,name)
        this.setState({
            [name]: value
        })
    }

    //function to control the submit button of the search form 
    handleFormSubmit = event => {
        event.preventDefault();
        console.log("sign-up handleFormSubmit, username: ")
        console.log(this.state.username)
        axios.post("/api/user/login", {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.props.updateUser({
                        //upate App.js state
                        loggedIn: true,
                        username: res.data.username
                    })
                    //Update the state to redirect to home
                    this.setState({
                        redirectTo: "./"
                    })
                }
            })
            .catch(err => console.log(err));
    }


    render() {
        if (this.state.redicrectTo) {
            return <Redirect to={{ pathname: this.state.redicrectTo }} />
        } else {
            return (

                <Container fluid>
                    <Container>
                        <Row>
                            <Col size="12">
                                <LoginForm
                                    handleFormSubmit={this.handleFormSubmit}
                                    handleInputChange={this.handleInputChange}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Container>
            )
        }
    }
}

export default Login