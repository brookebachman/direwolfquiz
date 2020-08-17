import React from 'react';


function Question(props) {
	console.log(props.question);
	return (
		<>
			<h2 className="question">{props.question.question} </h2>
	
			{props.question.answers.map((element, index) => (
				<p className="answerOption">
					<input
						type="radio"
						className="radioCustomButton"
						name="radioGroup"
						value = {element.content}
						onChange={(event) => props.storeAnswers(event, props.question, index)}
					/>
					{element.content}
				</p>
			))}
			
		</>
	);
}

export default Question;
