import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userViewLanguageSelector } from 'selectors/userViewLanguage';

import { setFieldViewLanguage } from 'actions/env';

@connect(
	userViewLanguageSelector,
	dispatch => bindActionCreators({ setFieldViewLanguage }, dispatch)
)
export class LanguageToggler extends Component {
	static propTypes = {
		allLanguages: React.PropTypes.array,
		language: React.PropTypes.string,
		
		setFieldViewLanguage: React.PropTypes.func,
	};

	changeLanguage = (e) => {
		const lang = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.value;
		this.props.setFieldViewLanguage(lang);
	};

	render() {
		// console.log(`render input ${this.props.field.name}`);
		return (<div>
			{
				this.props.allLanguages.map((language, i) => {
					const isActive = language === this.props.language;
					const activeClass = isActive ? 'language-tab-active' : '';
					return <div key={i} data-value={language} onClick={this.changeLanguage} className={`language-tab ${activeClass}`}>{language}</div>;
				})
			}
		</div>);
	}
}
