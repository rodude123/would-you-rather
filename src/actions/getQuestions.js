export const GET_QUESTIONS = 'GET_QUESTIONS'

export const getQuestions = questions =>
({
	type: GET_QUESTIONS,
	questions,
});