import React , { Component } from 'react'

class InputEditable extends Component {
	constructor(props) {
		super(props)
		
		this.handleClickToEdit = this.handleClickToEdit.bind(this)
		this.handleEdit        = this.handleEdit.bind(this)
		this.handleDelete      = this.handleDelete.bind(this)
	}

	handleClickToEdit() {
		const { id } = this.props
		this.props.clickToEdit(id)
	}

	handleEdit(e) {
		if (e.type === 'keypress' && e.key !== 'Enter') {
			return
		}

		const text = e.target.value
		const { id } = this.props

		if (text.trim().length) {
			this.props.editComponent(id, text)
		}
	}

	handleDelete() {
		const { id } = this.props

		this.props.deleteComponent(id)
	}

	renderEditable() {
		return (
			<div>
				<input type="text" 
						className="form-control" 
						defaultValue={ this.props.text } 
						onBlur={ this.handleEdit } 
						onKeyPress={ this.handleEdit }/>				
			</div>
		)
	}

	renderText() {
		return (
			<div className="row">
				<div className="col-xs-10 no-padding">
					<input type="text" 
						   className="form-control" 
						   defaultValue={ this.props.text }
						   onClick={ this.handleClickToEdit }
						   readOnly />
				</div>
				<button className="btn btn-danger btn-delete col-xs-2" onClick={ this.handleDelete }>
					<i className="ion-trash-b"></i>
				</button>
			</div>
		)	
	}

	render() {
		if (this.props.edit) {
			return this.renderEditable()
		}

		return this.renderText()
	}
}

export default InputEditable