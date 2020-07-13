import {GET_QUESTIONS} from '../actions/getQuestions'
import {ADD_QUESTION, ANSWER_QUESTION, UNANSWERED_QUESTION} from '../actions/shared'

export default function questions(state = {}, action)
{
	switch (action.type)
	{
		case GET_QUESTIONS :
			return {...state, ...action.questions}
		case ANSWER_QUESTION :
			return {
				...state, [action.qid]: {
					...state[action.qid], [action.answer]: {
						...state[action.qid][action.answer],
						votes: state[action.qid][action.answer].votes.concat([action.authUser])
					}
				}
			}
		case UNANSWERED_QUESTION :
			return {
				...state, [action.qid]: {
					...state[action.qid], [action.answer]: {
						...state[action.qid][action.answer],
						votes: state[action.qid][action.answer].votes.filter(vote => vote !== action.authUser)
					}
				}
			}
		case ADD_QUESTION :
			return {...state, [action.id]: action.question}
		default :
			return state
	}
}