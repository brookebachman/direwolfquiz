import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
//import Form from './components/Form.js'
import quizQuestions from './components/api/quizQuestions.js';
import Quiz from './components/Quiz.js';
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
			answerSubmissions: [],
		};
	}

	componentDidMount() {
		// const newA = JSON.parse(localStorage.getItem("myAnswers"))
		// console.log(newA)
		// if ( newA != null){
		//   for (let i = 0; i < newA.length; i ++){
		//     console.log(newA[i].questionId)
		//       quizQuestions[i] = quizQuestions[newA[i].questionId]
		//   }

		// }

		// const lId = newA == null ? 1 :  newA.length + 1
		// const random = this.shuffleArray(quizQuestions,lId-1)
		// console.log(random)
		// console.log(lId)

		// this.moveOverSaved(random, newA);
		// const shuffledAnswerOptions = random.map((question) => this.shuffleArray(question.answers, 0));

		this.setState({
			// questionId: lId,
			// question: random[lId].question,
			// answerOptions: shuffledAnswerOptions[lId],
			// myAnswers: newA === null ? [] : newA,
			// questionIndex: random[lId].index

			currentQuestion: this.getNextQuestion(quizQuestions),
		});
	}

	getNextQuestion(quizQuestions) {
		let numQuestions = quizQuestions.length;
		let randomIdx = Math.floor(Math.random() * 100) % numQuestions;
		let question = quizQuestions[randomIdx];
    quizQuestions.splice(randomIdx,1);
    console.log(question)
    return question;
    
    
  }
  
  storeAnswers = (event, question, index) => {
    let answers = []
    let questionAnswer = {
      answer: index,
      question: question
    }

    let answerSubmissions = this.state.answerSubmissions;
    answerSubmissions.push(questionAnswer);
    this.setState({
      answerSubmssions: answerSubmissions,
      currentQuestion: this.getNextQuestion(quizQuestions),
    });
  
  }

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
    if (this.state.currentQuestion === null) { return (
    <div></div> )}
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>So you think you know Gaming?</h2>
					<Question question={this.state.currentQuestion} storeAnswers={this.storeAnswers} />
				</div>
				{/* {this.state.result ? this.renderResult() : this.renderQuiz()} */}
			</div>
		);
	}
}

export default App;
