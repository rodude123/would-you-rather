import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatQuestion} from './helper'
import {handleAnswerQuestion} from '../actions/shared'
import "../css/app.css"

class UnansweredQuestion extends Component
{
	state = {
		answer: ''
	}
	
	handleChange = (e) =>
	{
		this.setState({answer: e.target.value})
		console.log(this.state.answer);
	}
	
	handleAnswer = (e) =>
	{
		e.preventDefault()
		
		const {dispatch, question, authUser, onViewPoll} = this.props
		
		dispatch(handleAnswerQuestion({
			qid: question.id,
			authUser,
			answer: this.state.answer
		}))
		
		onViewPoll(question.id)
	}
	
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
		
		const {name, avatar, optionOne, optionTwo} = question
		
		return (
			<div className='question' onClick={this.handleViewPoll}>
				<div>
					<p>{name} asks</p>
				</div>
				<div>
					<img src={avatar !== '' ? avatar : '../blankProfile.png'} alt={`Avatar of ${name}`} style={{width: 96, height: 96}} className='avatar'/>
					<div>
						<p>Would You Rather ...</p>
						<form className='question-info' onSubmit={this.handleAnswer}>
							<input type='radio' checked={this.state.answer === "optionOne"} name='optionOne'
							       value='optionOne' onChange={this.handleChange}/>
							{optionOne.text}
							<br/>
							<input type='radio' checked={this.state.answer === "optionTwo"} name='optionTwo'
							       value='optionTwo' onChange={this.handleChange}/>
							{optionTwo.text}
							<br/><br/>
							<button className="btn" type="submit" disabled={!this.state.answer}>Submit</button>
						</form>
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
		question: question
			? formatQuestion(question, users[question.author], authUser)
			: null
	}
}

export default connect(mapStateToProps)(UnansweredQuestion)