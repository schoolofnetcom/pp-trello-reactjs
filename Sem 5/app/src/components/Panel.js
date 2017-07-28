import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cards from './Cards'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'

import InputEditable from './InputEditable'
import CardActions from './../actions/CardActions'
import PanelActions from './../actions/PanelActions'
import * as Types from './../constants/Types'

class Panel extends Component {
	static propTypes = {
		createCard: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		connectDragSource: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)
		
		this.handleCreateCard = this.handleCreateCard.bind(this)
		this.handleDeleteCard = this.handleDeleteCard.bind(this)
		this.handleDeletePanel = this.handleDeletePanel.bind(this)
	}

	handleCreateCard() {
		const { id } = this.props.panel
		this.props.createCard(id)
	}

	handleDeleteCard(cardId) {
		const panelId = this.props.panel.id

		this.props.deleteCard(panelId, cardId)
	}

	handleDeletePanel(panelId) {
		const { cards } = this.props.panel

		this.props.deletePanel(panelId)

		cards.forEach(card => this.props.deleteCard(panelId, card))
	}

	render() {
		const { cards, panel, connectDragPreview, connectDropTarget, connectDragSource } = this.props 
		const filteredCards = panel.cards
								.map(id => cards
											.find(card => card.id === id ))
								.filter(card => card)
		return connectDragPreview (
			connectDropTarget(
				<div className="col-md-3">
					{ connectDragSource(
						<div className="panel panel-default">
							<div className="panel-heading">
								<InputEditable 
									id={ panel.id }
									edit={ panel.edit }
									text={ panel.text }
									editComponent={ this.props.editPanel }
									clickToEdit={ this.props.editPanel }
									deleteComponent={ this.handleDeletePanel }
								/>
							</div>
							<div className="panel-body">
								<Cards 
									cards={ filteredCards }
									clickToEdit={ this.props.editCard }
									editCard={ this.props.editCard }
									deleteCard={ this.handleDeleteCard }
									moveCard={ this.props.moveCard }
								/>
							</div>
							<div className="panel-footer">
								<button className="btn btn-primary" onClick={this.handleCreateCard}>
									<i className="ion-plus-round"></i> Card
								</button>
							</div>
						</div>
					)}
				</div>
			)
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cards: state.cards
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createCard: (panelId) => {
			const createNewCard = CardActions.createCard('New Task') 
			dispatch(createNewCard) 
			const { id } = createNewCard.payload
			dispatch(PanelActions.insertInPanel(panelId, id))
		},
		editCard  : (id, value) => {
			const edited = { id }

			if (!value) {
				edited.edit = true
			} else {
				edited.edit = false
				edited.text = value
			}

			dispatch(CardActions.editCard(edited))
		},
		deleteCard : (panelId, cardId) => {
			dispatch(CardActions.deleteCard(cardId))

			if (!panelId) {
				return
			}

			return dispatch(PanelActions.removeFromPanel(panelId, cardId))
		} ,
		moveCard: (id, monitorId) => dispatch(PanelActions.moveCard(id, monitorId)),
		insertInPanel: (id, monitorId) => dispatch(PanelActions.insertInPanel(id, monitorId))
	}
}

// Drag and Drop
const dragNDropSrc = {
	beginDrag(props) {
		return { id: props.panel.id }
	}
}

const collect = (connect, monitor) => ({
	connectDragSource  : connect.dragSource(),
	isDragging 	       : monitor.isDragging(),
	connectDragPreview : connect.dragPreview()
})

const collectTarget = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget()
})

const panelHoverTarget = {
	hover(props, monitor) {
		const { id, cards } = props.panel
		const monitorProps = monitor.getItem()
		const monitorType  = monitor.getItemType()
		const monitorId = monitorProps.id

		if (id !== monitorId && Types.PANEL === monitorType) {
			return props.movePanel(id, monitorId)
		}		

		if (!cards.length && Types.CARD === monitorType) {
			return props.insertInPanel(id, monitorId)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	DragSource(Types.PANEL, dragNDropSrc, collect)(
		DropTarget([Types.CARD, Types.PANEL], panelHoverTarget, collectTarget)(Panel)
	)
)