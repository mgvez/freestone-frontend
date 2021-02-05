import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PRIKEY_ALIAS } from '../../../freestone/schemaProps';

import Heading from './Heading';
import Row from '../../../containers/recordList/standard/Row';

import colors from '../../../styles/Colors';
import cssVariables from '../../../styles/Variables';
import { darken } from '../../../styles/Utils';

let levelStyles = '';
for (let i = 2; i < 11; i++) {
	levelStyles += `
	tr.level-${i} {
		td {
			background: ${darken(colors.white, i * 0.02)};
		}
	}
	`;
}

const ListTable = styled.table`
	width: 100%;
	margin-top: 20px;

	.group-heading {
		td {
			background: ${colors.backgroundLight};
		}
	}

	tr:not(.group-heading) {
		&:nth-of-type(2n + 1) {
			td {
				background-color: #fafafa;
			}
		}

		&:hover {
			td {
				background: ${colors.backgroundLight}!important;
			}
		}
	}

	tr.level-1 {
		td:not(:last-child) {
			font-weight: bold;
		}
	}

	${levelStyles};

	th, td {
		text-align: left;
		&:first-child {
			border-left: 1px solid ${colors.borderLight};
		}

		&:last-child {
			border-right: 1px solid ${colors.borderLight};
		}
	}

	th {
		padding: 20px 4px;
		background: ${colors.backgroundMainAccent};
		font-weight: ${cssVariables.fontWeightBold};
	}

	th, td {
		&:last-child {
			padding-right: 10px;
		}
		&:first-child {
			padding-left: 10px;
		}
	}

	td {
		padding: 4px;
		vertical-align: middle;
		background: ${colors.white};
		

		&.selfjoin-label{
			span {
				margin-right: 0.35em;
			}
		}
	}

	&.quickedit {
		td {
			vertical-align: top;

		}
	}

	tr.edited {
		td {
			background: ${colors.emphasisBackground};
		}
	}


`;

export default function StandardList(props) {
	const [hoveringId, setHoveringId] = useState(0);

	/**
		Les rows appellent le hover ici
	*/
	const handleHover = recordId => {
		setHoveringId(recordId);
	};

	const hideAllHovers = () => {
		handleHover(null);
	};

	let heading = null;
	if (props.isLarge) {
		heading = (<thead>
			<Heading
				fields={props.fields}
				tableName={props.tableName}
				params={props.params}
				isSelfTree={props.table.isSelfTree}
				fetchList={props.fetchList}
				isQuickEdit={props.isQuickEdit}
			/>
		</thead>);
	}
	return (
		<ListTable onMouseLeave={hideAllHovers} className={props.isQuickEdit && 'quickedit'}>
			{heading}
			{
				props.groupedRecords.map((group, groupIdx) => {
					let groupHeading;
					if (group.label) {
						groupHeading = (
							<tr className="group-heading">
								<td colSpan="20">
									<strong>{group.label}</strong>
								</td>
							</tr>
						);
					}

					return (
						<tbody key={groupIdx}>
						{groupHeading}
						{
							group.records.map((record) => {
								const pk = record[PRIKEY_ALIAS];
								const isHovering = hoveringId === pk;

								return (<Row
									key={`${props.table.name}_${pk}`}
									fields={props.fields}
									values={record}
									isQuickEdit={props.isQuickEdit}
									table={props.table}
									isLarge={props.isLarge}
									isHovering={isHovering}
									handleHover={handleHover}
									swappedRecords={props.swappedRecords}
									hasCustomOrder={!!props.params.order}
								/>);
							})
						}
						</tbody>
					);
				})
			}
		</ListTable>
	);
}

StandardList.propTypes = {
	isLarge: PropTypes.bool,
	isQuickEdit: PropTypes.bool,
	hoveringId: PropTypes.string,
	tableName: PropTypes.string,

	params: PropTypes.shape({
		page: PropTypes.string,
		filter: PropTypes.string,
		search: PropTypes.string,
		order: PropTypes.string,
	}),


	table: PropTypes.object,
	fields: PropTypes.array,
	groupedRecords: PropTypes.array,
	swappedRecords: PropTypes.object,

	fetchList: PropTypes.func,
};
