import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LanguageToggler from '../../containers/form/LanguageToggler';
import PreviewRecord from '../../containers/form/buttons/PreviewRecord';

/**
 * FormHeaderVariation
 * 
 * Un header de formulaire qui peut prendre 2 formes, soit une
 * avec et l'autre sans informations à propos du record (titre, desc, etc)
 * Pour simplifier l'animation d'un header fixe, on se sert du light
 * pour ne pas avoir à recalculer la hauteur du header et l'ajouter au
 * padding-top du body.
 */
export default class FormHeaderVariation extends Component {
	static propTypes = {
		isGod: PropTypes.bool,
		slugs: PropTypes.array,
		params: PropTypes.shape({
			tableName: PropTypes.string,
			recordId: PropTypes.string,
		}),
		
		table: PropTypes.object,
		isModal: PropTypes.bool,
		language: PropTypes.string,
		hasLanguageToggle: PropTypes.bool,
		lastmodifdate: PropTypes.string,
		isLight: PropTypes.bool,
		buttons: PropTypes.any,
		children: PropTypes.any,

		setLanguageState: PropTypes.func,
		fetchSlug: PropTypes.func,
	};

	static contextTypes = {
		setHeight: PropTypes.func,
	};

	componentWillMount() {
		this.requireData(this.props);
	}

	componentDidMount() {
		const h = this._header.getBoundingClientRect().height;
		// console.log('didMount', this.props.isLight, h);
		this.context.setHeight(this.props.isLight, h);
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		if (props.slugs === undefined && props.table) {
			this.props.fetchSlug(props.table.id, props.params.recordId);
		}
	}

	render() {
		const language = this.props.language;

		const languageToggler = this.props.hasLanguageToggle ? <LanguageToggler onChangeLang={this.props.isModal ? this.props.setLanguageState : null} localLanguage={language} /> : null;
		
		const preview = this.props.table && this.props.table.hasTemplate ? <PreviewRecord tableId={this.props.table.id} recordId={this.props.params.recordId} /> : null;
		const lastModif = this.props.lastmodifdate ? <div className="last-modif-date">Last modification : {this.props.lastmodifdate}</div> : null;

		const editSchemaLink = this.props.table ? `#/edit/zva_table/${this.props.table.id}` : '';
		const editSchema = this.props.isGod ? (<a href={editSchemaLink} className="button-preview schema"><i className="fa fa-edit"></i>Edit Schema</a>) : null;

		const slugs = this.props.slugs && this.props.slugs.length ? (
			<div>
				<h4>Links</h4>
				{this.props.slugs.map(slugDef => {
					return <div key={`slug-${slugDef.lang}`} className="permalinks"><span>{slugDef.lang}</span> <a href={slugDef.slug} target="_blank">{slugDef.slug}</a></div>;
				})}
			</div>
		) : null;

		const infos = (this.props.isLight) ? '' : (
			<div className="texts">
				{this.props.children}
				{lastModif}
				{slugs}
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
					{editSchema}
					{preview}
					{languageToggler}
				</div>
			</header>
		);
	}
}
