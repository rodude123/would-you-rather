import {GET_USERS} from '../actions/getUsers'
import {ADD_USER, ANSWER_USER, UNANSWERED_USER} from '../actions/shared'

export default function users(state = {}, action)
{
	switch (action.type)
	{
		case GET_USERS :
			return {...state, ...action.users}
		case ANSWER_USER :
			return {
				...state, [action.authUser]: {
					...state[action.authUser], answers: {
						...state[action.authUser].answers, [action.qid]: action.answer
					}
				}
			}
		case UNANSWERED_USER :
			const {qid, ...answers} = state[action.authUser].answers
			return {
				...state, [action.authUser]: {
					...state[action.authUser], answers: answers
				}
			}
		case ADD_USER :
			return {
				...state, [action.authUser]: {
					...state[action.authUser], questions: state[action.authUser].questions.concat([action.id])
				}
			}
		default :
			return state
	}
}