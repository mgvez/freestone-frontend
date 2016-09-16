import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SingleTranslation } from 'components/connected/nativeModules/textTranslations/SingleTranslation';
import { Field } from 'components/connected/nativeModules/textTranslations/Field';
import { HeaderContainer } from 'components/static/header/HeaderContainer';

import * as translationActions from 'actions/translations';
import { coreTranslations } from 'selectors/translations';

@connect(
	coreTranslations,
	dispatch => bindActionCreators(translationActions, dispatch)
)
export class TextTranslations extends Component {
	static propTypes = {
		translations: React.PropTypes.object,
		translationKeys: React.PropTypes.array,
		placedTranslations: React.PropTypes.array,
		languages: React.PropTypes.array,

		fetchTranslations: React.PropTypes.func,
		fetchPlacedTranslations: React.PropTypes.func,
	};

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(props) {
		this.requireData(props);
	}

	requireData(props) {
		props.languages.forEach(lang => {
			if (!props.translations || !props.translations[lang]) {
				this.props.fetchTranslations(lang);
			}
		});

		if (!props.placedTranslations) {
			this.props.fetchPlacedTranslations();
		}
		// console.log(props);
	}

	addTranslation() {

	}

	chooseTranslation() {

	}

	renameKey() {

	}

	changeTranslation() {

	}

	render() {
		// console.log(this.props);
		let keys;
		if (this.props.translationKeys) {
			keys = (<div className="container">
				{this.props.translationKeys.map((translationKey, tIdx) => {
					return (<div key={tIdx}>
						<div className="row">
							<div className="col-md-12">
								<h3>{translationKey}</h3>
								<button>Delete</button>
							</div>
						</div>
						<div>
						{this.props.languages.map((language, idx) => {
							return (<div key={idx}>
								<Field label={language} onChange={this.changeTranslation} >
									<SingleTranslation translationKey={translationKey} language={language} />
								</Field>
							</div>);
						})}
						</div>
						<Field label="Rename">
							<input className="form-control" type="text" value={translationKey} onChange={this.renameKey} />
						</Field>
					</div>);
				})}
			</div>);
		}

		let placed;
		if (this.props.placedTranslations) {
			placed = (<div>
				{this.props.placedTranslations.map(fileTranslations => {
					const key = `file_${fileTranslations.file}`;
					console.log(fileTranslations);
					return (<div key={key}>
						<h2>{fileTranslations.file}</h2>
						{fileTranslations.strings.map((hardcoded, hIdx) => {
							return (<div key={hIdx}>
								{hardcoded.str} ({hardcoded.lang})
								set key <input data-replace={hardcoded.replace} onChange={this.addTranslation} placeholder="Type new key, e.g. home.title" />
								<div>
									{hardcoded.candidates.map((candidate, cIdx) => {
										return (<div key={cIdx}>
											{candidate.key} ::
											{candidate.str}
											<button>Choose</button>
										</div>);
									})}
								</div>
							</div>);
						})}
					</div>);
				})}
			</div>);
		}
		return (
			<section>
				<HeaderContainer>

					<h1>Text translations</h1>
					<p>Text translations</p>
					<ul>
						<li>
							liste all keys
							<ul>
								<li>value fr</li>
								<li>value en</li>
								<li>LOCAL rename</li>
								<li>delete (if not used)</li>
							</ul>
						</li>
						<li>
							traduction ds template sans key
							<ul>
								<li>LOCAL ajout key</li>
								<li>LOCAL proposition key</li>
							</ul>
						</li>
					</ul>
				</HeaderContainer>

				{keys}
				{placed}
			</section>
		);
	}
}
