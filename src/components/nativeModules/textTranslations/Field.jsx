import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GridContainerStyle, GridItem } from '../../../styles/Grid';
import colors from '../../../styles/Colors';
import cssVars from '../../../styles/Variables';

const Container = styled.div`
	${GridContainerStyle}

	
	
	.inputs-container {
		display: flex;
		align-items: center;
	}

	.input-wrapper {
		width: 100%;

		input, textarea {
			position: relative;
			left: 50px;
			width: calc(100% - 50px);
			height: 40px;
			margin-bottom: 0;
			/* padding-left: 60px; */
		}
	}

	&.emphasis {
		input, textarea {
			background-color: #FCF3CF;
			border: 1px #F8C471 solid;
		}
	}

	label {
		position: absolute;
			top: 0;
		/* transform: translate(0, -50%); */
		width: 50px;
		height: 40px;
		line-height: 40px;
		
		text-align: center;
		margin-right: 15px;
		text-transform: uppercase;
		color: ${colors.accentPrimary};
		font-weight: ${cssVars.fontWeightBold};
	}
`;
export default class Field extends Component {
	static propTypes = {
		children: PropTypes.any,
		label: PropTypes.string,
		description: PropTypes.string,
		val: PropTypes.any,
		lang: PropTypes.string,
		isEmphasis: PropTypes.bool,

		onChange: PropTypes.func,
	};

	render() {

		const languageAppend = this.props.lang ? <em className="lang-append">(<span>{this.props.lang}</span>)</em> : '';
		const desc = this.props.description ? <em className="field-description">{this.props.description}</em> : null;
		return (
			<Container className={`field ${this.props.isEmphasis && 'emphasis'}`}>
				<GridItem className="inputs-container" columns="12" align="center">
					<label>{this.props.label} {languageAppend}</label>
					<div className="input-wrapper">
						{this.props.children}
						{desc}
					</div>
				</GridItem>
			</Container>
		);

	}
}
