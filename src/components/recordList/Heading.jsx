import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { TYPE_IMG, TYPE_BANKIMG, TYPE_FILE } from '../../freestone/SchemaProps';

const nonOrderable = [TYPE_IMG, TYPE_BANKIMG, TYPE_FILE];


export default class Heading extends Component {
	static propTypes = {
		fields: PropTypes.array,
		isSelfTree: PropTypes.bool,
		fetchList: PropTypes.func,
		params: PropTypes.shape({
			tableName: PropTypes.string,
			page: PropTypes.string,
			search: PropTypes.string,
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
		let nextOrder = field.id;
		if (Math.abs(current) === Math.abs(field.id)) {
			nextOrder = current > 0 ? -current : 0;
			if (current) iconClass = current < 1 ? 'angle-down' : 'angle-up';
		}
		// console.log(field.type);

		const orderPart = nextOrder ? `?order=${nextOrder}` : '';
		const link = `/list/${this.props.params.tableName}/1/${this.props.params.search || ''}${orderPart}`;
		// console.log(link);
		// console.log(this.props.params);
		
		const icon = iconClass && <span className={`fa fa-${iconClass}`} />;
		return <NavLink to={link} activeClassName="active" className="">{field.label} {icon}</NavLink>;

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
				if (field.isGroup) return null;
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
