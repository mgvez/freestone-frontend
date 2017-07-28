import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HeaderContainer } from '../../header/HeaderContainer';

import { fetchPlacedTranslations } from '../../../actions/translations';
import { coreTranslations } from '../../../selectors/translations';

@connect(
	coreTranslations,
	dispatch => bindActionCreators({ fetchPlacedTranslations }, dispatch)
)
export class HardcodedTextTranslations extends Component {
	static propTypes = {
		translationKeys: React.PropTypes.array,
		placedTranslations: React.PropTypes.array,
		languages: React.PropTypes.array,

		fetchPlacedTranslations: React.PropTypes.func,
	};

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(props) {
		this.requireData(props);
	}

	requireData(props) {

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

					<h1>Haredcoded Text translations</h1>
				</HeaderContainer>
				{placed}
			</section>
		);
	}
}
