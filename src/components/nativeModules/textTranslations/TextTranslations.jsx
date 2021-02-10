import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import SingleTranslation from '../../../containers/nativeModules/textTranslations/SingleTranslation';
import SaveTranslations from '../../../containers/process/SaveTranslations';
import Field from './Field';
import FixedHeader from '../../header/FixedHeader'; 
import styled from 'styled-components';
import { GridContainer, GridItem, MainZone, GridContainerStyle } from '../../../styles/Grid';
import colors from '../../../styles/Colors';
import { Heading1, Heading2 } from '../../../styles/Texts';
import { Button } from '../../../styles/Button';
import { Input } from '../../../styles/Input';
import { Icon } from '../../../styles/Icon';
import { TabsList } from '../../../styles/Form';
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

export default function TextTranslations(props) {
	
	const [isSaving, setIsSaving] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [stayOnSaved, setStayOnSaved] = useState(false);
	const searchInput = useRef();


	useEffect(() => {
		return () => {
	// 		if (saved.current) return;
	// 		const isLeaving = confirm('Changes have not been saved. Are you sure you want to leave and lose all your changes?');
	// 		if (isLeaving) {
	// 			props.closeDependencies();
	// 			return;
	// 		}
	// 		props.goTo((props.route && props.route.pathname) || '/');
		};
	}, []);

	useEffect(() => {
		if (!isSaving && !isClosing) {
			if (!props.isLoaded) {
				props.languages.forEach(lang => {
					props.fetchTranslations(lang);
				});
			}
		}
	}, [props.isLoaded, props.fetchTranslations, props.languages]);

	const debouncedUpdateSearchField = useCallback(
		debounce(val => {
			props.searchTranslations(val);
		}, 500),
		[]
	);

	const onUpdateSearchField = (e) => {
		debouncedUpdateSearchField(e.target.value);
	};

	useEffect(() => {
		/*
		Highjack standard keyboard shortcuts for search (cmd-f, cmd-g, cmd-shift-g)
		*/
		const keyboardListener = (e) => {
			if (e.metaKey || e.ctrlKey) {
				// console.log(e);
				switch (e.key) {
				case 'f': {
					e.preventDefault();
					searchInput.current.focus();
					break;
				}
				case 'g':
				case 'G': {
					e.preventDefault();
					const direction = e.shiftKey ? -1 : 1;
					props.navigateSearchTranslation(direction);
					break;
				}
				default:
				}
			}
		};
		window.addEventListener('keydown', keyboardListener);
		return () => {
			window.removeEventListener('keydown', keyboardListener);
		};

	}, [props.navigateSearchTranslation]);


	//ferme le form, va au home
	const goHome = useCallback(() => {
		props.goTo('/');
	}, [props.goTo]);

	const finishSave = () => {
		if (!stayOnSaved) {
			goHome();
		} else {
			setIsSaving(false);
		}
	};

	const close = () => {
		setIsClosing(true);
		const onClosed = props.closeTranslations();
		onClosed.then(goHome);
	};

	const save = (e) => {
		setIsSaving(true);
		setStayOnSaved(e.altKey);
	};

	const setActiveGroup = (activeGroup) => {
		props.navigateTranslationsGroups(activeGroup);
	};


	let groups;

	if (isSaving) {
		return <SaveTranslations key="save-trans" callback={finishSave} />;
	}

	if (props.schema) {

		const groupsTogglers = (
			<Container>
				<GridItem columns="12">
					<TabsList>
						{props.schema.map((group, gIdx) => {
							const isActive = props.activeGroup === gIdx || (!props.activeGroup && gIdx === 0);
							const activeClass = isActive && 'active';
							const onClick = () => setActiveGroup(gIdx);

							return (<button className={`tab ${activeClass}`} key={`grouptoggle${gIdx}`} onClick={onClick}>{group.groupname || '........'}</button>);
							
						})}
					</TabsList>
				</GridItem>
			</Container>
		);


		groups = props.schema.map((group, gIdx) => {
			// console.log(group);

			const isActive = props.activeGroup === gIdx || (!props.activeGroup && gIdx === 0);
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
										{props.languages.map((language, idx) => {
											const isEmphasis = props.currentSearchActiveKey && props.currentSearchActiveKey.lang === language && props.currentSearchActiveKey.key === translationProp.key;
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
	if (props.isEdited) {
		
		actionBtns = [
			<Button key="save" onClick={save} round="true" title="Hold ALT key to leave form open after save">Save</Button>,
			<Button key="cancel" onClick={close} round="true" danger="true"><Icon icon="times" /> Discard changes</Button>,
		];
	//record pas été édité: juste btn close
	} else {
		actionBtns = [
			<Button key="close" onClick={close} round="true" danger="true">Close</Button>,
		];
	}

	let navigateSearchRes = null;
	if (props.searchResult) {
		const oneIndexed = props.searchIndex + 1;
		const displayCurrentResult = oneIndexed ? `${oneIndexed} / ` : null; 
		navigateSearchRes = (
			<div className="search-navig">
				<div title="Click or use shortcut cmd+shift+g" onClick={() => props.navigateSearchTranslation(-1)}><Icon icon="angle-double-left cta" /></div>
				<div className="n-res">{displayCurrentResult}{props.searchResult.length} found</div>
				<div title="Click or use shortcut cmd+g" onClick={() => props.navigateSearchTranslation(1)} ><Icon icon="angle-double-right cta" /></div>
			</div>
		);
	}
	const searchZone = (
		<SearchForm>
			{navigateSearchRes}
			<div className="input-wrapper">
				<Input search rounded type="search" placeholder="search" onChange={onUpdateSearchField} ref={searchInput} />
				<Button icon="true" inputCta="true" title="cmd+f" ><Icon icon="search" side="center" /></Button>
			</div>
		</SearchForm>
	);

	return (
		<section>
			<FixedHeader
				key="translations"
				buttons={() => actionBtns}
				infos={() => <Heading1>Text translations</Heading1>}
			/>
			
			<MainZone>
				{searchZone}
				{groups}
			</MainZone>
		</section>
	);
}

TextTranslations.propTypes = {
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
