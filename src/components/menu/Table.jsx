import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Table = (props) => {

	let content = props.children;
	if (!content) {
		content = (
			<React.Fragment>
				{props.displayLabel}
				<span className="nrecords">
					<span className="n">{props.nrecords}</span>
				</span>
			</React.Fragment>
		);
	}

	return (
		<NavLink to={`/list/${props.name}`} onClick={props.clearList} activeClassName="active" className={props.className}>
			{content}
		</NavLink>
	);

};
Table.propTypes = {
	name: PropTypes.string,
	displayLabel: PropTypes.string,
	nrecords: PropTypes.any,
	id: PropTypes.number,
	className: PropTypes.string,
	clearList: PropTypes.func,
	children: PropTypes.node,
};
export default Table;
