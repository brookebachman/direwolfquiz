import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
//import Form from './components/Form.js'
import quizQuestions from './components/api/quizQuestions.js';
import Quiz from './components/Quiz.js'
import Result from './components/Result.js'


 class App extends Component {

  constructor(props) {
    super(props);
    
      this.state = {
        counter: 0,
        questionId: 1,
        question: '',
        answerOptions: [],
        answer: '',
        answersCount: {},
        result: '',
        myAnswers: []
  
        
      };

  
  }
 
  componentDidMount() {
    const newA = JSON.parse(localStorage.getItem("myAnswers"))
    console.log(newA)
    if ( newA != null){
      for (let i = 0; i < newA.length; i ++){
        console.log(newA[i].questionId)
          quizQuestions[i] = quizQuestions[newA[i].questionId]
      }
      
    }
    
    const lId = newA == null ? 1 :  newA.length + 1
    const random = this.shuffleArray(quizQuestions,lId-1)
    console.log(random)
    console.log(lId)
    
    // this.moveOverSaved(random, newA);
    const shuffledAnswerOptions = random.map((question) => this.shuffleArray(question.answers, 0));  

    this.setState({
      questionId: lId,
      question: random[lId].question,
      answerOptions: shuffledAnswerOptions[lId],
      myAnswers: newA === null ? [] : newA,
      questionIndex: random[lId].index
    });


  }



  shuffleArray(array, startIndex) {
    console.log(startIndex)

    // function getRandom(floor, ceiling) {
    //   return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
    // }
    
    // function shuffle(array) {
    
    //   // If it's 1 or 0 items, just return
    //   if (array.length <= 1) return;
    
    //   // Walk through from beginning to end
    //   for (let indexWeAreChoosingFor = 0;
    //     indexWeAreChoosingFor < array.length - 1; indexWeAreChoosingFor++) {
    
    //     // Choose a random not-yet-placed item to place there
    //     // (could also be the item currently in that spot)
    //     // must be an item AFTER the current item, because the stuff
    //     // before has all already been placed
    //     const randomChoiceIndex = getRandom(indexWeAreChoosingFor, array.length - 1);
    
    //     // Place our random choice in the spot by swapping
    //     if (randomChoiceIndex !== indexWeAreChoosingFor) {
    //       const valueAtIndexWeChoseFor = array[indexWeAreChoosingFor];
    //       array[indexWeAreChoosingFor] = array[randomChoiceIndex];
    //       array[randomChoiceIndex] = valueAtIndexWeChoseFor;
    //     }
    //   }
    // }
  let currentIndex = array.length
   let temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (startIndex !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  };

  setUserAnswer(answer) {
    this.setState((state) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  handleAnswerSelected = (questionId, event) => {
    console.log(event)
    console.log(questionId)
    this.setUserAnswer(event.target.value);


    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 500);
        let updatedAnswers = this.state.myAnswers.concat({questionId: questionId, answer: event.target.value})
        //this.setState is an async function so if I just set state the component will not be mounted yet
          this.setState((prevState) => ({
            myAnswers: updatedAnswers
          }));
        localStorage.setItem("myAnswers", JSON.stringify(updatedAnswers))
        JSON.parse(localStorage.getItem('myAnswers'));
      
      } else {
        setTimeout(() => this.setResults(this.getResults()), 500);
      }
      
  }


  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: '',
      index: quizQuestions[counter].index
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);
  
    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults (result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  
  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }
  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.index}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }
  

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>So you think you know Gaming?</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    )
  }
}

export default App;
