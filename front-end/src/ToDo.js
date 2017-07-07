// 3rd Party modules
import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Custom modules
import Home from './Home';
import Delete from './Delete';
import Edit from './Edit';

class ToDo extends Component {
// 		constructor(props) {
//     		super(props);
// 			// Make sure addStudent uses the correct this
// 			this.addTask = this.addTask.bind(this);
// 		}

// 		addTask(event){
// 			var taskToAdd = event.target.parentNode.childNodes[0].value; // This is one way!
// 			// var studentToAdd = document.getElementById('newStudent') // This is another way!
// 			// console.log(studentToAdd);
// 			// this is a POST request, so we can't use $.getJSON (only does get)
// 			// $.ajax expects an object that tells it what to send (data), where to send it (url), and how to send it (method)
// 			// $.ajax is a promise which has a "done" method that will run when ajax is back.
// 			// It gets a param of whatever JSON was returned by the API request
// 			// Inside that function, we update react state (theClass) which causes a re-render, which updates the list because we're mapping through state.
// 			$.ajax({
// 				method: "POST",
// 				url: "http://localhost:3000/addTask",
// 				data: {taskName: taskToAdd}
// 			}).done((tasksArray)=>{
// 				this.setState({
// 						theTasks: tasksArray
// 				})
// 			})
// 		}

	render() {

    	return(
			<Router>
				<div className="to-do-app">
					<Route exact path="/" component={Home} />
					<Route path="/task/delete/:taskId" component={Delete} />
                    <Route path="/task/edit/:taskId" component={Edit} />
				</div>
			</Router>
    	)
	}
}

export default ToDo;
