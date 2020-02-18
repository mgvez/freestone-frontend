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
		hideHeading: PropTypes.bool,
		children: PropTypes.node,
		isCollapsed: PropTypes.bool,
		isRoot: PropTypes.bool,

		toggleFieldGroup: PropTypes.func,
	}

	clickCollapse = () => {
		this.props.toggleFieldGroup(this.props.id);
	}

	render() {
		
		const classNames = [
		];
		// console.log(this.props.isRoot, classNames);
		//named group: collapsable
		if (this.props.label && !this.props.hideHeading) {
			return (<StyledFieldGroup isCollapsable isRoot={this.props.isRoot} className={classNames.join(' ')}>
				<GridContainer>
					<GridItem columns="6">
						<Heading2>{this.props.label}</Heading2>
					</GridItem>
					<GridItem columns="6" justify="end">
						<ToggleCollapse isCollapsed={this.props.isCollapsed} toggle={this.clickCollapse} />
					</GridItem>
				</GridContainer>
				<Collapsable isCollapsed={this.props.isCollapsed}>
					<GridContainer>{this.props.children}</GridContainer>
				</Collapsable>
			</StyledFieldGroup>);

		}
		
		//unnamed group... list of fields flowing in the main form's grid
		return (
			<StyledFieldGroup isRoot={this.props.isRoot} >
				<GridContainer>{this.props.children}</GridContainer>
			</StyledFieldGroup>
		);
	}
}
