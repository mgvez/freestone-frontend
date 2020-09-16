import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';

import colors from '../../styles/Colors';
import { Button } from '../../styles/Button';
import customStyle from '../../styles/Modal';

const Wrapper = styled.div`
	font-size: 0.8em;
	background: white;
	border-radius: 5px;
	padding: 20px;
`;


const Changelog = (props) => {
	const [hasFetched, setHasFetched] = useState(false);
	const [changelog, setChangelog] = useState(null);

	// console.log(props.values);

	useEffect(() => {
		if (!hasFetched) {
			setHasFetched(true);
			props.fetchChangelog(props.tableId, props.recordId).then(res => {
				if (res.changelog) {
					setChangelog(res.changelog);
				}
			});
		}
	});

	if (!hasFetched || !changelog || !changelog.length) return null;

	return (
		<Modal
			isOpen
			contentLabel="Changelog"
			closeTimeoutMS={300}
			style={customStyle}
			ariaHideApp={false}
		>
			<Wrapper>
				Changelog {props.tableId}.{props.recordId}
				<div>
					{changelog.map(change => {
						return <div key={change.id}>{change.action} on {change.date} by {change.user}</div>;
					})}
				</div>
				<Button small round bordered onClick={props.onClose}>Close</Button>
			</Wrapper>
		</Modal>
	);
};
Changelog.propTypes = {
	recordId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	tableId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	values: PropTypes.array,
	hasMoreRecords: PropTypes.bool,
	fetchChangelog: PropTypes.func,
	onClose: PropTypes.func,
};
export default Changelog;
