import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Card from './Card'

export default combineReducers({
	router: routerReducer,
	cards : Card
})