import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatQuestion} from './helper'
import "../css/app.css"

class Answered extends Component
{
	handleViewPoll = (e) =>
	{
		e.preventDefault()
		
		const {question, onViewPoll} = this.props
		
		onViewPoll(question.id)
	}
	
	render()
	{
		const {question} = this.props
		
		if (question === null)
		{
			return <p>This question doesn't exist</p>
		}
		
		const {
			name, avatar, optionOne, optionTwo, answer
		} = question
		
		return (
			<div className='question' onClick={this.handleViewPoll}>
				<div>
					<p>{name} asks</p>
				</div>
				<div>
					<img src={avatar !== '' ? avatar : '../blankProfile.png'} alt={`Avatar of ${name}`} style={{width: 96, height: 96}} className='avatar'/>
					<div>
						<p>Would You Rather ...</p>
						<div>
							<p>{answer === 1 ? optionOne.text : optionTwo.text}</p>
							<button className="btm" onClick={this.handleViewPoll}>View Poll</button>
						</div>
					</div>
				</div>
			</div>
		)
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

export default connect(mapStateToProps)(Answered)