export function formatQuestion(question, author, authedUser)
{
	const {id, optionOne, optionTwo} = question
	const {name, avatarURL} = author
	
	return {
		name,
		id,
		avatar: avatarURL,
		optionOne,
		optionTwo,
		answer: optionOne.votes.includes(authedUser) ? 1 : optionTwo.votes.includes(authedUser) ? 2 : 0
	}
}