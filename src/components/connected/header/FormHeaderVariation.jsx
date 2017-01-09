import React, { Component } from 'react';

import { LanguageToggler } from 'components/connected/form/LanguageToggler';

/**
 * FormHeaderVariation
 * 
 * Un header de formulaire qui peut prendre 2 formes, soit une
 * avec et l'autre sans informations à propos du record (titre, desc, etc)
 * Pour simplifier l'animation d'un header fixe, on se sert du light
 * pour ne pas avoir à recalculer la hauteur du header et l'ajouter au
 * padding-top du body.
 */
export class FormHeaderVariation extends Component {
	static propTypes = {
		params: React.PropTypes.shape({
			tableName: React.PropTypes.string,
			recordId: React.PropTypes.string,
		}),
		
		isModal: React.PropTypes.bool,
		language: React.PropTypes.string,
		hasLanguageToggle: React.PropTypes.bool,
		hasPreview: React.PropTypes.bool,
		lastmodifdate: React.PropTypes.string,

		setLanguageState: React.PropTypes.func,

		isLight: React.PropTypes.bool,

		buttons: React.PropTypes.any,
		children: React.PropTypes.any,
	};

	static contextTypes = {
		setHeight: React.PropTypes.func,
	};

	componentDidMount() {
		const h = this._header.getBoundingClientRect().height;
		// console.log('didMount', this.props.isLight, h);
		this.context.setHeight(this.props.isLight, h);
	}

	changePort(e) {
		e.target.port = 80;
	}

	render() {
		const language = this.props.language;

		const languageToggler = this.props.hasLanguageToggle ? <LanguageToggler onChangeLang={this.props.isModal ? this.props.setLanguageState : null} localLanguage={language} /> : null;
		
		const recordLink = `../main.php?i=${this.props.params.recordId}&t=${this.props.params.tableName}`;
		const preview = this.props.hasPreview ? (<a href={recordLink} onClick={this.changePort} target="_blank" className="button-preview"><i className="fa fa-eye"></i>Preview</a>) : null;
		const lastModif = this.props.lastmodifdate ? <div className="last-modif-date">Last modification : {this.props.lastmodifdate}</div> : null;

		const infos = (this.props.isLight) ? '' : (
			<div className="texts">
				{this.props.children}
				{lastModif}
			</div>
		);

		const isLightClass = (this.props.isLight) ? 'light' : '';

		return (
			<header className={isLightClass} ref={el => this._header = el}>
				{infos}
				<div className="btns">
					{this.props.buttons}
				</div>
				<div className="popout">
					{preview}
					{languageToggler}
				</div>
			</header>
		);
	}
}
