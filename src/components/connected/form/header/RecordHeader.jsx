import React, { Component } from 'react';

import { Header } from 'components/static/form/Header';
import { Cancel } from 'components/connected/process/Cancel';
import { LanguageToggler } from 'components/connected/form/LanguageToggler';


/**
 * RecordHeader
 * 
 * Un header de formulaire qui peut prendre 2 formes, soient une
 * avec et l'autre sans informations à propos du record (titre, desc, etc)
 * Pour simplifier l'animation d'un header fixe, on se sert du light
 * pour ne pas avoir à recalculer la hauteur du header et l'ajouter au
 * padding-top du body.
 */
export class RecordHeader extends Component {
	static propTypes = {
		params: React.PropTypes.shape({
			tableName: React.PropTypes.string,
			recordId: React.PropTypes.string,
		}),

		isModal: React.PropTypes.bool,
		language: React.PropTypes.string,
		hasLanguageToggle: React.PropTypes.bool,
		table: React.PropTypes.object,
		lastmodifdate: React.PropTypes.string,
		
		finishCallback: React.PropTypes.func,
		fetchTable: React.PropTypes.func,

		functions: React.PropTypes.shape({		
			setLanguageState: React.PropTypes.func,
			save: React.PropTypes.func,
		}),

		isLight: React.PropTypes.bool,
	};

	static contextTypes = {
		setHeight: React.PropTypes.func,
	};

	componentDidMount() {
		const h = this._header.getBoundingClientRect().height;
		this.context.setHeight(this.props.isLight, h);
	}

	render() {
		const language = this.props.language;

		let languageToggler;
		if (this.props.hasLanguageToggle) {
			languageToggler = <LanguageToggler onChangeLang={this.props.isModal ? this.props.functions.setLanguageState : null} localLanguage={language} />;
		}

		let infos = (this.props.isLight) ? '' : (
			<div className="texts">
				<Header table={this.props.table} />
				<div className="last-modif-date">Last modification : {this.props.lastmodifdate}</div>
			</div>
		);

		return (
			<header ref={el => this._header = el}>
				{infos}

				<div className="btns">
					<a onClick={this.props.functions.save} className="button-round">Save</a>
					<Cancel tableName={this.props.table.name} recordId={this.props.params.recordId} callback={this.props.finishCallback} />
				</div>
				{languageToggler}
			</header>
		);
	}
}