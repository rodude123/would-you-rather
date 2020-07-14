import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Home from './Home'
import NewQuestion from './NewQuestion'
import ViewPoll from './ViewPoll'
import Nav from './Nav'
import Leaderboard from './Leaderboard'
import Login from './Login'
import PageNotFound from "./PageNotFound";

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
					<Switch>
						<Route path='/' exact component={Home}/>
						<Route path='/questions/:id' component={ViewPoll}/>
						<Route path='/add' exact component={NewQuestion}/>
						<Route path='/leaderboard' exact component={Leaderboard}/>
						<Route path='/login' exact component={Login}/>
						<Route component={PageNotFound}/>
					</Switch>}
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