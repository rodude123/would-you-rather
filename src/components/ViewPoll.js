import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatQuestion} from './helper'
import {Redirect} from 'react-router-dom'
import Unanswered from './Unanswered'

class ViewPoll extends Component
{
	state = {
		toViewPoll: false
	}
	
	toViewPoll = (id) => this.setState(() => ({toViewPoll: id}))
	
	render()
	{
		const {question, authedUser} = this.props
		
		if (authedUser === '')
		{
			return <Redirect to={{pathname: '/login', link: this.props.location.pathname}}/>
		}
		
		if (question === null)
		{
			return <p>This question doesn't exist</p>
		}
		
		const {name, avatar, optionOne, optionTwo} = question
		const vote = optionOne.votes.includes(authedUser) ? 1 : optionTwo.votes.includes(authedUser) ? 2 : 0
		
		if (vote === 0)
		{
			return <Unanswered id={question.id} onViewPoll={this.toViewPoll}/>
		}
		
		const voteOne = optionOne.votes.length
		const voteTwo = optionTwo.votes.length
		const total = voteOne + voteTwo
		const perfOne = voteOne * 100 / total
		const perfTwo = voteTwo * 100 / total
		
		return (
			<div className='question'>
				<div>
					<p>Asked by {name} </p>
				</div>
				<div>
					<img src={avatar} alt={`Avatar of ${name}`} style={{width: 96, height: 96}} className='avatar'/>
					<div>
						<p>Results: (*: your vote)</p>
						<p>Would You Rather {optionOne.text}</p>
						<p>{`${voteOne} out of ${total} vote(s) (${perfOne.toFixed(2)}%) ${vote === 1 ? '(*)' : ''}`}</p>
						<p>Would You Rather {optionTwo.text}</p>
						<p>{`${voteTwo} out of ${total} vote(s) (${perfTwo.toFixed(2)}%) ${vote === 2 ? '(*)' : ''}`}</p>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps({authedUser, questions, users}, props)
{
	const {id} = props.match.params
	const question = questions[id]
	
	return {
		authedUser,
		question: question
			? formatQuestion(question, users[question.author], authedUser)
			: null
	}
}

export default connect(mapStateToProps)(ViewPoll)