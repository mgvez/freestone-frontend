import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Gravatar from '../widgets/Gravatar';
import { Link } from 'react-router-dom';

import Table from '../menu/Table';
import NativeModule from '../menu/NativeModule';
import colors from '../../styles/Colors';
import { Button } from '../../styles/Button';

const Wrapper = styled.div`
	font-size: 0.8em;
	background: white;
	border-radius: 5px;
	padding: 20px;
`;
const Grid = styled.div`
	display: grid;
	grid-template-columns: 55px auto 150px;
	grid-gap: 5px;
`;
const UserIcon = styled.div`
	grid-column: 1;
	grid-row: span 2;
`;
const RoundIcon = styled.div`
	img {
		border-radius: 50%;
		width: 50px;
		height: 50px;
	}
`;
const UserInfo = styled.div`
	grid-column: 2 / 3;
`;
const DateInfo = styled.div`
	grid-column: 3 / 4;
	text-align: right;

`;
const RecordInfo = styled.div`
	grid-column: 2 / 3;

	img {
		max-width: 100px;
		max-height: 50px;
	}

`;

const Functions = styled.div`
	grid-column: 3 / 4;
	text-align: right;
`;
const Bottom = styled.div`
	grid-column: 1 / 4;
	border-bottom: 1px ${colors.borderLight} solid;
	margin: 10px 0;
`;

const LatestModifs = (props) => {
	const [hasFetched, setHasFetched] = useState(false);

	// console.log(props.values);

	useEffect(() => {
		if (!props.values || !hasFetched) {
			setHasFetched(true);
			props.fetchLatestModifs(true);
		}
	});


	if (!props.values || !props.values.length || !hasFetched) return null;

	let nextBtn = null;
	if (props.hasMoreRecords) {
		const nextMaxDate = props.values[props.values.length - 1].date;
		nextBtn = <Button onClick={() => props.fetchLatestModifs(false, nextMaxDate)}>Load more</Button>;
	}

	return (
		<Wrapper>
			<Grid>
				{
					props.values.map((item, index) => {
						const { 
							user,
							recordId,
							tableId,
							action = '',
							env,
							userEmail,
							tableName,
							date,
							recordLabel,
							tableLabel,
							editAction,
							imgSrc,
						} = item;

						let label;
						let hasEditBtn = true;
						let typeDisplay = 'record';

						switch (action.toUpperCase()) {
						case 'DELETE':
							label = ' has deleted a ';
							hasEditBtn = false;
							break;
						case 'INSERT':
							label = ' has added a ';
							break;
						case 'UPDATE':
						default:
							label = ' has updated a ';
						}

						let tableDisplay;
						switch (editAction) {
						case 'translations':
							tableDisplay = <NativeModule label={tableLabel} url="TextTranslations" />;
							typeDisplay = '';
							hasEditBtn = false;
							break;
						default:
							tableDisplay = <Table name={tableName} displayLabel={tableLabel} id={Number(tableId)} />;
						}

						let displayDetails = recordLabel;
						if (imgSrc) {
							displayDetails = <img src={imgSrc} />;
						}

						return (
							<React.Fragment key={`${recordId}_${date}`}>
								<UserIcon>
									<RoundIcon><Gravatar size={50} email={userEmail} /></RoundIcon>
								</UserIcon>
								<UserInfo>
									{index + 1}. <strong>{user}</strong> {label} <strong>{tableDisplay}</strong> {typeDisplay} on {env}
								</UserInfo>
								<DateInfo>
									{date}
								</DateInfo>
								<RecordInfo>
									{displayDetails || `record id ${recordId}`}
								</RecordInfo>

								<Functions>
									{hasEditBtn ? (
										<Link to={`/edit/${tableId}/${recordId}`}>
											<Button round info small bordered>
												Edit
											</Button>
										</Link>
									) : null}
								</Functions>
								<Bottom />
							</React.Fragment>
						);
					})
				}
			</Grid>
			{nextBtn}
		</Wrapper>
	);
};
LatestModifs.propTypes = {
	values: PropTypes.array,
	hasMoreRecords: PropTypes.bool,
	fetchLatestModifs: PropTypes.func,
};
export default LatestModifs;
