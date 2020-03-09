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
import { Input } from '../../../styles/Input';
import { Icon } from '../../../styles/Icon';
import { TabsContainer } from '../../../styles/Form';
import debounce from '../../../utils/Debounce.js';

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


const SearchForm = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	position: relative;
	margin-bottom: 12px;

	.search-navig {
		margin-right: 20px;
		display: flex;
		justify-content: center;
		.n-res {
			width: 80px;
			text-align:center;
		}
	}

	.input-wrapper {
		position: relative;
		
		input {
			width: 250px;
			margin-bottom: 0;
			margin-right: 0;
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
		searchResult: PropTypes.array,
		searchIndex: PropTypes.number,
		activeGroup: PropTypes.number,
		currentSearchActiveKey: PropTypes.object,

		fetchTranslations: PropTypes.func,
		closeTranslations: PropTypes.func,
		searchTranslations: PropTypes.func,
		navigateSearchTranslation: PropTypes.func,
		navigateTranslationsGroups: PropTypes.func,
		clearTranslations: PropTypes.func,
		goTo: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			saving: false,
			closing: false,
			stayOnSaved: false,
		};

		this.searchInput = React.createRef();

	}

	componentDidMount() {
		this.requireData(this.props);
		this.searchInput.current.addEventListener('keydown', this.onUpdateSearchField);
		window.addEventListener('keydown', this.keyboardListener);
		this.onUpdateSearchField();

	}

	componentDidUpdate() {
		this.requireData(this.props);
		
	}

	componentWillUnmount() {
		if (this.searchInput.current) this.searchInput.current.removeEventListener('keydown', this.onUpdateSearchField);
		window.removeEventListener('keydown', this.keyboardListener);
	}

	requireData(props) {
		// console.log(props);
		if (!this.state.saving && !this.state.closing) {
			if (!props.isLoaded) {
				props.languages.forEach(lang => {
					this.props.fetchTranslations(lang);
				});
			}
		}
	}

	/*
	Highjack standard keyboard shortcuts for search (cmd-f, cmd-g, cmd-shift-g)
	*/
	keyboardListener = (e) => {
		if (e.metaKey || e.ctrlKey) {
			// console.log(e);
			switch (e.key) {
			case 'f': {
				e.preventDefault();
				this.searchInput.current.focus();
				break;
			}
			case 'g': {
				e.preventDefault();
				const direction = e.shiftKey ? -1 : 1;
				this.props.navigateSearchTranslation(direction);
				break;
			}
			default:
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
		
		this.setState({ closing: true });
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

	setActiveGroup(activeGroup) {
		this.props.navigateTranslationsGroups(activeGroup);
	}
	
	search() {
		const searchVal = this.searchInput && this.searchInput.current && this.searchInput.current.value;
		this.props.searchTranslations(searchVal);
	}

	onUpdateSearchField = debounce(() => {
		this.search();
	}, 500);

	render() {
		let groups;
		// console.log(this.props.schema);

		if (this.state.saving) {
			return <SaveTranslations key="save-trans" callback={this.finishSave} />;
		}

		if (this.props.schema) {

			const groupsTogglers = (
				<Container>
					<GridItem columns="12">
						<TabsContainer>
							{this.props.schema.map((group, gIdx) => {
								const isActive = this.props.activeGroup === gIdx || (!this.props.activeGroup && gIdx === 0);
								const activeClass = isActive && 'active';
								const onClick = () => this.setActiveGroup(gIdx);

								return (<button className={`tab ${activeClass}`} key={`grouptoggle${gIdx}`} onClick={onClick}>{group.groupname || '........'}</button>);
								
							})}
						</TabsContainer>
					</GridItem>
				</Container>
			);


			groups = this.props.schema.map((group, gIdx) => {
				// console.log(group);

				const isActive = this.props.activeGroup === gIdx || (!this.props.activeGroup && gIdx === 0);
				if (!isActive) return null;

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
												const isEmphasis = this.props.currentSearchActiveKey && this.props.currentSearchActiveKey.lang === language && this.props.currentSearchActiveKey.key === translationProp.key;
												return (<GridItem columns="6" key={idx}>
													<Field label={language} isEmphasis={isEmphasis}>
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

			groups = (
				<div>
					{groupsTogglers}
					{groups}
				</div>
			);

		}

		let actionBtns;
		//le record a été édité depuis son load à la db. On met les actions pour le save
		if (this.props.isEdited) {
			
			actionBtns = [
				<Button key="save" onClick={this.save} round="true" title="Hold ALT key to leave form open after save">Save</Button>,
				<Button key="cancel" onClick={this.close} round="true" danger="true"><Icon icon="times" /> Discard changes</Button>,
			];
		//record pas été édité: juste btn close
		} else {
			actionBtns = [
				<Button key="close" onClick={this.close} round="true" danger="true">Close</Button>,
			];
		}

		let navigateSearchRes = null;
		if (this.props.searchResult && this.props.searchResult.length) {
			navigateSearchRes = (
				<div className="search-navig">
					<div title="Click or use shortcut cmd+shift+g" onClick={() => this.props.navigateSearchTranslation(-1)}><Icon icon="angle-double-left cta" /></div>
					<div className="n-res">{this.props.searchIndex + 1} / {this.props.searchResult.length}</div>
					<div title="Click or use shortcut cmd+g" onClick={() => this.props.navigateSearchTranslation(1)} ><Icon icon="angle-double-right cta" /></div>
				</div>
			);
		}
		const searchZone = (
			<SearchForm>
				{navigateSearchRes}
				<div className="input-wrapper">
					<Input search rounded type="search" placeholder="search" ref={this.searchInput} />
					<Button icon="true" inputCta="true" title="cmd+f" ><Icon icon="search" side="center" /></Button>
				</div>
			</SearchForm>
		);

		return (
			<section>
				<FormHeader hasLanguageToggle={false} buttons={actionBtns}>
					<h1>Text translations</h1>
				</FormHeader>
				<MainZone>
					{searchZone}
					{groups}
				</MainZone>
			</section>
		);
	}
}
