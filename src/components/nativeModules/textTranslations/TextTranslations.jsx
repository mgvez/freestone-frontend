import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SingleTranslation from '../../../containers/nativeModules/textTranslations/SingleTranslation';
import Field from './Field';
import FormHeader from '../../header/FormHeader'; 

export default class TextTranslations extends Component {
	static propTypes = {
		translations: PropTypes.object,
		translationKeys: PropTypes.array,
		languages: PropTypes.array,
		schema: PropTypes.object,
		isEdited: PropTypes.bool,

		saveTranslations: PropTypes.func,
		fetchTranslations: PropTypes.func,
		closeTranslations: PropTypes.func,
		goTo: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			closing: false,
		};
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(props) {
		this.requireData(props);
	}

	requireData(props) {
		// console.log(this.state);
		if (!this.state.closing) {
			props.languages.forEach(lang => {
				if (!props.translations || !props.translations[lang]) {
					this.props.fetchTranslations(lang);
				}
			});
		}
	}

	//ferme le form, va au home
	goHome = () => {
		this.props.goTo('/');
	}

	close = () => {
		this.setState({ closing: true });
		const onClosed = this.props.closeTranslations();
		onClosed.then(this.goHome);
	}

	save = () => {
		this.props.saveTranslations(this.props.translations);
	}

	saveAndBack = () => {
		this.setState({ closing: true });
		const onSaved = this.props.saveTranslations(this.props.translations);
		onSaved.then(this.goHome);
	}

	render() {
		// console.log(this.props);
		let keys;
		if (this.props.translationKeys) {
			keys = (<div className="container">
				{this.props.translationKeys.map((translationKey, tIdx) => {
					const label = this.props.schema[translationKey];
					const labelNode = label ? <div>{label} <span className="key">{translationKey}</span></div> : <div>{translationKey}</div>;
					return (<div key={tIdx} className="translation">
						<div className="row">
							<div className="col-md-12 translation-label">
								{labelNode}
							</div>
						</div>
						<div>
						{this.props.languages.map((language, idx) => {
							return (<div key={idx}>
								<Field label={language}>
									<SingleTranslation translationKey={translationKey} language={language} />
								</Field>
							</div>);
						})}
						</div>
					</div>);
				})}
			</div>);
		}

		let actionBtns;
		//le record a été édité depuis son load à la db. On met les actions pour le save
		if (this.props.isEdited) {
			actionBtns = [
				<a key="fcn_1" onClick={this.saveAndBack} className="button-round">Save and close</a>,
				<a key="fcn_2" onClick={this.save} className="button-round-lighter">Save</a>,
				<a key="fcn_3" onClick={this.close} className="button-round-danger">Discard changes</a>,
			];
		//record pas été édité: juste btn close
		} else {
			actionBtns = [
				<a key="fcn_3" onClick={this.close} className="button-round-danger">Close</a>,
			];
		}

		return (
			<section className="root-form">
				<FormHeader hasLanguageToggle={false} buttons={actionBtns}>
					<h1>Text translations</h1>
				</FormHeader>
				{keys}
			</section>
		);
	}
}
