import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Home from './Home'
import NewQuestion from './NewQuestion'
import ViewPoll from './ViewPoll'
import Nav from './Nav'
import Leaderboard from './Leaderboard'
import Login from './Login'

class App extends Component
{
	componentDidMount()
	{
		this.props.dispatch(handleInitialData())
	}
	
	render()
	{
		return (
			<Router>
				<div className='container'>
					{this.props.login && <Nav/>}
					{this.props.loading &&
					<div>
						<Route path='/' exact component={Home}/>
						<Route path='/questions/:id' component={ViewPoll}/>
						<Route path='/add' component={NewQuestion}/>
						<Route path='/leaderboard' component={Leaderboard}/>
						<Route path='/login' component={Login}/>
					</div>}
				</div>
				<br/>
			</Router>
		)
	}
}

function mapStateToProps({authUser})
{
	return {
		loading: authUser !== null,
		login: authUser !== ''
	}
}

export default connect(mapStateToProps)(App)