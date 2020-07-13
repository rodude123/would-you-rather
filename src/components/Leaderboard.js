import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Leaderboard extends Component
{
	render()
	{
		const {authedUser} = this.props
		const users = Object.assign({}, this.props.users)
		
		if (authedUser === '')
		{
			return <Redirect to={{pathname: '/login', link: this.props.location.pathname}}/>
		}
		
		Object.keys(users).forEach(key =>
		{
			const user = users[key]
			const answered = Object.keys(users[key].answers).length
			const created = users[key].questions.length
			
			user.answered = answered
			user.created = created
			user.score = answered + created
		})
		
		const userIDs = Object.keys(users)
		.sort((a, b) => users[b].score - users[a].score)
		
		return (
			<div>
				<div>
					<ul className='leaderboard-list'>
						{userIDs.map(id => (
							<li key={users[id].id}>
								<img src={users[id].avatarURL} alt={`Avatar of ${users[id].name}`}
								     style={{width: 96, height: 96}} className='avatar'/>
								<p>{users[id].name}</p>
								<p>{`Answered Questions: ${users[id].answered}`}</p>
								<p>{`Created Questions: ${users[id].created}`}</p>
								<p>{`Score: ${users[id].answered + users[id].created}`}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		)
	}
}

function mapStateToProps({authedUser, users})
{
	return {
		authedUser,
		users
	}
}

export default connect(mapStateToProps)(Leaderboard) 
