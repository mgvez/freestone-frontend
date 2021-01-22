import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AjaxModal from '../../widgets/AjaxModal';

import { Button } from '../../../styles/Button';
import colors from '../../../styles/Colors';
import { Preloader } from '../../widgets/Preloader';
import BoolInput from '../../form/inputTypes/BoolInput';
import TextInput from '../../form/inputTypes/TextInput';
import SaveContentBlockDependencies from '../../../containers/process/SaveContentBlockDependencies'; 
import { GridContainer, GridItem, MainZone } from '../../../styles/Grid';
import { TabsContainer } from '../../../styles/Form';

import FixedHeader from '../../header/FixedHeader'; 

import { Heading1, Heading2 } from '../../../styles/Texts';

const VIEW_BY_FIELD = 'VIEW_BY_FIELD';
const VIEW_BY_TPL = 'VIEW_BY_TPL';

const BATCH_SET_SHOW = 'BATCH_SET_SHOW';
const BATCH_SET_HIDE = 'BATCH_SET_HIDE';
const BATCH_SET_SUGGESTED = 'BATCH_SET_SUGGESTED';

const FormHeader = styled.div`
	margin: 0 0 30px 0;
`;

const MainContainer = styled.div`
	background: white;
	border: 1px ${colors.borderMedium} solid;
	padding: 20px;
	margin: 0 0 20px 0;
`;

const DependenciesTable = styled.div`
	min-width: 50%;

	display: grid;
	border-collapse: collapse;
	grid-template-columns: 
		minmax(150px, 2fr)
		minmax(50px, 1fr)
		minmax(150px, 4fr)
		minmax(150px, 4fr);

`;

const ItemRow = styled.div`
`;
const ItemCell = styled.div`
	padding: 2px;
	display: flex;
	align-items: center;
	border-bottom: 1px ${colors.borderMedium} solid;
`;
const ItemLabel = styled.div`
	font-weight: bold;
	position: relative;
	&:after {
		content: '';
		border-radius: 100%;
		position: absolute;
		left: -12px;
		top: 50%;
		width: 8px;
		height: 8px;
		background-color: red;
		transform: translate(0, -50%);
		opacity: 0.5;
	}
	&.suggested:after {
		background-color: green;
	}
	&:hover&:before {
		content: "Field is detected in template";
		border-radius: 2px;
		position: absolute;
		right: 0;
		transform: translate(110%, -50%);
		padding: 2px;
		border: 1px ${colors.borderMedium} solid;
		background: white;
		font-size: 0.5em;
		font-weight: normal;
	}
`;


export default function BlockFieldDeps(props) {
	
	const { dependenciesByField, dependencies, tableId, table, types } = props;

	const [currentView, setCurrentView] = useState(VIEW_BY_FIELD);
	const [currentType, setCurrentType] = useState();
	const [currentField, setCurrentField] = useState();
	const [isSaving, setIsSaving] = useState(false);
	const saved = useRef(false);

	const onSaveCleanup = useCallback(() => {
		props.closeDependencies();
		setIsSaving(false);
		saved.current = true;
		props.goTo('/');
	}, []);

	useEffect(() => {
		return () => {
			if (saved.current) return;
			const isLeaving = confirm('Changes have not been saved. Are you sure you want to leave and lose all your changes?');
			if (isLeaving) {
				props.closeDependencies();
				return;
			}
			props.goTo((props.route && props.route.pathname) || '/');
		};
	}, []);

	useEffect(() => {
		if (!isSaving) {
			if (!dependencies) {
				props.fetchAllData();
			}
			if (tableId && !table) {
				props.fetchTable(tableId);
			}
		}
	}, [isSaving, dependencies, tableId, table]);
	
	const getActionParams = (field, typeId, values) => {
		const allFieldIds = field.languageSiblingIds && field.languageSiblingIds.length ? field.languageSiblingIds : [field.id];
		return allFieldIds.map(fieldId => (
			{ fieldId, typeId, ...values }
		));
	};

	let content;
	if (types && table && dependencies) {

		const getRow = (key, label, field, typeId) => {
			const fieldId = field.id;
			// console.log(field);
			const onChangeIsDisplay = isDisplay => {
				props.setMultipleDependencies(getActionParams(field, typeId, { isDisplay }));

			};
			const onChangeTitle = e => {
				const titleOverride = e.currentTarget.value;
				props.setMultipleDependencies(getActionParams(field, typeId, { titleOverride }));

			};
			const onChangeDescription = e => {
				const descriptionAppend = e.currentTarget.value;
				props.setMultipleDependencies(getActionParams(field, typeId, { descriptionAppend }));
			};
			const currentDependency = dependenciesByField[fieldId] && dependenciesByField[fieldId][typeId];
			const isDisplay = currentDependency && currentDependency.isDisplay && currentDependency.isDisplay !== '0';
			const isSuggested = currentDependency && currentDependency.isSuggested;
			return (
				<React.Fragment key={key}>
					<ItemCell>
						<ItemLabel className={isSuggested && 'suggested'}>{label}</ItemLabel>
					</ItemCell>
					<ItemCell>
						<BoolInput key={`${key}-${fieldId}-${typeId}`} val={isDisplay} fieldId={fieldId} recordId={typeId} changeVal={onChangeIsDisplay} />
					</ItemCell>
					<ItemCell>
					{isDisplay && (
						<TextInput 
							key={`${key}-${fieldId}-title`}
							val={currentDependency && currentDependency.titleOverride}
							changeVal={onChangeTitle}
							placeholder="Title Override"
						/>
					)}
					</ItemCell>
					<ItemCell>
					{isDisplay && (
						<TextInput 
							key={`${key}-${fieldId}-decs`}
							val={currentDependency && currentDependency.descriptionAppend}
							changeVal={onChangeDescription}
							placeholder="Description Append"
						/>
					)}
					</ItemCell>
				</React.Fragment>
			);
		};

		let tabs;
		let switches;
		let header;

		const getActiveField = () => {
			if (!currentField) return table.dependingFields[0];
			return table.dependingFields.find(field => currentField === field.id);
		};
		
		const getActiveType = () => {
			if (!currentType) return types[0];
			return types.find(type => currentType === type.id);
		};
		
		const setAll = action => {
			let batch;
			const getVal = (field, type) => {
				switch (action) {
				case BATCH_SET_SHOW: return { isDisplay: true };
				case BATCH_SET_HIDE: return { isDisplay: false };
				case BATCH_SET_SUGGESTED: {
					const currentDependency = dependenciesByField[field.id] && dependenciesByField[field.id][type.id];
					return { isDisplay: currentDependency && currentDependency.isSuggested };
				}
				default:
				}
				return {};
			};
			if (currentView === VIEW_BY_TPL) {
				const activeType = getActiveType();
				batch = table.dependingFields.reduce((all, field) => {
					return [
						...all,
						...getActionParams(field, activeType.id, getVal(field, activeType)),	
					];
				}, []);
			} else {
				const activeField = getActiveField();
				batch = types.reduce((all, type) => {
					return [
						...all,
						...getActionParams(activeField, type.id, getVal(activeField, type)),	
					];
				}, []);
			}
			props.setMultipleDependencies(batch);
		};

		if (currentView === VIEW_BY_TPL) {
			const activeType = getActiveType();
			tabs = types.map(type => {
				const isActive = activeType.id === type.id;
				const activeClass = isActive && 'active';
				const onClick = () => setCurrentType(type.id);

				return (<button key={type.name} className={`tab ${activeClass}`} key={`typetoggle${type.id}`} onClick={onClick}>{type.name}</button>);
				
			});
			switches = table.dependingFields.map(field => getRow(field.name, field.displayLabel, field, activeType.id));

			header = (
				<Heading2>When type is <strong>{activeType.name}</strong>, display fields:</Heading2>
			);

		} else {
			const activeField = getActiveField();

			tabs = table.dependingFields.map(field => {
				
				const isActive = activeField.id === field.id;
				const activeClass = isActive && 'active';
				const onClick = () => setCurrentField(field.id);
				return (<div key={`f${field.id}`} className={`tab ${activeClass}`} onClick={onClick}>{field.displayLabel}</div>);
				
			});
			switches = types.map(type => getRow(type.name, type.name, activeField, type.id));
			header = (
				<Heading2>Display field <strong>{activeField.displayLabel}</strong> when type is:</Heading2>
			);
		}
		const groupsTogglers = (
			<GridContainer>
				<GridItem columns="12">
					<TabsContainer>
						{tabs}
					</TabsContainer>
				</GridItem>
			</GridContainer>
		);

		content = (
			<React.Fragment>				
				<GridContainer>
					<GridItem columns="12">
						<div>
							<Button 
								key={VIEW_BY_FIELD}
								faded={currentView === VIEW_BY_TPL} 
								onClick={() => setCurrentView(VIEW_BY_FIELD)}
							>
									set by field
							</Button>
							<Button 
								key={VIEW_BY_TPL}
								faded={currentView === VIEW_BY_FIELD}
								onClick={() => setCurrentView(VIEW_BY_TPL)}
							>
								set by template
							</Button>
						</div>
					</GridItem>
				</GridContainer>
				
				{groupsTogglers}

				<MainContainer>

					<FormHeader>
						{header}
					</FormHeader>
					<DependenciesTable>
						{switches}
					</DependenciesTable>
				</MainContainer>
				
				<Button key={BATCH_SET_SHOW} cta onClick={() => setAll(BATCH_SET_SHOW)}>SET ALL SHOWN</Button>
				<Button key={BATCH_SET_HIDE} cta onClick={() => setAll(BATCH_SET_HIDE)}>SET ALL HIDDEN</Button>
				<Button key={BATCH_SET_SUGGESTED} cta onClick={() => setAll(BATCH_SET_SUGGESTED)}>SET ALL SUGGESTED</Button>
			</React.Fragment>
		);

	} else if (!isSaving) {
		content = <Preloader />;
	}

	let savingComponent;
	if (isSaving) {
		savingComponent = (
			<AjaxModal
				onClosed={onSaveCleanup}
				children={onFinish => {
					return <SaveContentBlockDependencies key="save-deps" onFinish={onFinish} />;
				}}
			/>
		);
	}

	return (
		<React.Fragment>
			<FixedHeader
				key="dependencies"
				buttons={() => [<Button key="save" cta onClick={() => setIsSaving(true)}>SAVE</Button>]}
				infos={() => <Heading1>Field dependencies</Heading1>}
			/>

			<MainZone>
				{content}
				{savingComponent}
			</MainZone>
		</React.Fragment>
	);
}


BlockFieldDeps.propTypes = {
	tableId: PropTypes.number,
	types: PropTypes.array,
	controlFieldName: PropTypes.string,
	subforms: PropTypes.array,
	table: PropTypes.object,
	dependenciesByField: PropTypes.object,
	dependencies: PropTypes.array,
	fetchAllData: PropTypes.func,
	fetchTable: PropTypes.func,
	setSingleDependency: PropTypes.func,
	setMultipleDependencies: PropTypes.func,
	goTo: PropTypes.func,
	clearDependencies: PropTypes.func,
	closeDependencies: PropTypes.func,
};
