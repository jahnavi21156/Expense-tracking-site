import React, { Component } from "react";

import NavBar from "./NavBar";

//make API calls to backend
import axios from "axios";

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      description: "",
      cost: "",
      category: "Select",
      open: false,
    };
  }


   handleOpen = (event) => {
    this.setState({ open: true });  };

   handleMenuOne = (event) => {
    this.setState({category: event.target.innerText})
    this.setState({ open: false }); 
  };

   handleMenuTwo = (event) => {
    this.setState({ open: false }); 
    this.setState({category: event.target.innerText})
  };

  handleMenuThree = (event) => {
    this.setState({ open: false }); 
    this.setState({category: event.target.innerText})
  };

  handleMenuFour = (event) => {
    this.setState({ open: false }); 
    this.setState({category: event.target.innerText})
  };
  handleMenuFive = (event) => {
    this.setState({ open: false }); 
    this.setState({category: event.target.innerText})
  };
  handleMenuSix = (event) => {
    this.setState({ open: false }); 
    this.setState({category: event.target.innerText})
  };



  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeCostHandler = (event) => {
    this.setState({ cost: event.target.value });
  };

  changeDateHandler = (event) => {
    this.setState({ date: event.target.value });
  };

  changeCategoryHandler=(event)=>{
    this.setState({category: event.target.value})
  }

  addExpense = () => {
    console.log(this.state.date);
    if (this.state.date && this.state.description && this.state.cost &&this.state.category) {
      const expense = {
        date: this.state.date,
        description: this.state.description,
        cost: this.state.cost,
        category: this.state.category
      };

      axios.post("http://localhost:8080/add", expense,{ headers: { "Authorization": localStorage.getItem("jwtToken")}});

      alert("Expense Successfully Added");
    }
  };

  cancel() {
    this.props.history.push("/home");
  }

  render() {
    return (
      <div>
        <NavBar/>
        {localStorage.getItem("jwtToken")!=null?(<div className="container">
          <br></br>
          <h1 style={{ textAlign: "center" }}>Add an Expense</h1>
          <br></br>
          <div className="form-container">
            <form autoComplete="off">
              <div className="form-group">
                <label htmlFor="description"> Description </label>
                <input
                  id="description"
                  placeholder="Enter description"
                  className="form-control"
                  onChange={this.changeDescriptionHandler}
                  required
                />
              </div>


              <div className="form-group">
                <label htmlFor="category"> Category </label>

                <div className="dropdown">
      <button  class="btn btn-secondary dropdown-toggle" onClick={this.handleOpen}>{this.state.category}</button>
      {this.state.open ? (
        <ul className="menu">
          <li className="menu-item">
            <button class="dropdown-item" onClick={this.handleMenuOne}>Food</button>
          </li>
          <li className="menu-item">
            <button  class="dropdown-item" onClick={this.handleMenuTwo}>Entertainment</button>
          </li>
          <li className="menu-item">
            <button  class="dropdown-item" onClick={this.handleMenuThree}>Travelling</button>
          </li>
          <li className="menu-item">
            <button  class="dropdown-item" onClick={this.handleMenuFour}>Grocery</button>
          </li>
          <li className="menu-item">
            <button  class="dropdown-item" onClick={this.handleMenuFive}>Shopping</button>
          </li>
          <li className="menu-item">
            <button  class="dropdown-item" onClick={this.handleMenuSix}>Loan</button>
          </li>
        </ul>
      ) : null}
    </div>
				
				
              </div>
              <div className="form-group">
                <label htmlFor="cost"> Cost </label>
                <div className="form-inline">
                  ₹&nbsp;&nbsp;
                  <input
                    type="number"
                    id="cost"
                    placeholder="Enter cost"
                    className="form-control"
                    step="0.01"
                    onChange={this.changeCostHandler}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="date"> Date </label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  onChange={this.changeDateHandler}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-success"
                onClick={this.addExpense}
              >
                {" "}
                Add{" "}
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-danger"
                onClick={this.cancel.bind(this)}
              >
                {" "}
                Cancel{" "}
              </button>
            </form>
          </div>
        </div>):(<div className="alert alert-warning  " style={{ marginTop: '5%', textAlign:"center" }}>Please Login...</div>)}
        
      </div>
    );
  }
}

export default AddExpense;
