import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "./NavBar";
import "../App.css"
import Home from "./Home";
import Expenses from "./Expenses"
import AddExpense from './AddExpense'
import Chart from './Chart'
import C from './C';
import Login from './User/Login';
import Register from './User/Register';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

class Main extends Component {
	    render(){
        return(
            <div bg="dark" variant="dark">
				
				{/*Render Different Component based on Route*/}
	            <Switch>
					<Route path="/login" exact component={Login} />
					<Route path='/C' component={C}/>
					<Route path="/register" exact component={Register} />
					<Route path='/home' component={Home} />
					<Route path='/expenses' component={Expenses} />
					<Route path='/add' component={AddExpense} />
					<Route path='/statistic' component={Chart} />
					<Route  path='/' component={Home}/>

				</Switch>
			</div>
        )
    }
}

export default Main;