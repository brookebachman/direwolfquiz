const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());
app.options('*', cors());

// 1. Parse quiz questions
// 2. Start server
// 3. Create the different
//   a. Start quiz (this allows us to identify differents)
//   b. Get question (input probably needs to be some quiz)
//   c. Submit answer 
//   d. Get Final Score

//work on request body
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//   });

app.post('/startquiz', (req, res) => {
  res.send('Hello World!')
})
const quizQuestions = [];
app.get('/nextquestion', (req, res) => {
    let numQuestions = quizQuestions.length;
		let randomIdx = Math.floor(Math.random() * 100) % numQuestions;
		let question = quizQuestions[randomIdx];
        quizQuestions.splice(randomIdx, 1);
        res.json(question);

  })

app.post('/submitanswer', (req, res) => {
    res.send('Hello World!')
})

app.post('/finalscore', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

var fs = require('fs');



// Read all the entire file into a string
fs.readFile( __dirname + '/quizQuestions.txt', "utf8", function (err, data) {
  if (err) {
    throw err; 
  }
  // split the file by line
  const lines = data.split('\n');
  let currentQuestion = {
    question: null,
    answers: [],
  };
  // iterate over each  line
  for (let i = 0; i < lines.length; i++) {
    // remove leading and trailing whitespace
 	let currentLine = lines[i].trim();
    // ignore empty lines
    if (currentLine === '') {
      quizQuestions.push(currentQuestion);
      currentQuestion = {
        question: null,
        answers: [],
      };
      continue;
    } else if (currentLine.endsWith('?')) { // assume all questions end with '?'
    
      currentQuestion.question = currentLine;
      continue;
    } else if (currentQuestion.question) { // if we have a current question expect to parse answers
        if (currentLine.includes('(correct)')) {
           currentQuestion.answers.push({
           // remove (correct) from the content string
             content: currentLine.replace(' (correct)', ''),
             value: true,
      	   });
         } else {
           currentQuestion.answers.push({
           content: currentLine,
           value: false,
         });
        }
    }
  }
  
});

// server.js
/*
1. Parse quiz questions
2. Start server
3. Create the different
  a. Start quiz (this allows us to identify differents)
  b. Get question (input probably needs to be some quiz)
  c. Submit answer 
  d. Get Final Score */
