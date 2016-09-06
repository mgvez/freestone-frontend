import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SingleTranslation } from 'components/connected/nativeModules/textTranslations/SingleTranslation';
import * as translationActions from 'actions/translations';

@connect(
	state => {
		return {
			...state.translations,
			languages: state.env.languages,
		};
	},
	dispatch => bindActionCreators(translationActions, dispatch)
)
export class TextTranslations extends Component {
	static propTypes = {
		translations: React.PropTypes.object,
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

		console.log(props);

	}

	render() {
		// console.log(this.props);
		if (this.props.placedTranslations) {
			return (<div>
				{this.props.placedTranslations.map(fileTranslations => {
					const key = `file_${fileTranslations.file}`;
					return (<div key={key}>
						<h2>{fileTranslations.file}</h2>
						{fileTranslations.keys.map(translationKey => {
							return (<div>
								{this.props.languages.map(language => {
									return <SingleTranslation translationKey={translationKey} language={language} />;
								})}
							</div>);
						})}
						{fileTranslations.hardcoded.map(hardcoded => {
							return <div>{hardcoded.str} ({hardcoded.lang})</div>;
						})}
					</div>);
				})}
			</div>);
		}
		return (
			<section>
				<h1>
					<ul>
						<li>
							Key ds template sans traduction
							<ul>
								<li>ajout dans chaque langue</li>
							</ul>
						</li>
						<li>
							Key ds template avec traduction
							<ul>
								<li>liste tous fichiers où utilisée</li>
								<li>changement dans chaque langue</li>
							</ul>
						</li>
						<li>
							traduction ds template sans key
							<ul>
								<li>LOCAL ajout key</li>
								<li>LOCAL proposition key</li>
							</ul>
						</li>
						<li>
							liste all keys
							<ul>
								<li>LOCAL rename</li>
								<li>delete (if not used)</li>
							</ul>
						</li>
					</ul>
				</h1>
			</section>
		);
	}
}
