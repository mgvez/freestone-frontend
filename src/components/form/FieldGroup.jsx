import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Collapsable from '../animation/Collapsable';
import ToggleCollapse from './buttons/ToggleCollapse';
import { StyledFieldGroup } from '../../styles/Input';
import { GridContainer } from '../../styles/Grid';

export default class FieldGroup extends Component {
	static propTypes = {

		id: PropTypes.string,
		label: PropTypes.string,
		isPlaceholder: PropTypes.bool,
		children: PropTypes.node,
		isCollapsed: PropTypes.bool,

		toggleFieldGroup: PropTypes.func,
	}

	clickCollapse = () => {
		this.props.toggleFieldGroup(this.props.id);
	}

	render() {
		
		const classNames = [];
		if (!this.props.isPlaceholder) {
			classNames.push('field-group');
		}

		// console.log(this.props.isCollapsed);
		//named group: collapsable
		if (this.props.label) {

			classNames.push('field-group-collapsable');
			if (this.props.isCollapsed) {
				classNames.push('field-group-collapsed');
			}

			return (<StyledFieldGroup className={classNames.join(' ')}>
				<div className="row">
					<div className="col-md-8">
						<h2 className="field-group-title">{this.props.label}</h2>
					</div>
					<div className="col-md-4 field-group-fcn">
						<ToggleCollapse isCollapsed={this.props.isCollapsed} toggle={this.clickCollapse} />
					</div>
				</div>
				<Collapsable isCollapsed={this.props.isCollapsed}>
					<GridContainer>{this.props.children}</GridContainer>
				</Collapsable>
			</StyledFieldGroup>);

		}
		
		return (
			<StyledFieldGroup className={classNames.join(' ')}>
				<GridContainer>{this.props.children}</GridContainer>
			</StyledFieldGroup>
		);
	}
}
