import React, {Component} from 'react'
import {connect} from 'react-redux'
import Answered from './Answered'
import Unanswered from './Unanswered'
import {Redirect} from 'react-router-dom'

class Home extends Component
{
	state = {
		view: 'unanswered',
		toViewPoll: false
	}
	
	handleAnswer = () => this.setState(
		state => state.view === 'unanswered' ?
			{view: 'answered'} :
			{view: 'unanswered'}
	)
	
	toViewPoll = (id) => this.setState(() => ({toViewPoll: id}))
	
	render()
	{
		const {authedUser, users, questionIDs} = this.props
		
		if (authedUser === '')
		{
			return <Redirect to={{pathname: '/login', link: this.props.location.pathname}}/>
		}
		
		if (this.state.toViewPoll !== false)
		{
			return <Redirect to={`/questions/${this.state.toViewPoll}`}/>
		}
		
		return (
			<div>
				<div>
					<button onClick={this.handleAnswer} disabled={this.state.view === 'unanswered'}>Unanswered
						Questions
					</button>
					<button onClick={this.handleAnswer} disabled={this.state.view === 'answered'}>Answered Questions
					</button>
				</div>
				<div>
					<ul className='dashboard-list'>
						{this.state.view === 'unanswered' ?
							questionIDs.filter(id => !users[authedUser].answers.hasOwnProperty(id)).map((id) => (
								<li key={id}>
									<Unanswered id={id} onViewPoll={this.toViewPoll}/>
								</li>
							)) :
							questionIDs.filter(id => users[authedUser].answers.hasOwnProperty(id)).map((id) => (
								<li key={id}>
									<Answered id={id} onViewPoll={this.toViewPoll}/>
								</li>
							))
						}
					</ul>
				</div>
			</div>
		)
	}
}

function mapStateToProps({authedUser, users, questions})
{
	return {
		authedUser,
		users,
		questionIDs: Object.keys(questions)
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
	}
}

export default connect(mapStateToProps)(Home) 