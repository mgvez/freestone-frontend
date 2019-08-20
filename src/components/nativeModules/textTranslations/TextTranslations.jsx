import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SingleTranslation from '../../../containers/nativeModules/textTranslations/SingleTranslation';
import SaveTranslations from '../../../containers/process/SaveTranslations';
import Field from './Field';
import FormHeader from '../../header/FormHeader'; 
import styled from 'styled-components';
import { GridContainer, GridItem, MainZone, GridContainerStyle } from '../../../styles/Grid';
import colors from '../../../styles/Colors';
import { Heading2 } from '../../../styles/texts';
import { Button } from '../../../styles/Button';

const Container = styled.div`
	${GridContainerStyle};
	margin-bottom: 30px;

	&:nth-of-type(2n) {
		.translation {
			border-color: ${colors.accentPrimaryLight};
			background: ${colors.backgroundLight};
		}
	}

	.translation-label {
		margin-bottom: 15px;

		.key {
			margin-left: 10px;
			font-style: italic;
		}

		.help {
			margin-top: 10px;
			font-size: 0.8em;
		}

	}

	.translation {
		padding: 25px;

		border-left: 10px solid ${colors.accentPrimary};
		background: rgba(255, 255, 255, 0.4);

		border-radius: 5px;

		label {
			background-color: ${colors.backgroundMain};
		}
	}
`;
export default class TextTranslations extends Component {
	static propTypes = {
		// translationKeys: PropTypes.array,
		languages: PropTypes.array,
		schema: PropTypes.array,
		isEdited: PropTypes.bool,
		isLoaded: PropTypes.bool,

		fetchTranslations: PropTypes.func,
		closeTranslations: PropTypes.func,
		goTo: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			saving: false,
			stayOnSaved: false,
		};
	}

	componentDidMount() {
		this.requireData(this.props);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}

	requireData(props) {
		// console.log(props);
		if (!this.state.saving) {
			if (!props.isLoaded) {
				props.languages.forEach(lang => {
					this.props.fetchTranslations(lang);
				});
			}
		}
	}

	//ferme le form, va au home
	goHome = () => {
		this.props.goTo('/');
	}

	finishSave = () => {
		if (!this.state.stayOnSaved) {
			this.goHome();
		} else {
			this.setState({
				saving: false,
			});
		}
	}

	close = () => {
		this.setState({ saving: true });
		const onClosed = this.props.closeTranslations();
		onClosed.then(this.goHome);
	}

	save = (e) => {

		// if (e.altKey) {
		// 	this.props.saveTranslations(this.props.translations);
		// 	return;
		// }
		this.setState({
			saving: true,
			stayOnSaved: e.altKey,
		});
		// const onSaved = this.props.saveTranslations(this.props.translations);
		// onSaved.then(this.goHome);
	}

	render() {
		let groups;
		// console.log(this.props.schema);

		if (this.state.saving) {
			return <SaveTranslations key="save-trans" callback={this.finishSave} />;
		}

		if (this.props.schema) {
				
			groups = this.props.schema.map((group, gIdx) => {
				console.log(group);
				const keys = group.items.map((translationProp, tIdx) => {

					let labelNode = <strong>{translationProp.key}</strong>;
					if (translationProp.label) {
						const help = translationProp.description ? <div className="help">{translationProp.description}</div> : '';
						labelNode = (<div>
							<strong>{translationProp.label}</strong> <span className="key">{translationProp.key}</span>
							{help}
						</div>);
					}

					return (
						<Container key={tIdx}>
							<GridItem columns="10" offset="1" className="translation">
								<GridContainer>
									<GridItem columns="12" align="center" className="translation-label">
										{labelNode}
									</GridItem>

									<GridItem columns="12">
										<GridContainer>
											{this.props.languages.map((language, idx) => {
												return (<GridItem columns="6" key={idx}>
													<Field label={language}>
														<SingleTranslation translationKey={translationProp.key} language={language} />
													</Field>
												</GridItem>);
											})}
										</GridContainer>
									</GridItem>
									
								</GridContainer>
							</GridItem>
						</Container>
					);
				});

				return (<Container key={`group${gIdx}`}>
					<GridItem columns="12">
						<Heading2>{group.groupname}</Heading2>
						{keys}
					</GridItem>
				</Container>);

			});

			groups = (<div>{groups}</div>);

		}

		let actionBtns;
		//le record a été édité depuis son load à la db. On met les actions pour le save
		if (this.props.isEdited) {
			
			actionBtns = [
				<Button key="save" onClick={this.save} round title="Hold ALT key to leave form open after save">Save</Button>,
				<Button key="cancel" onClick={this.close} round danger>Discard changes</Button>,
			];
		//record pas été édité: juste btn close
		} else {
			actionBtns = [
				<Button key="close" onClick={this.close} round danger>Close</Button>,
			];
		}

		return (
			<section>
				<FormHeader hasLanguageToggle={false} buttons={actionBtns}>
					<h1>Text translations</h1>
				</FormHeader>
				<MainZone>
					{groups}
				</MainZone>
			</section>
		);
	}
}
