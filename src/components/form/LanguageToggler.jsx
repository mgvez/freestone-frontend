import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userViewLanguageSelector } from '../../selectors/userViewLanguage';

import { setFieldViewLanguage } from '../../actions/env';

@connect(
	userViewLanguageSelector,
	dispatch => bindActionCreators({ setFieldViewLanguage }, dispatch)
)
export class LanguageToggler extends Component {
	static propTypes = {
		allLanguages: React.PropTypes.array,
		language: React.PropTypes.string,
		localLanguage: React.PropTypes.string,

		onChangeLang: React.PropTypes.func,
		setFieldViewLanguage: React.PropTypes.func,
	};

	changeLanguage = (e) => {
		const lang = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.value;

		//si callback, la langue n'est pas sitewide, mais locale à un component, qui a un callback pour capturer le changement
		if (this.props.onChangeLang) {
			this.props.onChangeLang(lang);
		} else {
			this.props.setFieldViewLanguage(lang);
		}
	};

	render() {
		const currentLanguage = this.props.localLanguage || this.props.language;
		// console.log(`render input ${this.props.field.name}`);
		return (<div className="lang-toggler">
			{
				this.props.allLanguages.map((language, i) => {
					const isActive = language === currentLanguage;
					const activeClass = isActive ? 'active' : '';
					return <div key={i} data-value={language} onClick={this.changeLanguage} className={`language-tab ${activeClass}`}>{language}</div>;
				})
			}
		</div>);
	}
}
