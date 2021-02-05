import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';
import ReactDiffViewer from 'react-diff-viewer';

import colors from '../../styles/Colors';
import { Button } from '../../styles/Button';
import customStyle from '../../styles/Modal';
import { Heading2, Heading3 } from '../../styles/Texts';

const Wrapper = styled.div`
	font-size: 0.8em;
	background: white;
	padding: 20px;
`;

const ChangeGroup = styled.div`
	margin: 0 0 40px;
	border: 1px ${colors.borderMedium} solid;
	padding: 10px;
`;
const ChangeField = styled.div`
	margin: 0 0 12px;
`;
const ChangeTitle = styled.h3`
	font-weight: bold;
	font-size: 1.5em;
	margin: 0 0 10px 0;
	border-bottom: 1px ${colors.borderLight} solid;
	`;
const FieldTitle = styled.h3`
	font-weight: bold;
	margin: 0 0 10px 0;
`;

const InsertField = styled.div`
	display: grid;
	grid-template-columns: 150px auto;
`;
const InsertFieldName = styled.div`
	border-bottom: 1px ${colors.borderLight} solid;
	border-right: 1px ${colors.borderLight} solid;
	font-weight: bold;
	padding: 4px 2px;
`;
const InsertValue = styled.div`
	border-bottom: 1px ${colors.borderLight} solid;
	padding: 4px 2px;
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

	if (!hasFetched) return null;
	let content;
	if (!changelog || !changelog.length) {
		content = <Heading2>There is no log in the database for this record.</Heading2>;
	} else {
		content = (<div>
			{changelog.map(change => {
				const { data } = change;
				const keys = Object.keys(data);
				const diffs = keys.map(key => {
					const diff = data[key];
					let fieldDiff = null;
					if (!Array.isArray(diff)) {
						fieldDiff = (
							<InsertField>
								<InsertFieldName>{key}</InsertFieldName>
								<InsertValue>{diff}</InsertValue>
							</InsertField>
						);
					} else {
						diff[0] = String(diff[0]);
						diff[1] = String(diff[1]);
						fieldDiff = (
							<ChangeField>
								<FieldTitle>{key}</FieldTitle>
								<ReactDiffViewer
									oldValue={diff[0]}
									newValue={diff[1]}
									splitView
								/>
							</ChangeField>
						);
					}
					return (
						<React.Fragment key={key}>
							{fieldDiff}
						</React.Fragment>
					);
				});
				return (
					<ChangeGroup key={change.id}>
						<ChangeTitle>{change.action} on {change.date} by {change.user}</ChangeTitle>
						{diffs}
					</ChangeGroup>
				);
			})}
		</div>);
	}

	return (
		<Modal
			isOpen
			contentLabel="Changelog"
			closeTimeoutMS={300}
			style={customStyle}
			ariaHideApp={false}
		>
			<Wrapper>
				{content}
				<Button round bordered onClick={props.onClose}>Close</Button>
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
