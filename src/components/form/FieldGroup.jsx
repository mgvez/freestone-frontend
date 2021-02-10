import React from 'react';
import PropTypes from 'prop-types';

import Collapsable from '../animation/Collapsable';
import ToggleCollapse from './buttons/ToggleCollapse';
import { StyledFieldGroup } from '../../styles/Input';
import { GridContainer, GridItem } from '../../styles/Grid';
import { Heading2 } from '../../styles/Texts';

export default function FieldGroup(props) {

	const clickCollapse = () => {
		props.toggleFieldGroup(props.id);
	};

	if (props.label && !props.hideHeading) {
		return (<StyledFieldGroup isCollapsable isRoot={props.isRoot}>
			<GridContainer>
				<GridItem columns="6">
					<Heading2>{props.label}</Heading2>
				</GridItem>
				<GridItem columns="6" justify="end">
					<ToggleCollapse isCollapsed={props.isCollapsed} toggle={clickCollapse} />
				</GridItem>
			</GridContainer>
			<Collapsable isCollapsed={props.isCollapsed}>
				<GridContainer>{props.children}</GridContainer>
			</Collapsable>
		</StyledFieldGroup>);
	}
	
	//unnamed group... list of fields flowing in the main form's grid
	return (
		<StyledFieldGroup isRoot={props.isRoot} >
			<GridContainer>{props.children}</GridContainer>
		</StyledFieldGroup>
	);

}

FieldGroup.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	hideHeading: PropTypes.bool,
	children: PropTypes.node,
	isCollapsed: PropTypes.bool,
	isRoot: PropTypes.bool,

	toggleFieldGroup: PropTypes.func,
};
