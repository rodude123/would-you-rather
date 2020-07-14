import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAddQuestion} from '../actions/shared'
import {Redirect} from 'react-router-dom'
import '../css/app.css'

class NewQuestion extends Component
{
	state = {
		optionOne: '',
		optionTwo: '',
		toHome: false
	}
	handleChange = (e) =>
	{
		const text = e.target.value
		const option = e.target.name
		
		this.setState((state) => ({
				optionOne: option === '1' ? text : state.optionOne,
				optionTwo: option === '2' ? text : state.optionTwo
			}
		))
	}
	handleSubmit = (e) =>
	{
		e.preventDefault()
		
		const {dispatch, id} = this.props
		
		dispatch(handleAddQuestion(this.state))
		
		this.setState(() => ({
			optionOne: '',
			optionTwo: '',
			toHome: !id
		}))
	}
	
	render()
	{
		const {optionOne, optionTwo, toHome} = this.state
		
		if (this.props.authUser === '')
		{
			return <Redirect to={{pathname: '/login', link: this.props.location.pathname}}/>
		}
		
		if (toHome === true)
		{
			return <Redirect to='/'/>
		}
		
		return (
			<div className='question'>
				<div className="content">
					<h1 className='center'>Create new Question</h1>
					<p>Complete the question:</p>
					<h3>Would you rather ...</h3>
					<form className='new-tweet' onSubmit={this.handleSubmit}>
						<input placeholder="Enter Option One Text Here" type='text' name='1' value={this.state.optionOne}
						       onChange={this.handleChange}/>
						<p>OR</p>
						<input placeholder="Enter Option Two Text Here" type='text' name='2' value={this.state.optionTwo}
						       onChange={this.handleChange}/>
						<br/>
						<br/>
						<button type='submit' disabled={optionOne === '' || optionTwo === ''}>Submit</button>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps({authUser})
{
	return {
		authUser
	}
}

export default connect(mapStateToProps)(NewQuestion)