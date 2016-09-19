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
		languages: React.PropTypes.array,
		isEdited: React.PropTypes.bool,

		saveTranslations: React.PropTypes.func,
		fetchTranslations: React.PropTypes.func,
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
	}

	save = () => {
		this.props.saveTranslations(this.props.translations);
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
		let saveBtn;
		if (this.props.isEdited) {
			saveBtn = <button className="button-round-action" onClick={this.save}>Save</button>;
		}
		return (
			<section>
				<HeaderContainer>
					<h1>Text translations</h1>
					{saveBtn}
				</HeaderContainer>
				{keys}
			</section>
		);
	}
}
