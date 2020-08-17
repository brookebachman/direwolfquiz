const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(express.json());

let progress = JSON.parse(fs.readFileSync(__dirname + '/progress.json', 'utf8'));

app.post('/startquiz', (req, res) => {
	res.send('Hello World!');
});
const quizQuestions = [];
app.get('/nextquestion', (req, res) => {
	let filteredQuestions = quizQuestions.filter((question) => {
		return !question.answered;
	});
	if (filteredQuestions.length < 1) {
		//console.log(filteredQuestions);
		endGame(res);
	}

	let randomIdx = Math.floor(Math.random() * 100) % filteredQuestions.length;
	let question = filteredQuestions[randomIdx];
	
	res.json(question);
});

function endGame(res) {
	let score = 0;
	quizQuestions.forEach((question, i) => {
		if (question.correct) {
			score++;
		}
		quizQuestions[i].correct = false;
		quizQuestions[i].answered = false;
	});
	fs.writeFileSync(__dirname + '/progress.json', '{}', 'utf8');
	//this clears the json file so you can play again newly
	res.json({
		score,
		numOfQuestions: quizQuestions.length,
		percentage: (score / quizQuestions.length) * 100,
	}).end();
}

app.post('/submitanswer', (req, res) => {
    let correctAnswer = quizQuestions[req.body.questionId].answers[0].content;
    console.log(correctAnswer, "correct answer", req.body.answerSubmission, "answer sub")
    quizQuestions[req.body.questionId].answered = true;
    
	let answer = { 'result': 'incorrect' };
	if (correctAnswer === req.body.answerSubmission) {
		quizQuestions[req.body.questionId].correct = true;
		answer['result'] = 'correct';
	}
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