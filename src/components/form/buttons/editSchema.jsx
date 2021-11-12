import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLinkButton } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';

const BUTTON_LABEL = 'Edit Schema';

export const LOCATIONS = {
	RECORD: 'record',
	SUBFORM: 'subform',
	RECORDS_LIST: 'list',
};

export default class EditSchema extends Component {
	static propTypes = {
		table: PropTypes.number,
		location: PropTypes.string,
		isGod: PropTypes.bool,
	};

	render() {
		const isVisible = this.props.table && this.props.isGod;
		if (!isVisible) return null;

		const editSchemaLink = this.props.table ? `/edit/zva_table/${this.props.table.id}` : '';

		switch (this.props.location) {
		case LOCATIONS.SUBFORM:
			return <NavLinkButton to={editSchemaLink} small="true" round="true" bordered="true"><Icon icon="edit" side="left" /> {BUTTON_LABEL}</NavLinkButton>;
		case LOCATIONS.RECORDS_LIST:
			return <NavLinkButton to={editSchemaLink} round="true" bordered="true"><Icon icon="edit" side="left" /> {BUTTON_LABEL}</NavLinkButton>;
		default:
			return <NavLinkButton to={editSchemaLink} flat="true"><Icon icon="edit" /> {BUTTON_LABEL}</NavLinkButton>;
		}
	}
}
