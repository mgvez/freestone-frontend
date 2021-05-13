import React from 'react';
import PropTypes from 'prop-types';

export default function SetVisibleTab(props) {

	const onClick = () => {
		props.showFieldGroup(props.clickKey, props.tableId);
	};

	const className = [
		'tab',
		props.isActive && 'active',
		props.isSeoMetadata && 'seo',
	].join(' ');

	return (
		<div
			className={className}
			onClick={onClick}
		>
			{props.label}
		</div>
	);

}

SetVisibleTab.propTypes = {
	isActive: PropTypes.bool,
	isSeoMetadata: PropTypes.bool,
	clickKey: PropTypes.string,
	tableId: PropTypes.number,
	label: PropTypes.string.isRequired,
	showFieldGroup: PropTypes.func.isRequired,
};
