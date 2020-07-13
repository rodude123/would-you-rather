import { combineReducers } from 'redux'
import authUser from './authUser'
import users from './users'
import questions from './questions'

export default combineReducers({
	authUser,
	users,
	questions
})