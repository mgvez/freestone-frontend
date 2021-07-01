import React, { useRef, useEffect } from 'react';
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
		min-height: 40px;

		input, textarea {
			position: relative;
			left: 50px;
			width: calc(100% - 50px);

			min-height: 40px;

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
const Field = (props) => {
	const fieldRef = useRef();
	const languageAppend = props.lang ? <em className="lang-append">(<span>{props.lang}</span>)</em> : '';
	const desc = props.description ? <em className="field-description">{props.description}</em> : null;

	useEffect(() => {
		if (props.isEmphasis && fieldRef.current) {
			fieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
			// const elementOffset = fieldRef.current.getBoundingClientRect();
			// const targetPos = elementOffset.top - document.documentElement.scrollTop;
			// window.scrollTo(0, targetPos);
		}
	}, [props.isEmphasis]);

	return (
		<Container className={`field ${props.isEmphasis && 'emphasis'}`} ref={fieldRef}>
			<GridItem className="inputs-container" columns="12" align="center">
				<label>{props.label} {languageAppend}</label>
				<div className="input-wrapper">
					{props.children}
					{desc}
				</div>
			</GridItem>
		</Container>
	);
};

Field.propTypes = {
	children: PropTypes.any,
	label: PropTypes.string,
	description: PropTypes.string,
	val: PropTypes.any,
	lang: PropTypes.string,
	isEmphasis: PropTypes.bool,

	onChange: PropTypes.func,
};

export default Field;
