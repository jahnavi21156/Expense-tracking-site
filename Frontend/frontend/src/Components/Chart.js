import React, { Component } from 'react';

//make API calls to backend
import axios from 'axios';

import { AgChartsReact } from 'ag-charts-react';
import { monthsInYear } from 'date-fns';
import NavBar from './NavBar';

export default class Chart extends Component {
	dataPoints = [];
	
	constructor(props) {
        super(props);

        this.state = {
            options: {
				type: 'line',
				autoSize: true,
				title: {
				    text: 'Expenses',
				},
				legend: {
				    enabled: false
				},
                data: this.dataPoints,
                series: [{
                    xKey: 'date',
                    yKey: 'spending',
                }],
            },
        };
    }
	
	componentDidMount(){
		axios.get('http://localhost:8080/recent',{ headers: { "Authorization": localStorage.getItem("jwtToken")}})
		.then((response) => {
			var i;
			var temp = 0;
			/* calculation for the days with multiple expenses entered */
			for (i = 0; i < response.data.length; i++) {
				if (i !== (response.data.length - 1) && !response.data[i + 1].date.localeCompare(response.data[i].date)) {
					temp += response.data[i].cost;
				} else {
					temp += response.data[i].cost;
					var day = response.data[i].date.substring(0, 10);
					this.dataPoints.push({
						date: String(day,),
						spending: Number(temp),
					});
					temp = 0;
				}
			}

			this.setState({
				options: {
					
			    	...this.state.options,
			    	data: this.dataPoints,
				},
			});
		}) 
		.catch(err => {
			this.setState({
				error: <div className="alert alert-warning" style={{ marginTop: '5%' }}>Please Login...</div>
			})
		});
		
		
	}
	
    render() {

        return <div><NavBar/><AgChartsReact options={this.state.options} /></div>;
    }
}