import React from 'react';

function Question(props) {
	let wrapperNode = React.useRef(null);

	
	let shuffledArray = props.question.answers.sort(() => Math.random() - 0.5);

	React.useEffect(() => {
		[...wrapperNode.current.querySelectorAll('.radioCustomButton')].forEach((input) => {
			input.checked = false;
		});
	}, [props.question]);
	return (
		<div ref={wrapperNode}>
		
			<h2 className="question">{props.question.question} </h2>


			{shuffledArray.map((element, index) => (
				<p className="answerOption">
					<input
						type="radio"
						className="radioCustomButton"
						name="radioGroup"
						value={element.content}
						onChange={(event) => props.storeAnswers(event, props.question, index)}
					/>
					{element.content}
				</p>
			))}
		
		</div>
	);
}

export default Question;
