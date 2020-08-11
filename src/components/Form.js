import React, { Component } from 'react';

class Form extends Component {
	state = {
		answer: null,
		isTrue: false,
	};

	handleAnswer = (event) => {
		this.setState({
			answer: event.target.value,
		});
	
	};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(event.target.value);
	};

	userData;
	componentDidMount() {
		this.userData = JSON.parse(localStorage.getItem('user'));
		if (localStorage.getItem('user')) {
			this.setState({
				answer: this.userData.answer,
			});
		} else {
			this.setState({
				answer: '',
			});
		}
	}

	componentDidUpdate(nextProps, nextState) {
		localStorage.setItem('user', JSON.stringify(nextState));
	}

	questions = [
		{
			question: 'In what year was Sega Genesis released in North America?',
			quest1: '1989',
			quest2: '1999',
			quest3: '1975',
			quest4: '1991',
		},

		{
			question: 'Which of the following video games takes place in a dystopian underwater city called Rapture?',
			quest1: 'Bioshock',
			quest2: 'Half-Life',
			quest3: 'God Of War',
			quest4: 'Fallout 3',
		},

		{
			question: 'What Nintendo system was released after the N64 and before the Wii?',
			quest1: 'Gamecube',
			quest2: 'Nintendo 128',
			quest3: 'Virtual Boy',
			quest4: 'Super Nintendo',
		},

		{
			question: 'Honda, Dhalsim and Chun Li are all characters from what video game series?',
			quest1: 'Street Fighter',
			quest2: 'Teenage Mutant Ninja Turtles',
			quest3: 'Battletoads',
			quest4: 'Mortal Kombat',
		},

		{
			question: 'What color is the ring of death on an XBOX that signifies a hardware failure?',
			quest1: 'Red',
			quest2: 'Blue',
			quest3: 'Yellow',
			quest4: 'Green',
		},

		{
			question:
				'What classic beat-em-up game featured brothers Billy Lee and Jimmy (also nicknamed Spike and Hammer)?',
			quest1: 'Double Dragon',
			quest2: 'Smash Brothers',
			quest3: 'Ninja Gaiden',
			quest4: 'Snow Brothers',
		},

		{
			question: 'How many bits was the Super Nintendo Entertainment System?',
			quest1: '16',
			quest2: '8',
			quest3: '128',
			quest4: '64',
		},

		{
			question: 'What character do you play as in The Legend Of Zelda?',
			quest1: 'Link',
			quest2: 'Gandolf',
			quest3: 'Chimmy',
			quest4: 'Peter',
		},

		{
			question: 'What 64-bit Sega system was a predecessor to the PlayStation and Nintendo 64?',
			quest1: 'Saturn',
			quest2: 'Dreamcast',
			quest3: 'Commodore 128',
			quest4: '3DO',
		},

		{
			question: 'The game Grand Theft Auto was released primarily for what gaming system?',
			quest1: 'PlayStation',
			quest2: 'Dreamcast',
			quest3: 'XBOX',
			quest4: 'NES',
		},

		{
			question:
			'Which James Bond film was made into a game for the Nintendo 64 console and later for the Wii console?',
			quest1: 'Goldeneye',
			quest2: 'Thunderball',
			quest3: 'Moonraker',
			quest4: 'Goldfinger',
		},

		{
			question:
			'Which popular video game features an ex-Special Forces operator named Jack Carver, who is stranded in Micronesia?',
			quest1: 'Far Cry',
			quest2: 'Halo 2',
			quest3: 'Left 4 Dead',
			quest4: 'Max Payne',
		},
	];

	render() {
		return (
			<div>
				
				<form onSubmit={this.handleSubmit}>
					{this.questions.map((question) => (
						//console.log(question.question)
						//debugger;
						
						<div className="form-group">
							<div id="question">
							<label className="form-group">{question.question}</label>
						<select onChange={this.handleAnswer} className="form-control" id="forms">
						
							<option value={this.state.answer}>{question.quest1}</option>
							<option value={this.state.answer}>{question.quest2}</option>
							<option value={this.state.answer}>{question.quest3}</option>
							<option value={this.state.answer}>{question.quest4}</option>
						</select></div>
						</div>
						
					))}

					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default Form;
