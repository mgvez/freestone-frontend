import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import cssVariables from '../../styles/Variables';
import { Button } from '../../styles/Button';
import colors from '../../styles/Colors';
import { Icon } from '../../styles/Icon';


const StyledDiv = styled.div`

	line-height: 30px;
	padding: 0 10px;
	position: relative;
	cursor: pointer;
	font-size: 16px;

	&:not([data-num="0"]):after {
		position: absolute;
			top: -7px;
			right: -4px;
		content: attr(data-num);
		font-family: ${cssVariables.fontFamilyBase};
		font-weight: ${cssVariables.fontWeightExtrabold};
		color: ${colors.white};
		font-size: 11px;
		background: ${colors.accentPrimary};
		padding: 4px 5px;
		height: auto;
		line-height: 11px;
		border-radius: 4px;
	}
`;

export default class LoadedRecordsToggler extends Component {
	static propTypes = {
		nLoadedRecords: PropTypes.number,
		toggleLoadedRecords: PropTypes.func,
		loaded_records_visibility: PropTypes.bool,
		isClose: PropTypes.bool,
	};

	loadedRecordsToggler = () => {
		const isFirstTime = this.props.loaded_records_visibility === undefined;
		const visibility = isFirstTime ? true : !this.props.loaded_records_visibility;

		this.props.toggleLoadedRecords(visibility);
	};

	render() {

		if (this.props.isClose) {
			return <Button circle small onClick={this.loadedRecordsToggler}><Icon icon="times" /></Button>;
		}

		return (<StyledDiv onClick={this.loadedRecordsToggler} data-num={this.props.nLoadedRecords}>
			<Icon icon="pencil-alt" />
		</StyledDiv>);
	}
}
