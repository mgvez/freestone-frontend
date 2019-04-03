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
			isSchema: false,
		};
	}

	componentDidMount() {
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

	save = (e) => {
		if (e.altKey) {
			this.props.saveTranslations(this.props.translations, this.props.schema);
			return;
		}
		this.setState({ closing: true });
		const onSaved = this.props.saveTranslations(this.props.translations, this.props.schema);
		onSaved.then(this.goHome);
	}

	onEditSchema = () => {
		this.setState({
			isSchema: !this.state.isSchema,
		});
	}

	render() {
		// console.log(this.props);
		let keys;
		if (this.props.translationKeys) {
			if (this.state.isSchema) {
				keys = this.props.translationKeys.map((translationKey, tIdx) => {
					const labelNode = <div>{translationKey}</div>;
					return (<div key={tIdx} className="translation">
						<div className="row">
							<div className="col-md-12 translation-label">
								{labelNode}
							</div>
						</div>
						<div>
							<Field label="label">
								<SingleTranslation translationKey={translationKey} />
							</Field>
						</div>
					</div>);
				});
			} else {
				
				keys = this.props.translationKeys.map((translationKey, tIdx) => {
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
				});
			}

			keys = (<div className="container">{keys}</div>);

		}

		let actionBtns;
		//le record a été édité depuis son load à la db. On met les actions pour le save
		if (this.props.isEdited) {
			actionBtns = [
				<a key="fcn_1" onClick={this.save} className="button-round" title="Hold ALT key to leave form open after save">Save</a>,
				<a key="fcn_3" onClick={this.close} className="button-round-danger">Discard changes</a>,
			];
		//record pas été édité: juste btn close
		} else {
			actionBtns = [
				<a key="fcn_3" onClick={this.close} className="button-round-danger">Close</a>,
			];
		}
		const title = 'Text translations' + (this.state.isSchema ? ' SCHEMA' : '');
		const rootClass = this.state.isSchema ? 'translation-schema-form' : '';
		return (
			<section className={`root-form ${rootClass}`}>
				<FormHeader hasLanguageToggle={false} buttons={actionBtns} editSchemaAction={this.onEditSchema}>
					<h1>{title}</h1>
				</FormHeader>
				{keys}
			</section>
		);
	}
}
