import React, { Component } from 'react';
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
		border-radius: 0 0 0 10px;
		border-right: 0;
	}

	&:last-child {
		border-radius: 0 0 10px 0;
		border-left: 0;
	}

	&:hover, &.active {
		background: ${colors.accentPrimary};
		color: #fff;
	}
`;

export default class LanguageToggler extends Component {
	static propTypes = {
		allLanguages: PropTypes.array,
		language: PropTypes.string,
		localLanguage: PropTypes.string,

		onChangeLang: PropTypes.func,
		setLanguage: PropTypes.func,
	};

	changeLanguage = (e) => {
		const lang = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.value;

		//si callback, la langue n'est pas sitewide, mais locale à un component, qui a un callback pour capturer le changement
		if (this.props.onChangeLang) {
			this.props.onChangeLang(lang);
		} else {
			this.props.setLanguage(lang);
		}
	};

	render() {
		const currentLanguage = this.props.localLanguage || this.props.language;
		// console.log(`render input ${this.props.field.name}`);
		return (
			<StyledToggler>
			{
				this.props.allLanguages.map((language, i) => {
					const isActive = language === currentLanguage;
					const activeClass = isActive ? 'active' : '';
					return <StyledTab key={i} data-value={language} onClick={this.changeLanguage} className={`language-tab ${activeClass}`} title="use alt-l to toggle between languages">{language}</StyledTab>;
				})
			}
			</StyledToggler>
		);
	}
}
