import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
//import Form from './components/Form.js'

import Result from './components/Result.js';
import Question from './components/Question';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//   counter: 0,
			//   questionId: 1,
			//   question: '',
			//   answerOptions: [],
			//   answer: '',
			//   answersCount: {},
			//   result: '',
			//   myAnswers: []
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

	getTotalQuestions() {
		// fetch("http://localhost:3000/nextquestion")
		// let alreadyAnswered = this.state.answerSubmissions.length;
		// let totalQs = quizQuestions.length + alreadyAnswered;
		// if (this.state.currentQuestion !== null) {
		// 	totalQs += 1;
		// }
		return 10;
	}

	// getCurrentQuestionNumber() {
	// 	return this.state.answerSubmissions.length + 1;
	// }

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
		// let result = document.createElement("h2")
		// result.innerHTML = this.state.correctAnswer
		// let answers = [];
		// let questionAnswer = {
		// 	answer: index,
		// 	question: question,
		// };

		// let answerSubmissions = this.state.answerSubmissions;
		// //answerSubmissions.push(questionAnswer);
		// this.setState({
		// 	answerSubmissions: answerSubmissions,

		// });
	};

	// setUserAnswer(answer) {
	//   this.setState((state) => ({
	//     answersCount: {
	//       ...state.answersCount,
	//       [answer]: (state.answersCount[answer] || 0) + 1
	//     },
	//     answer: answer
	//   }));
	// }

	// handleAnswerSelected = (questionId, event) => {
	//   console.log(event)
	//   console.log(questionId)
	//   this.setUserAnswer(event.target.value);

	//   if (this.state.questionId < quizQuestions.length) {
	//       setTimeout(() => this.setNextQuestion(), 500);
	//       let updatedAnswers = this.state.myAnswers.concat({questionId: questionId, answer: event.target.value})
	//       //this.setState is an async function so if I just set state the component will not be mounted yet
	//         this.setState((prevState) => ({
	//           myAnswers: updatedAnswers
	//         }));
	//       localStorage.setItem("myAnswers", JSON.stringify(updatedAnswers))
	//       JSON.parse(localStorage.getItem('myAnswers'));

	//     } else {
	//       setTimeout(() => this.setResults(this.getResults()), 500);
	//     }

	// }

	// setNextQuestion() {
	//   const counter = this.state.counter + 1;
	//   const questionId = this.state.questionId + 1;
	//   this.setState({
	//     counter: counter,
	//     questionId: questionId,
	//     question: quizQuestions[counter].question,
	//     answerOptions: quizQuestions[counter].answers,
	//     answer: '',
	//     index: quizQuestions[counter].index
	//   });
	// }

	// getResults() {
	//   const answersCount = this.state.answersCount;
	//   const answersCountKeys = Object.keys(answersCount);
	//   const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
	//   const maxAnswerCount = Math.max.apply(null, answersCountValues);

	//   return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
	// }

	// setResults (result) {
	//   if (result.length === 1) {
	//     this.setState({ result: result[0] });
	//   } else {
	//     this.setState({ result: 'Undetermined' });
	//   }
	// }

	// renderResult() {
	//   return (
	//     <Result quizResult={this.state.result} />
	//   );
	// }
	// renderQuiz() {
	//   return (
	//     <Quiz
	//       answer={this.state.answer}
	//       answerOptions={this.state.answerOptions}
	//       questionId={this.state.index}
	//       question={this.state.question}
	//       questionTotal={quizQuestions.length}
	//       onAnswerSelected={this.handleAnswerSelected}
	//     />
	//   );
	// }

	render() {
		if (this.state.currentQuestion === null) {
			return <div></div>;
		}
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1>So you think you know Gaming?</h1>

					<Question question={this.state.currentQuestion} storeAnswers={this.storeAnswers} />
				</div>
				{/* {this.state.result ? this.renderResult() : this.renderQuiz()} */}
			</div>
		);
	}
}

export default App;
