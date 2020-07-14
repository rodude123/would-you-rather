import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAuthUser} from '../actions/authUser'
import '../css/nav.css'

class Nav extends Component
{
	handleLogout = (e) =>
	{
		e.preventDefault()
		
		const {dispatch} = this.props
		
		dispatch(setAuthUser(''))
	}
	
	render()
	{
		const {authUser, users} = this.props
		const show = authUser && users ? 1 : 0
		return (
			<nav className='nav'>
				<ul>
					<li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
					<li><NavLink to='/add' activeClassName='active'>New Question</NavLink></li>
					<li><NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink></li>
					<li id="info">Hello, {show && users[authUser].name}</li>
					<li><NavLink to='/login' activeClassName='active' onClick={this.handleLogout}>Logout</NavLink></li>
				</ul>
			</nav>
		)
	}
}

function mapStateToProps({authUser, users})
{
	return {
		authUser,
		users
	}
}

export default connect(mapStateToProps)(Nav) 