import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';

import colors from '../../styles/Colors';
import { Button } from '../../styles/Button';
import customStyle from '../../styles/Modal';
import { Heading2 } from '../../styles/Texts';

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


	useEffect(() => {
		if (!hasFetched) {
			setHasFetched(true);
			props.fetchChangelog(props.tableId, props.recordId).then(res => {
				setChangelog(res.changelog && res.changelog.sort((a, b) => {
					return a.date < b.date ? 1 : -1;
				}));
			});
		}
	});

	const revertSingle = (fieldId, value) => {
		props.setFieldVal(props.tableId, props.recordId, fieldId, value);
	};

	const revertAll = (data) => {
		// console.log(change);
		props.table.fields.forEach(field => {
			const fieldName = field.name;
			const changeSet = data[fieldName];
			if (changeSet) {
				//the changeset is [orginal value , edited value]. When appplying a change, we want to reset the field to the original value
				const orignalValue = changeSet[0];
				props.setFieldVal(props.tableId, props.recordId, field.id, orignalValue);
			}
		});
		props.onClose();
	};

	if (!hasFetched) return null;


	const getDiffs = (data) => {
		return props.table.fields.map(field => {
			const key = field.name;
			const diff = data[key];
			if (!diff) return null;
			const label = field.label + (field.language ? ` (${field.language})` : '');
			let fieldDiff = null;
			if (!Array.isArray(diff)) {
				fieldDiff = (
					<InsertField>
						<InsertFieldName>
							{label}
						</InsertFieldName>
						<InsertValue>{diff}</InsertValue>
					</InsertField>
				);
			} else {
				diff[0] = String(diff[0]);
				diff[1] = String(diff[1]);
				fieldDiff = (
					<ChangeField>
						<FieldTitle>
							{label}
							<Button tiny cta faded margin="0 4px" onClick={() => revertSingle(field.id, diff[0])}>Revert to original</Button>
						</FieldTitle>
						<ReactDiffViewer
							oldValue={diff[0]}
							newValue={diff[1]}
							leftTitle="Original"
							rightTitle="Edited"
							compareMethod={DiffMethod.WORDS}
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
	};


	const currentChangesGroup = props.currentChanges && (
		<ChangeGroup key="current">
			<ChangeTitle>
				Current edit
				<Button tiny margin="0 4px" onClick={() => revertAll(props.currentChanges)}>Revert all changes</Button>
			</ChangeTitle>
			{getDiffs(props.currentChanges)}
		</ChangeGroup>
	);

	let content;
	if ((!changelog || !changelog.length) && !currentChangesGroup) {
		content = <Heading2>There is no log in the database for this record.</Heading2>;
	} else {
		content = (<div>
			{currentChangesGroup}
			{changelog && changelog.map(change => {
				const { data } = change;
				return (
					<ChangeGroup key={change.id}>
						<ChangeTitle>
							{change.action} on {change.date} by {change.user}
							<Button tiny margin="0 4px" onClick={() => revertAll(change.data)}>Revert all to original</Button>
						</ChangeTitle>
						{getDiffs(data)}
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
	table: PropTypes.object,
	currentChanges: PropTypes.object,
	values: PropTypes.array,
	hasMoreRecords: PropTypes.bool,
	fetchChangelog: PropTypes.func,
	setFieldVal: PropTypes.func,
	onClose: PropTypes.func,
};
export default Changelog;
