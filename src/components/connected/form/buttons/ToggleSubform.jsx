import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { collapser } from 'components/static/animation/Collapser';

import { formCollapsedMapStateToProps } from 'selectors/formCollapsed';
import { setSubformCollapsed } from 'actions/subform';

@connect(
	formCollapsedMapStateToProps,
	dispatch => bindActionCreators({ setSubformCollapsed }, dispatch)
)
@collapser({
	toggleAnimTime: 1,
})
export class ToggleSubform extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		isCollapsed: React.PropTypes.bool,

		getCollapsable: React.PropTypes.func,
		setSubformCollapsed: React.PropTypes.func,

		onRequestToggleCollapse: React.PropTypes.func,

	};

	componentDidUpdate(prevProps) {
		console.log('btn did update');
	}

	onClickToggle = () => {
		this.props.setSubformCollapsed(this.props.tableId, !this.props.isCollapsed);
	}

	getCollapsable = () => {
		return this.props.getCollapsable();
	}

	toggleCollapse(val) {
		console.log('collapse %s', val);
		this.props.setSubformCollapsed(this.props.tableId, val);
	}

	checkIsCollapsed(props) {
		return (props || this.props).isCollapsed;
	}

	render() {
		const toggleLabel = this.props.isCollapsed ? 'show' : 'hide';
		return <a className="button-round" onClick={this.props.onRequestToggleCollapse}>{ toggleLabel }</a>;
		// return <button onClick={this.deleteRecord} className="button-circle-danger-small"><i className="fa fa-remove"></i></button>;
	}
}
