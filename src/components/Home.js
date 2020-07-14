import React, {Component} from 'react'
import {connect} from 'react-redux'
import Answered from './Answered'
import ViewQuestion from "./ViewQuestion";
import {Redirect} from 'react-router-dom'
import "../css/app.css"

class Home extends Component
{
	state = {
		view: 'unanswered',
		toViewPoll: false
	}
	
	handleAnswer = () => this.setState(state => state.view === 'unanswered' ? {view: 'answered'} : {view: 'unanswered'})
	
	
	toViewPoll = (id) => this.setState(() => ({toViewPoll: id}))
	
	render()
	{
		const {authUser, users, questionIDs} = this.props
		
		if (authUser === '')
		{
			return <Redirect to={{pathname: '/login', link: this.props.location.pathname}}/>
		}
		
		if (this.state.toViewPoll !== false)
		{
			return <Redirect to={`/questions/${this.state.toViewPoll}`} />
		}
		
		return (
			<div className="main">
				<div>
					<button className="btn" onClick={this.handleAnswer}>{this.state.view.charAt(0).toUpperCase() + this.state.view.slice(1)} Questions</button>
				</div>
				<div>
					<ul className='dashboard-list'>
						{this.state.view === 'unanswered' ?
							questionIDs.filter(id => !users[authUser].answers.hasOwnProperty(id)).map((id) => (
								<li key={id}>
									<ViewQuestion id={id} onViewPoll={this.toViewPoll}/>
								</li>
							)) :
							questionIDs.filter(id => users[authUser].answers.hasOwnProperty(id)).map((id) => (
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

const mapStateToProps = ({authUser, users, questions}) =>
({
	authUser,
	users,
	questionIDs: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
});

export default connect(mapStateToProps)(Home) 