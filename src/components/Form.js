import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class Form extends Component {
	userData;
	state = {
		answer: '',
	};

	handleAnswer = (event) => {
		this.setState({
			answer: event.target.value,
		});
	};

	handleSubmit = (event) => {
		console.log(localStorage.token);
		event.preventDefault();
	};

	componentDidMount() {
		this.userData = JSON.parse(localStorage.getItem('user'));
		if (localStorage.getItem('user')) {
			this.setState({
				answer: this.userData.answer,
			});
		} else {
			this.setState({
				answer: '',
			});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('user', JSON.stringify(nextState));
	}

	render() {
		return (
			<div class="form-group">
				<form onSubmit={this.handleSubmit}>
					<label for="exampleFormControlSelect1">Example select</label>
					<select class="form-control" id="exampleFormControlSelect1">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</select>
				</form>
			</div>
		);
	}
}

export default Form;
