import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import reducers from './reducers'

const history = createHistory()
const middlewares = routerMiddleware(history)

const configStore = (initalState) => {
	return createStore(
		reducers,
		initalState,
		applyMiddleware(middlewares)
	)
}

export default { configStore, history }