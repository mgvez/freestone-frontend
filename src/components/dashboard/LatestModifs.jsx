import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Gravatar from '../widgets/Gravatar';
import { Link } from 'react-router-dom';

import Table from '../menu/Table';
import Module from '../menu/Module';
import Page from '../menu/Page';
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
	grid-template-columns: 60px auto 150px;
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
	useEffect(() => {
		if (!props.latestModifs || !hasFetched) {
			setHasFetched(true);
			props.fetchLatestModifs();
		}
	});

	if (!props.latestModifs || !props.latestModifs.length) return null;
	return (
		<Wrapper>
			<Grid>
				{
					props.latestModifs.map((item) => {
						const { user, recordId, tableId, userId, ts, userEmail, tableName, date, recordLabel, tableLabel } = item;
						return (
							<React.Fragment key={`${recordId}_${date}`}>
								<UserIcon>
									<RoundIcon><Gravatar size={50} email={userEmail} /></RoundIcon>
								</UserIcon>
								<UserInfo>
									<strong>{user}</strong> has modified a <strong><Table name={tableName} displayLabel={tableLabel} id={Number(tableId)} /></strong> record
								</UserInfo>
								<DateInfo>
									{date}
								</DateInfo>
								<RecordInfo>
									{recordLabel}
								</RecordInfo>

								<Functions>
									<Link to={`/edit/${tableId}/${recordId}`}>
										<Button round info small bordered>
											Edit
										</Button>
									</Link>
								</Functions>
								<Bottom />
							</React.Fragment>
						);
					})
				}
			</Grid>
		</Wrapper>
	);
};
LatestModifs.propTypes = {
	latestModifs: PropTypes.array,
	fetchLatestModifs: PropTypes.func,
};
export default LatestModifs;
