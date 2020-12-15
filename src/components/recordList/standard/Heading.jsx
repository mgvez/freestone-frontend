import React from 'react';
import PropTypes from 'prop-types';

import ListNavLink from '../../../containers/recordList/ListNavLink';
import { Icon } from '../../../styles/Icon';

import { TYPE_IMG, TYPE_BANKIMG, TYPE_FILE } from '../../../freestone/schemaProps';

const nonOrderable = [TYPE_IMG, TYPE_BANKIMG, TYPE_FILE];


export default function Heading(props) {


	const getLink = (field) => {
		const language = field.language ? `(${field.language})` : null;
		if (~nonOrderable.indexOf(field.type)) {
			return <span>{field.label} {language}</span>;
		}
		let iconClass = null;

		const current = Number(props.params.order || 0);
		if (Math.abs(current) === Math.abs(field.id)) {
			if (current) iconClass = current < 1 ? 'angle-down' : 'angle-up';
		}
		const icon = iconClass && <Icon icon={iconClass} side="right" />;
		return <ListNavLink tableName={props.tableName} order={field.id} activeClassName="active" className="">{field.label} {language} {icon}</ListNavLink>;

	};

	//si self tree, cells par defaut
	if (props.isSelfTree) {
		return (
			<tr>
				<th>Level</th>
				<th>Item</th>
				<th>Functions</th>
			</tr>
		);
	}
	//sinon, une cell pour chaque field de recherche. Si aucun, en ajoute un vide pour mettre le label du record dedans
	// console.log(this.props.fields);
	let cells;
	if (props.fields.length) {
		cells = props.fields.map((field) => {
			if (field.isGroup || field.type === 'order') return null;
			const link = getLink(field);
			return <th key={`fld_${field.id}`}>{link}</th>;
		});
	} else {
		cells = <th />;
	}
	return (
		<tr>
			{cells}
			{!props.isQuickEdit && <th>Functions</th>}
		</tr>
	);


}

Heading.propTypes = {
	fields: PropTypes.array,
	isSelfTree: PropTypes.bool,
	isQuickEdit: PropTypes.bool,
	fetchList: PropTypes.func,
	tableName: PropTypes.string,
	params: PropTypes.shape({
		page: PropTypes.string,
		search: PropTypes.string,
		filter: PropTypes.string,
		order: PropTypes.string,
	}),
};
