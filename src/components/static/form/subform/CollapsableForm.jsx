import React, { Component } from 'react';

import { Collapser } from '../../../../animation/Collapser';

export class CollapsableForm extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		isCollapsed: React.PropTypes.bool,
		setSubformCollapsed: React.PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.collapser = new Collapser({
			getOpenState: (fromProps) => {
				const propsToCheck = fromProps || this.props;
				return !propsToCheck.isCollapsed;
			},
			changeState: () => {
				this.props.setSubformCollapsed(this.props.tableId, !this.props.isCollapsed);
			},
			getContainer: () => {
				return this._collapsable;
			},
		});
	}

	componentDidUpdate(prevProps) {
		this.collapser.didUpdate(prevProps);
		if (super.componentDidUpdate) super.componentDidUpdate(prevProps);
	}

	setCollapsable = (el) => {
		this._collapsable = el;
	}
}
