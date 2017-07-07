import React, { Component } from 'react';
import $ from 'jquery';

class Edit extends Component {
	constructor(props) {
		super(props);
		
	}

	render(){
		return(
			<div className="container">
				<h2>Are you sure you want to delete {this.state.taskData.taskName}?</h2>
				<div>{this.state.taskData.taskName} - {this.state.taskData.taskDate}</div>
				<button onClick={this.confirmDelete} className="btn btn-danger">Yes!</button>
				<button onClick={this.runForCover} className="btn btn-default">No!</button>
			</div>
		)
	}
}

export default Edit;