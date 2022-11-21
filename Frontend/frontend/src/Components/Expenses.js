import React, { Component } from 'react';
import NavBar from "./NavBar";


//make API calls to backend
import axios from 'axios';

//CSS Framework for developing responsive websites
import { Table } from "react-bootstrap";

class Expenses extends Component  {
	constructor(props) {
        super(props);
        this.state = {
            result: [],
            error: ""
        }
    }
    
    update=()=>{
        axios.get('http://localhost:8080/expenses',{ headers: { "Authorization": localStorage.getItem("jwtToken")}})
        .then((response) => {
            //update the state with the response data
            console.log(response);
            this.setState({
                result: response.data
            });
        })
        .catch(err => {
            this.setState({
                error: <div className="alert alert-warning" style={{ marginTop: '5%' }}>Please Login....</div>
            })
        });
    }

    delete=(id)=>{
      axios.delete("http://localhost:8080/delete/"+id,{ headers: { "Authorization": localStorage.getItem("jwtToken")}})
      .then(response => {
        if(response.data != null){
            alert("Expense deleted successfully.");
            this.setState({
                result: response.data
            })
        }
      }

       // this.update()

      )
      
    }

    invoke = (event) => {
        let arg1 = event.target.getAttribute('value');
       console.log(arg1);
       this.delete(arg1);
        }
      
	
	componentDidMount() {
        axios.get('http://localhost:8080/expenses',{ headers: { "Authorization": localStorage.getItem("jwtToken")}})
            .then((response) => {
                //update the state with the response data
				console.log(response);
                this.setState({
                    result: response.data
                });
            })
            .catch(err => {
                this.setState({
                    error: <div className="alert alert-warning" style={{ marginTop: '5%' }}>Please Login....</div>
                })
            });

    }

    render(){
		let error = this.state.error;

        let details = this.state.result.map(expenses => {
            return (
                <tr>
                    <td>{expenses.date}</td>
                    <td>{expenses.description}</td>
					<td>₹{expenses.cost}</td>
                    <td>{expenses.category}</td>
                    <td><button className='btn btn-danger' onClick={this.invoke} value={expenses.id}>Delete</button></td>
                </tr>
            )
        })
        return(
			<div>
                <NavBar/>
                <div className="container" style={{ textAlign: "center" }}>
                    <br></br>
                    <h1>Expenses</h1>
                    <br></br>
                    <div>
                        <Table>
							<colgroup>
								<col span="1" style={{width: '20%'}}/>
								<col span="1" style={{width: '20%'}}/>
								<col span="1" style={{width: '20%'}}/>
							</colgroup>
							
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Date</th>
									<th scope="col">Description</th>
                                   	<th scope="col">Cost</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </Table>
                        {error}
                    </div>
                </div>
            </div>
        )
    }
}

export default Expenses;