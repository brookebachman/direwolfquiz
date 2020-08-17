import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Score from './components/score.js'
//import Form from './components/Form.js'
import Question from './components/Question';

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

	getNextQuestion() {
		fetch('http://localhost:3000/nextquestion', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
				this.setState({
					currentQuestion: data,
					id: data,
				});
			});
	}

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
        this.getNextQuestion()
			});

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
