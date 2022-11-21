import React, { Component } from 'react';
import { render } from 'react-dom';
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import axios from 'axios';
import NavBar from './NavBar';

export default class C extends Component {
  constructor(props) {

    super(props);
    


   

    this.state = {
      result: [],
      d:[],
    };
  }

  

  componentDidMount() {
    axios.get('http://localhost:8080/expenses',{ headers: { "Authorization": localStorage.getItem("jwtToken")}})
		.then((response) => {
      this.setState({
        result: response.data
    });
    console.log(this.state.result)
  let a=[];
    const map1 = new Map();
    this.state.result.map(expenses =>{
      console.log(expenses);
      if(map1.has(expenses.category))
      {
        let f= map1.get(expenses.category)+expenses.cost;
        map1.set(expenses.category,f)

      }
      else{
      map1.set(expenses.category,expenses.cost)
      }
      // map1[expenses.category]+=expenses.cost;
      console.log(map1[expenses.category])
    
    
    })
      map1.forEach((value, key)=>{
         a.push({"label":key,"value":value})
      })
      console.log(a);

     this.setState({
      d:a
     });
  })}


   

  render() {
    return <div><NavBar/><AgChartsReact options={{
      data: this.state.d,
      series: [
        {
          type: 'pie',
          angleKey: 'value',
          calloutLabelKey: 'label',
          sectorLabelKey: 'value',
          sectorLabel: {
            color: 'black',
            fontWeight: 'bold',
          },
        },
      ],
    }} /></div>;
  }
}





