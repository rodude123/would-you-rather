import {getUsers} from './getUsers'
import {getQuestions} from './getQuestions'
import {setAuthUser} from './authUser'
import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer,} from '../utils/_DATA'

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

export const saveQuestionAnswer = _saveQuestionAnswer;

export const saveQuestion = _saveQuestion;

export const handleInitialData = () => (dispatch) =>
{
	return getInitialData().then(({users, questions}) =>
	{
		dispatch(getUsers(users))
		dispatch(getQuestions(questions))
		dispatch(setAuthUser(AUTHED_ID))
	})
};

const answerQuestion = ({qid, authUser, answer}, type) =>
({
	type: type,
	qid,
	authUser,
	answer
});

export const handleAnswerQuestion = info => (dispatch) =>
{
	dispatch(answerQuestion(info, ANSWER_USER))
	dispatch(answerQuestion(info, ANSWER_QUESTION))
	
	return saveQuestionAnswer(info).catch((e) =>
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
	authUser: question.author,
	id: question.id,
	question: question
});

export const handleAddQuestion = info => (dispatch, getState) =>
{
	const {authUser} = getState()
	
	
	return saveQuestion({
		author: authUser,
		optionOneText: info.optionOne,
		optionTwoText: info.optionTwo
	}).then((question) =>
	{
		dispatch(addQuestion(question, ADD_USER))
		dispatch(addQuestion(question, ADD_QUESTION))
	})
};