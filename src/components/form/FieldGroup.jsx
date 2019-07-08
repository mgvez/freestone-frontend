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
			// return (<StyledFieldGroup isCollapsable className={classNames.join(' ')}>
			// 	<GridContainer>
			// 		<GridItem columns="6" justify="end">
			// 			<ToggleCollapse isActive={!this.props.isActive} onClick={this.clickCollapse} key={this.props.label} label={this.props.label} />
			// 		</GridItem>
			// 	</GridContainer>
			// 	<Collapsable isCollapsed={!this.props.isActive}>
			// 		<GridContainer>{this.props.children}</GridContainer>
			// 	</Collapsable>
			// </StyledFieldGroup>);

			return (
				<div className="tabs">
					<div className="tab-list">
						{this.props.children.map((child) => {
							const { label } = child.props;

							return (
								<ToggleCollapse isActive={!child.props.isActive} onClick={this.clickCollapse} key={label} label={label} />
							);
						})}
					</div>
					<div className="tab-content">
						{this.props.children.map((child) => {
							console.log(this.props.children);
							if (child.props.label !== child.props.isActive) {
								return null;
							}
							return child.props.children;
						})}
					</div>
				</div>
			);
		}
		
		//unnamed group... list of fields flowing in the main form's grid
		return (
			<StyledFieldGroup>
				<GridContainer>{this.props.children}</GridContainer>
			</StyledFieldGroup>
		);
	}
}
