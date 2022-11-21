import React, { Component } from 'react';
import NavBar from "./NavBar";


//make API calls to backend
import axios from 'axios';

class Balance extends Component {
	constructor(props) {
        super(props);
        this.state = {
            total: "",
			error: ""
        }
    }
	componentDidMount() {
        axios.get('http://localhost:8080/balance',{ headers: { "Authorization": localStorage.getItem("jwtToken")}})
            .then((response) => {
                //update the state with the response data
				console.log(response);
                this.setState({
                    total: response.data
                });
            })
            .catch(err => {
                this.setState({
                    error: <div className="alert alert-warning" style={{ marginTop: '5%' }}>Please Login...</div>
                })
            });

    }
	
	render() {
		return (
			<div>
                <NavBar/>
				<div className="container" style={{ textAlign: "center" }}>
					<br></br>
					<h1>Balance</h1>
					<h2>₹{this.state.total}</h2>
					{this.state.error}
				</div>
			</div>
		)
	}
}

export default Balance;