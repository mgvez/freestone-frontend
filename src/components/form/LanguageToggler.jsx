import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../styles/Colors';
import cssVars from '../../styles/Variables';


const StyledToggler = styled.div`
	font-weight: ${cssVars.fontWeightSemibold};
	text-transform: uppercase;
	margin-left: 10px;
`;

const StyledTab = styled.div`
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;

	color: ${colors.accentPrimary};
	background: ${colors.backgroundMain};

	height: 30px;
	line-height: 30px;

	padding: 0 20px;
	border: 1px solid ${colors.accentPrimary};

	transition: background 0.3s, color 0.3s;

	&:first-child {
		border-right: 0;
	}

	&:last-child {
		border-left: 0;
	}

	&:hover, &.active {
		background: ${colors.accentPrimary};
		color: #fff;
	}
`;

const LanguageToggler = (props) => {
	const changeLanguage = (e) => {
		const lang = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.value;

		//si callback, la langue n'est pas sitewide, mais locale à un component, qui a un callback pour capturer le changement
		if (props.onChangeLang) {
			props.onChangeLang(lang);
		} else {
			props.setLanguage(lang);
		}
	};

	const currentLanguage = props.localLanguage || props.language;
	// console.log(`render input ${props.field.name}`);
	return (
		<StyledToggler>
		{
			props.allLanguages.map((language, i) => {
				const isActive = language === currentLanguage;
				const activeClass = isActive ? 'active' : '';
				return <StyledTab key={i} data-value={language} onClick={changeLanguage} className={`language-tab ${activeClass}`} title="use alt-l to toggle between languages">{language}</StyledTab>;
			})
		}
		</StyledToggler>
	);
};

LanguageToggler.propTypes = {
	allLanguages: PropTypes.array,
	language: PropTypes.string,
	localLanguage: PropTypes.string,

	onChangeLang: PropTypes.func,
	setLanguage: PropTypes.func,
};

export default LanguageToggler;
