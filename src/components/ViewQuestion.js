import React, {Component} from 'react';
import {formatQuestion} from "./helper";
import {connect} from "react-redux";
import '../css/app.css'

class ViewQuestion extends Component
{
	handleViewQuestion = e =>
	{
		e.preventDefault()
		
		const {question, onViewPoll} = this.props
		
		onViewPoll(question.id)
	};
	
	render()
	{
		const {name, avatar, optionOne, optionTwo, answer} = this.props.question
		
		return (
			<div className='question content'>
				<div>
					<p>{name} asks</p>
				</div>
				<div>
					<img src={avatar !== '' ? avatar : '../blankProfile.png'} alt={`Avatar of ${name}`} style={{width: 96, height: 96}} className='avatar'/>
					<div>
						<p>Would You Rather ...</p>
						<div>
							<p>{optionOne.text.charAt(0).toUpperCase() + optionOne.text.slice(1)}</p>
							<p>OR</p>
							<p>{optionTwo.text.charAt(0).toUpperCase() + optionTwo.text.slice(1)}</p>
							<button className="btn" onClick={this.handleViewQuestion}>View Question</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({authUser, users, questions}, {id, onViewPoll})
{
	const question = questions[id]
	return {
		authUser,
		onViewPoll,
		question: question ? formatQuestion(question, users[question.author], authUser) : null
	}
}

export default connect(mapStateToProps)(ViewQuestion)