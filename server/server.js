const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(express.json());

//this is reading the json file that I created
let progress = JSON.parse(fs.readFileSync(__dirname + '/progress.json', 'utf8'));

//initializing an array for me to load the quizQuestions into
const quizQuestions = [];
//this is the endpoint that triggers the quiz to begin, if you close and quiz and come back this endpoint will take you to the question you left off on
app.get('/quiz', (req, res) => {
	let filteredQuestions = quizQuestions.filter((question) => {
		return !question.answered;
	});
	if (filteredQuestions.length < 1) {
		//console.log(filteredQuestions);
		endGame(res);
	}
	//here I am generating a random index to allow me to randomize the questions
	let randomIdx = Math.floor(Math.random() * 100) % filteredQuestions.length;
	let question = filteredQuestions[randomIdx];
	res.json(question);
});
//this function is what totals the score at the end of the quiz
function endGame(res) {

	let score = 0;
	//I am iterating over the quiz question array of objects, there is a correct attribute, so I am checking if the question was correct, and if it was I increment it
	quizQuestions.forEach((question, i) => {
		if (question.correct) {
			score++;
		}
		quizQuestions[i].correct = false;
		quizQuestions[i].answered = false;
	});
	//This clears the json file so you can play again starting fresh without saved answers
	fs.writeFileSync(__dirname + '/progress.json', '{}', 'utf8');
	
	res.json({
		score,
		numOfQuestions: quizQuestions.length,
		percentage: (score / quizQuestions.length) * 100,
	}).end();
}
//this endpoint is where my http request goes to, to persist the data that the user answered.
app.post('/submitanswer', (req, res) => {
	//I know that the element in index 0 of the answers array is the correct answer
	let correctAnswer = quizQuestions[req.body.questionId].answers[0].content;
	//if the answer is in the req.body I know that it was sent in the body of the http request so it means the question was answered
    quizQuestions[req.body.questionId].answered = true;
    
	let answer = { 'result': 'incorrect' };
	if (correctAnswer === req.body.answerSubmission) {
		quizQuestions[req.body.questionId].correct = true;
		answer['result'] = 'correct';
	}
	//This is the file I am reading which is the object that saves the questions and answered
	fs.writeFileSync(__dirname + '/progress.json', JSON.stringify(quizQuestions), 'utf8');
	res.json(answer);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

const { isNull } = require('util');

// Read all the entire file into a string
fs.readFile(__dirname + '/quizQuestions.txt', 'utf8', function (err, data) {
	if (err) {
		throw err;
	}
	// split the file by line
	const lines = data.split('\n');
	let currentQuestion = {
		question: null,
		answers: [],
		questionId: 0,
	};
	let questionId = 1;
	// iterate over each  line
	for (let i = 0; i < lines.length; i++) {
		// remove leading and trailing whitespace
		let currentLine = lines[i].trim();
		// ignore empty lines
		if (currentLine === '') {
			quizQuestions.push(currentQuestion);
			currentQuestion = {
				question: null,
				questionId: questionId,
				answers: [],
				answered: false,
				correct: false,
			};

			questionId++;
			continue;
		} else if (currentLine.endsWith('?')) {
			// assume all questions end with '?'

			currentQuestion.question = currentLine;
			continue;
		} else if (currentQuestion.question) {
			// if we have a current question expect to parse answers
			if (currentLine.includes('(correct)')) {
				currentQuestion.answers.push({
					// remove (correct) from the content string
					content: currentLine.replace(' (correct)', ''),
				});
			} else {
				currentQuestion.answers.push({
					content: currentLine,
				});
			}
		}
	}
});