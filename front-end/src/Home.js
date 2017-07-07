import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskList: []
		}
		this.addNewTask = this.addNewTask.bind(this)
	}

	//componentDidMount runs AFTER the first render
	componentDidMount() {
		// getJSON request to localhost:3000... that's where express runs
		$.getJSON('http://localhost:3000/getTasks', (tasksFromApi)=>{
			// log the JSON response from Express
			console.log(tasksFromApi)
			this.setState({
				taskList: tasksFromApi
			})
		});
		// Update the state, this will cause a re-render
		// this.setState({
		//		 theClass: [1,2,3,4]
		// })
	}

		addNewTask(event){
			event.preventDefault();
			var newTask = document.getElementById('new-task').value;
			var newTaskDate = document.getElementById('new-task-date').value;
			// console.log(newTask)
			// console.log(newTaskDate)
			// var taskToAdd = event.target.parentNode.childNodes[0].value; // This is one way!
			// var studentToAdd = document.getElementById('newStudent') // This is another way!
			// console.log(studentToAdd);
			// this is a POST request, so we can't use $.getJSON (only does get)
			// $.ajax expects an object that tells it what to send (data), where to send it (url), and how to send it (method)
			// $.ajax is a promise which has a "done" method that will run when ajax is back.
			// It gets a param of whatever JSON was returned by the API request
			// Inside that function, we update react state (theClass) which causes a re-render, which updates the list because we're mapping through state.
			$.ajax({
				method: "POST",
				url: "http://localhost:3000/addTask",
				data: {
					taskName: newTask,
					taskDate: newTaskDate
			 	}
			}).done((tasksArray)=>{
				this.setState({
					taskList: tasksArray
				})
			})
		}

	render(){

		// create an Array to dump into our return. It will contain components or HTML tags
		var taskArray = [];
			// var theDatesArray = [];
			// loop through our state var. First time through, it will be empty... 
		this.state.taskList.map((task,index)=>{
			// push li tag onto array for each element in the state variable
			taskArray.push(
				<ul key={index} className="taskItem">
					<li>{task.taskName}</li>
					<Link to={`/task/delete/${task.id}`}><li>Delete</li></Link>
					<Link to={`/task/edit/${task.id}`}><li>Edit</li></Link>
				</ul>);
			// theDatesArray.push(<li key={index}>{task.taskDate}</li>)
		});

		return(
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
				<form onSubmit={this.addNewTask} className="add-box">
					<input type="text" id="new-task" placeholder="New Task..." />
					<input type="date" id="new-task-date" />
					<button type="submit" className="btn btn-primary">Add Task</button>
				</form>
				<div className="col-sm-4 col-sm-offset-4">
					{taskArray}
				</div>
			</div>
		)
	}
}

export default Home;