import React, { Component } from 'react';

export function checkIsCollapsed(props) {
	// console.log(props);
	return props.isCollapsed;
}

export class CollapsableForm extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		isCollapsed: React.PropTypes.bool,
		isShowCollapsable: React.PropTypes.bool,
	};

	setCollapsable = (el) => {
		this._collapsable = el;
	}

	getCollapsable = (el) => {
		return this._collapsable;
	}

	/**
	La prop provient du decorateur collapser
	*/
	isShowCollapsable() {
		console.log('prop show collapsable %s', this.props.isShowCollapsable);
		return this.props.isShowCollapsable;
	}

}
