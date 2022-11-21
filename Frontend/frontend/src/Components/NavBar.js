import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavBar=(props)=> {
	const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logoutRequest = () => {
	return {
	  type: "LOGOUT_REQUEST",
	};
  };
  const logoutUser = () => {
	  localStorage.removeItem("jwtToken");
	//   props.history.push("/login");

  };
  

	
	
		return (
			<div>
				<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/home">Expense Tracker</Navbar.Brand>
				
				{localStorage.getItem("jwtToken")!=null?(<div><Nav className="mr-auto">
					<Nav.Link href="/home">Home</Nav.Link>
					<Nav.Link href="/expenses">Expenses</Nav.Link>
					<Nav.Link href="/add">Add</Nav.Link>
					<Nav.Link href="/statistic">Statistic</Nav.Link>
					<Nav.Link href="/C">Chart</Nav.Link></Nav></div>):(<div></div>)}
					
				
				{localStorage.getItem("jwtToken")!=null?(
					<Nav className="justify-content-end">
						<NavItem style={{marginLeft:'980px'}}>
						<Link to={"login"} className="nav-link" onClick={logoutUser}>
          					<FontAwesomeIcon icon={faSignOutAlt} /> Logout
        				</Link> 
						</NavItem>
        			</Nav>
				):(<div><Nav style={{marginLeft:'1150px'}}>
       				 <Link to={"register"} className="nav-link">
          				<FontAwesomeIcon icon={faUserPlus} /> SignUP
       			    </Link> <Link to={"login"} className="nav-link">
         				 <FontAwesomeIcon icon={faSignInAlt} /> Login
        			</Link>
     			 </Nav>
			</div>)}
				
				</Navbar>
			</div>
		)
	}


export default NavBar;