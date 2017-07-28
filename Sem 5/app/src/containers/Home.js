import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Panels from './../components/Panels'
import PanelActions from './../actions/PanelActions'

import './Home.scss'

class Home extends Component {
	constructor(props) {
		super (props)

		this.handleCreatePanel = this.handleCreatePanel.bind(this)
	}

	handleCreatePanel() {
		this.props.createPanel()
	}

	render() {
		const { panels } = this.props
		
		return (
			<div>
				<div className="col-xs-12 action-create">
					<button className="btn btn-primary" onClick={ this.handleCreatePanel }>
						<i className="ion-plus-round"></i> New Panel
					</button>
				</div>
				<Panels
					panels={ panels } 
					editPanel={ this.props.editPanel }
					deletePanel={ this.props.deletePanel }
					movePanel={ this.props.movePanel }
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		panels: state.panels
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createPanel: () => dispatch(PanelActions.createPanel('New Panel')),
		editPanel: (id, value) => {
			const edited = { id }

			if (!value) {
				edited.edit = true
			} else {
				edited.edit = false
				edited.text = value
			}

			dispatch(PanelActions.editPanel(edited))
		},
		deletePanel: (id) => dispatch(PanelActions.deletePanel(id)),
		movePanel: (id, monitorId) => dispatch(PanelActions.move(id, monitorId))
	}
}

export default DragDropContext(HTML5Backend)(
	connect(mapStateToProps, mapDispatchToProps)(Home)
)