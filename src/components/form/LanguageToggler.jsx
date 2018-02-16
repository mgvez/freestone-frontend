import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LanguageToggler extends Component {
	static propTypes = {
		allLanguages: PropTypes.array,
		language: PropTypes.string,
		localLanguage: PropTypes.string,

		onChangeLang: PropTypes.func,
		setFieldViewLanguage: PropTypes.func,
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
