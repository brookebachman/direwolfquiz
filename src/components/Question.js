import React from 'react';

function Question(props) {
	//const [checked, setChecked] = React.useState("")
	return (
		<>
			<h2 className="question">{props.question.question} </h2>

{props.question.answers.map((element, index) => (
	
	<p className="answerOption">
	 	{/* <input
	// 		type="radio"
	// 		checked={setChecked(true)}
	// 		name="radioGroup"
	// 		value={element.content}
	// 		onChange={this.check}
	// 	/> */}
		<input
			type="checkbox"
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
