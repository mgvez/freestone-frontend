import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSlug } from 'actions/slugs';

import { formHeaderSelector } from 'selectors/formHeader';
const actionCreators = { fetchSlug };

import { LanguageToggler } from 'components/connected/form/LanguageToggler';
import { PreviewRecord } from 'components/connected/form/buttons/PreviewRecord';

/**
 * FormHeaderVariation
 * 
 * Un header de formulaire qui peut prendre 2 formes, soit une
 * avec et l'autre sans informations à propos du record (titre, desc, etc)
 * Pour simplifier l'animation d'un header fixe, on se sert du light
 * pour ne pas avoir à recalculer la hauteur du header et l'ajouter au
 * padding-top du body.
 */
@connect(
	formHeaderSelector,
	dispatch => bindActionCreators(actionCreators, dispatch)
)
export class FormHeaderVariation extends Component {
	static propTypes = {
		isGod: React.PropTypes.bool,
		slugs: React.PropTypes.array,
		params: React.PropTypes.shape({
			tableName: React.PropTypes.string,
			recordId: React.PropTypes.string,
		}),
		
		table: React.PropTypes.object,
		isModal: React.PropTypes.bool,
		language: React.PropTypes.string,
		hasLanguageToggle: React.PropTypes.bool,
		lastmodifdate: React.PropTypes.string,
		isLight: React.PropTypes.bool,
		buttons: React.PropTypes.any,
		children: React.PropTypes.any,

		setLanguageState: React.PropTypes.func,
		fetchSlug: React.PropTypes.func,
	};

	static contextTypes = {
		setHeight: React.PropTypes.func,
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
		if (props.slugs === null) {
			this.props.fetchSlug(props.table.id, props.params.recordId);
		}
	}

	render() {
		const language = this.props.language;

		const languageToggler = this.props.hasLanguageToggle ? <LanguageToggler onChangeLang={this.props.isModal ? this.props.setLanguageState : null} localLanguage={language} /> : null;
		
		const preview = <PreviewRecord tableId={this.props.table.id} recordId={this.props.params.recordId} />;
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
