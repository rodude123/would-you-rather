import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setAuthUser} from '../actions/authUser.js'
import {Redirect} from 'react-router-dom'

class Login extends Component
{
	state = {
		select: 'select',
		redirect: false
	}
	
	handleChange = (e) =>
	{
		this.setState({select: e.target.value})
	}
	
	handleLogin = (e) =>
	{
		e.preventDefault()
		
		const {dispatch} = this.props
		
		dispatch(setAuthUser(this.state.select))
		
		this.setState(() =>
		({
			redirect: true
		}))
	}
	
	render()
	{
		const {redirect} = this.state
		
		if (redirect === true)
		{
			return <Redirect to={this.props.location.link}/>
		}
		
		const {users} = this.props
		
		return (
			<div>
				<h3>Welcome to the Would You Rather App!</h3>
				<p>Please sign in to continue</p>
				<form onSubmit={this.handleLogin}>
					<select defaultValue='select' onChange={this.handleChange}>
						<option value='select' disabled>Select User</option>
						{Object.keys(users).map(id =>
						(
							<option key={id} value={id}>{users[id].name}</option>
						)
						)}
					</select>
					<br/><br/>
					<button type="submit" disabled={this.state.select === 'select'}>Sign In</button>
				</form>
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

export default connect(mapStateToProps)(Login) 