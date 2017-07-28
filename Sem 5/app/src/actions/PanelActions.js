import * as ActionTypes from './../constants/ActionTypes'
import uuid from 'uuid/v4'

const createPanel = (value) => {
	return {
		type: ActionTypes.CREATE_PANEL,
		payload: {
			id: uuid(),
			text: value,
			edit: false,
			cards: []
		}
	}
}

const editPanel = (edited) => {
	return {
		type: ActionTypes.EDIT_PANEL,
		payload: edited
	}
}

const deletePanel = (id) => {
	return {
		type: ActionTypes.DELETE_PANEL,
		payload: { id }
	}
}
const move = (id, monitorId) => {
	return {
		type: ActionTypes.MOVE_PANEL,
		payload: { id, monitorId }
	}
}

const moveCard = (id, monitorId) => {
	return {
		type: ActionTypes.MOVE_CARD,
		payload: { id, monitorId }
	}	
}

const insertInPanel = (panelId, cardId) => {
	return {
		type: ActionTypes.INSERT_IN_PANEL,
		payload: { panelId, cardId }
	}
}

const removeFromPanel = (panelId, cardId) => {
	return {
		type: ActionTypes.REMOVE_FROM_PANEL,
		payload: { panelId, cardId }
	}
}

export default {
	createPanel,
	editPanel,
	deletePanel,
	move,
	moveCard,
	insertInPanel,
	removeFromPanel
}