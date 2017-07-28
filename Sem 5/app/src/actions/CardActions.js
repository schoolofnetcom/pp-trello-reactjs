import * as ActionTypes from './../constants/ActionTypes'
import uuid from 'uuid/v4'

const createCard = (value) => {
	return {
		type: ActionTypes.CREATE_CARD,
		payload: {
			id: uuid(),
			edit: false,
			text: value
		}
	}
}

const editCard = (edited) => {
	return {
		type: ActionTypes.EDIT_CARD,
		payload: edited
	}
}

const deleteCard = (id) => {
	return {
		type: ActionTypes.DELETE_CARD,
		payload: { id }
	}
}

export default {
	createCard,
	editCard,
	deleteCard
}