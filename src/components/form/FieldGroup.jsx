import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Collapsable from '../animation/Collapsable';
import ToggleCollapse from './buttons/ToggleCollapse';
import { StyledFieldGroup } from '../../styles/Input';
import { GridContainer, GridItem } from '../../styles/Grid';
import { Heading2 } from '../../styles/Texts';

export default class FieldGroup extends Component {
	static propTypes = {

		id: PropTypes.string,
		label: PropTypes.string,
		isPlaceholder: PropTypes.bool,
		children: PropTypes.node,
		isCollapsed: PropTypes.bool,
		isActive: PropTypes.bool,

		toggleFieldGroup: PropTypes.func,
		tableId: PropTypes.number,
	}

	clickCollapse = () => {
		this.props.toggleFieldGroup(this.props.id, this.props.tableId);
	}

	render() {
		
		const classNames = [];

		//named group: collapsable
		if (this.props.label) {
			return (<StyledFieldGroup isCollapsable className={classNames.join(' ')}>
				<GridContainer>
					<GridItem columns="6">
						<Heading2>{this.props.label}</Heading2>
					</GridItem>
					<GridItem columns="6" justify="end">
						<ToggleCollapse isCollapsed={!this.props.isActive} toggle={this.clickCollapse} />
					</GridItem>
				</GridContainer>
				<Collapsable isCollapsed={!this.props.isActive}>
					<GridContainer>{this.props.children}</GridContainer>
				</Collapsable>
			</StyledFieldGroup>);

		}
		
		//unnamed group... list of fields flowing in the main form's grid
		return (
			<StyledFieldGroup>
				<GridContainer>{this.props.children}</GridContainer>
			</StyledFieldGroup>
		);
	}
}
