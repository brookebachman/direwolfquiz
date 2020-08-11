import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class Form extends Component {
	state = {
		username: '',
		password: '',
		date: '',
		time: '',
		confirmed: '',
	};

	handleTime = (event) => {
		this.setState({
			time: event.target.value,
		});
	};
	handleDate = (event) => {
		this.setState({
			date: event.target.value,
		});
	};
	handleSubmit = (event) => {
        console.log(localStorage.token);
		event.preventDefault();

		fetch(`http://localhost:3000/appointments`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.token}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				appointmentee_id: parseInt(localStorage.userId),
				appointmenter_id: this.props.doulaId,
				date: this.state.date,
				time: this.state.time,
				confirmed: true,
			}),
		})
			.then((r) => r.json())
			.then((data) => console.log(data));
	};

	render() {
		return (
			<div>
				{localStorage.token ? null : <Redirect to="/login" />}
				<h1 id="appointment">Book An Appointment</h1>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="formDate">
						<Form.Label>Date of Appointment</Form.Label>
						<Form.Control
							onChange={this.handleDate}
							value={this.state.date}
							type="date"
							placeholder="Enter A Date"
						/>
						<Form.Text className="date"></Form.Text>

						<Form.Group controlId="formTime">
							<Form.Label>What time are you available?</Form.Label>
							<Form.Control
								onChange={this.handleTime}
								value={this.state.time}
								type="time"
								placeholder="Enter Time"
							/>
							<Form.Text className="text"></Form.Text>
						</Form.Group>
					
						<Button variant="success" id="button" type="submit">
							Send your answer!!
						</Button>
					
					</Form.Group>
				</Form>
			</div>
		);
	}
}


export default Form;
