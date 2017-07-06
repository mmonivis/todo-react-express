import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		theClass: [],
            teacher: "Rob"
    	}
        // Make sure addStudent uses the correct this
        this.addStudent = this.addStudent.bind(this);
    }

    //componentDidMount runs AFTER the first render
    componentDidMount() {
        // getJSON request to localhost:3000... that's where express runs
        $.getJSON('http://localhost:3000/getStudents', (studentsFromApi)=>{
            // log the JSON response from Express
            console.log(studentsFromApi)
            this.setState({
                theClass: studentsFromApi
            })
        });
        // Update the state, this will cause a re-render
        // this.setState({
        //     theClass: [1,2,3,4]
        // })
    }

    addStudent(event){
        var studentToAdd = event.target.parentNode.childNodes[0].value; // This is one way!
        // var studentToAdd = document.getElementById('newStudent') // This is another way!
        // console.log(studentToAdd);
        // this is a POST request, so we can't use $.getJSON (only does get)
        // $.ajax expects an object that tells it what to send (data), where to send it (url), and how to send it (method)
        // $.ajax is a promise which has a "done" method that will run when ajax is back.
        // It gets a param of whatever JSON was returned by the API request
        // Inside that function, we update react state (theClass) which causes a re-render, which updates the list because we're mapping through state.
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/addStudent",
            data: {name: studentToAdd}
        }).done((studentsArray)=>{
            this.setState({
                theClass: studentsArray
            })
        })
    }

	render() {

        // create an Array to dump into our return. It will contain components or HTML tags
		var theClassArray = [];
        // loop through our state var. First time through, it will be empty... 
		this.state.theClass.map((student,index)=>{
            // push li tag onto array for each element in the state variable
            theClassArray.push(<li key={index}>{student.name}</li>)
		});

		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
                <div className="add-box">
                    <input type="text" id="newStudent" />
                    <button onClick={this.addStudent}>Add Student</button>
                </div>
                <p>
                    {theClassArray}
                </p>
			</div>
		);
	}
}

export default App;
