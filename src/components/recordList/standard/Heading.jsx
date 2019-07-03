import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListNavLink from '../../../containers/recordList/ListNavLink';
import { Icon } from '../../../styles/Icon';

import { TYPE_IMG, TYPE_BANKIMG, TYPE_FILE } from '../../../freestone/schemaProps';

const nonOrderable = [TYPE_IMG, TYPE_BANKIMG, TYPE_FILE];


export default class Heading extends Component {
	static propTypes = {
		fields: PropTypes.array,
		isSelfTree: PropTypes.bool,
		fetchList: PropTypes.func,
		tableName: PropTypes.string,
		params: PropTypes.shape({
			page: PropTypes.string,
			search: PropTypes.string,
			filter: PropTypes.string,
			order: PropTypes.string,
		}),
	};

	constructor(props) {
		super(props);
		this.state = { windowWidth: 0, isLarge: true, hoveringId: 0 };
	}

	getLink = (field) => {
		if (~nonOrderable.indexOf(field.type)) {
			return <span>{field.label}</span>;
		}
		let iconClass = null;

		const current = Number(this.props.params.order || 0);
		if (Math.abs(current) === Math.abs(field.id)) {
			if (current) iconClass = current < 1 ? 'angle-down' : 'angle-up';
		}
		const icon = iconClass && <Icon icon={iconClass} />;
		return <ListNavLink tableName={this.props.tableName} order={field.id} activeClassName="active" className="">{field.label} {icon}</ListNavLink>;

	}

	render() {

		//si self tree, cells par defaut
		if (this.props.isSelfTree) {
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
		if (this.props.fields.length) {
			cells = this.props.fields.map((field) => {
				if (field.isGroup || field.type === 'order') return null;
				const link = this.getLink(field);
				return <th key={`fld_${field.id}`}>{link}</th>;
			});
		} else {
			cells = <th />;
		}
		return (
			<tr>
				{cells}
				<th>Functions</th>
			</tr>
		);

	}
}
