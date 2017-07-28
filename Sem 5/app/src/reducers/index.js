import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Card from './Card'
import Panel from './Panel'

export default combineReducers({
	router: routerReducer,
	cards : Card,
	panels: Panel
})