export function formatQuestion(question, author, authUser)
{
	const {id, optionOne, optionTwo} = question
	const {name, avatarURL} = author
	
	return {
		name,
		id,
		avatar: avatarURL,
		optionOne,
		optionTwo,
		answer: optionOne.votes.includes(authUser) ? 1 : optionTwo.votes.includes(authUser) ? 2 : 0
	}
}