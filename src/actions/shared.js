import {receiveUsers} from '../actions/users'
import {receiveQuestions} from '../actions/getQuestions'
import {setAuthedUser} from '../actions/authUser'
import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer,} from '../utils/_DATA'
import {hideLoading, showLoading} from 'react-redux-loading'

const AUTHED_ID = ''

export const ANSWER_USER = 'ANSWER_USER'
export const UNANSWERED_USER = 'UNANSWERED_USER'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const UNANSWERED_QUESTION = 'UNANSWERED_QUESTION'
export const ADD_USER = 'ADD_USER'
export const ADD_QUESTION = 'ADD_QUESTION'

export const getInitialData = () => Promise.all([
	_getUsers(),
	_getQuestions(),
]).then(([users, questions]) => ({
	users,
	questions,
}));

export const saveQuestionAnswer = info => _saveQuestionAnswer(info);

export const saveQuestion = info => _saveQuestion(info);

export const handleInitialData = () => (dispatch) =>
{
	dispatch(showLoading())
	return getInitialData()
	.then(({users, questions}) =>
	{
		dispatch(receiveUsers(users))
		dispatch(receiveQuestions(questions))
		dispatch(setAuthedUser(AUTHED_ID))
		dispatch(hideLoading())
	})
};

const answerQuestion = ({qid, authedUser, answer}, type) => 
({
	type: type,
	qid,
	authedUser,
	answer
});

export const handleAnswerQuestion = info => (dispatch) =>
{
	dispatch(answerQuestion(info, ANSWER_USER))
	dispatch(answerQuestion(info, ANSWER_QUESTION))
	
	return saveQuestionAnswer(info)
	.catch((e) =>
	{
		console.warn('Error in answerQuestion: ', e)
		dispatch(answerQuestion(info), UNANSWERED_USER)
		dispatch(answerQuestion(info), UNANSWERED_QUESTION)
		alert('The was an error answering the question. Try again.')
	})
};

const addQuestion = (question, type) =>
({
	type: type,
	authedUser: question.author,
	id: question.id,
	question: question
});

export const handleAddQuestion = info => (dispatch, getState) =>
{
	const {authedUser} = getState()
	
	dispatch(showLoading())
	
	return saveQuestion({
		author: authedUser,
		optionOneText: info.optionOne,
		optionTwoText: info.optionTwo
	})
	.then((question) =>
	{
		dispatch(addQuestion(question, ADD_USER))
		dispatch(addQuestion(question, ADD_QUESTION))
	})
	.then(() => dispatch(hideLoading()))
};