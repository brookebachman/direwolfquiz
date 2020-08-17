import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Score from './components/Score.js'
//import Form from './components/Form.js'
import Question from './components/Question.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestion: null,
			correctAnswer: false,
		};
	}

	componentDidMount() {
		this.getNextQuestion();
	}

	//This function initializes a get request to get the question from the server
	getNextQuestion() {
		fetch('http://localhost:3000/quiz', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				//here we are updating state to have the current question and its id
				this.setState({
					currentQuestion: data,
					id: data,
				});
			});
	}

	//This function allows us to send the answer that has been chosen by the user back to the server. We also keep track of what question has already been asked. We send this information back to the server in the body
	storeAnswers = (event, question, index) => {
		console.log(event.target.value);
		fetch('http://localhost:3000/submitanswer', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				answerSubmission: event.target.value,
				questionId: this.state.currentQuestion.questionId,
			}),
		})
			.then((resp) => resp.json())
			.then((data) => {
				//after we have successfully sent the information back to the server we want to render another question
				this.getNextQuestion()
			
			});
			event.target.checked = false
	};

	render() {
		if (this.state.currentQuestion === null) {
			return <div></div>;
		}
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1>So you think you know Gaming?</h1>
        {(typeof this.state.currentQuestion.answers) !== "undefined" ?  
					<Question question={this.state.currentQuestion} storeAnswers={this.storeAnswers} />
      :    <Score score={this.state.currentQuestion} />  }
      	</div>
			</div>
		);
	}
}

export default App;
