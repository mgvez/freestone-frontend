import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AjaxModal from '../../widgets/AjaxModal';

import { Button } from '../../../styles/Button';
import { Preloader } from '../../widgets/Preloader';
import BoolInput from '../../form/inputTypes/BoolInput';
import TextInput from '../../form/inputTypes/TextInput';
import SaveContentBlockDependencies from '../../../containers/process/SaveContentBlockDependencies'; 
import { GridContainer, GridItem, MainZone } from '../../../styles/Grid';
import { TabsContainer } from '../../../styles/Form';

import FixedHeader from '../../header/FixedHeader'; 

import styled from 'styled-components';
import colors from '../../../styles/Colors';
import { Heading1, Heading2 } from '../../../styles/Texts';
import { Input } from '../../../styles/Input';
import { Icon } from '../../../styles/Icon';

const VIEW_BY_FIELD = 'VIEW_BY_FIELD';
const VIEW_BY_TPL = 'VIEW_BY_TPL';

const BATCH_SET_SHOW = 'BATCH_SET_SHOW';
const BATCH_SET_HIDE = 'BATCH_SET_HIDE';
const BATCH_SET_SUGGESTED = 'BATCH_SET_SUGGESTED';

export default function BlockFieldDeps(props) {
	
	const { dependenciesByField, dependencies, tableId, table, types } = props;

	const [currentView, setCurrentView] = useState(VIEW_BY_FIELD);
	const [currentType, setCurrentType] = useState();
	const [currentField, setCurrentField] = useState();
	const [isSaving, setIsSaving] = useState(false);

	const onSaveCleanup = useCallback(() => {
		props.closeDependencies();
		setIsSaving(false);
		props.goTo('/');
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
			const color = isSuggested ? 'green' : 'red';
			return (
				<GridContainer key={key}>
					<GridItem cols="3">
						<div style={{ color }}>{label}</div>
					</GridItem>
					<GridItem cols="2">
						<BoolInput key={`${key}-${fieldId}-${typeId}`} val={isDisplay} fieldId={fieldId} recordId={typeId} changeVal={onChangeIsDisplay} />
					</GridItem>
					{isDisplay && (
						<React.Fragment>
							<GridItem cols="2">
								<TextInput key={`${key}-${fieldId}-title`} val={currentDependency && currentDependency.titleOverride} changeVal={onChangeTitle} />
							</GridItem>
							<GridItem cols="2">
								<TextInput key={`${key}-${fieldId}-decs`} val={currentDependency && currentDependency.descriptionAppend} changeVal={onChangeDescription} />
							</GridItem>
						</React.Fragment>
					)}
				</GridContainer>
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

				return (<button className={`tab ${activeClass}`} key={`typetoggle${type.id}`} onClick={onClick}>{type.name}</button>);
				
			});
			switches = table.dependingFields.map(field => getRow(field.name, field.langAgnosticName, field, activeType.id));

			header = (
				<div>
					<Heading2>When type is <strong>{activeType.name}</strong>, display fields:</Heading2>
				</div>
			);

		} else {
			const activeField = getActiveField();

			tabs = table.dependingFields.map(field => {
				
				const isActive = activeField.id === field.id;
				const activeClass = isActive && 'active';
				const onClick = () => setCurrentField(field.id);

				return (<button className={`tab ${activeClass}`} key={field.id} onClick={onClick}>{field.langAgnosticName}</button>);
				
			});
			switches = types.map(type => getRow(type.name, type.name, activeField, type.id));
			header = (
				<div>
					<Heading2>Display field <strong>{activeField.langAgnosticName}</strong> when type is:</Heading2>
				</div>
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
							<Button cta={currentView === VIEW_BY_TPL} info={currentView === VIEW_BY_FIELD} onClick={() => setCurrentView(VIEW_BY_FIELD)}>set by field</Button>
							<Button cta={currentView === VIEW_BY_FIELD} info={currentView === VIEW_BY_TPL} onClick={() => setCurrentView(VIEW_BY_TPL)}>set by template</Button>
						</div>
					</GridItem>
				</GridContainer>
				{groupsTogglers}
				{header}
				{switches}
				<Button cta onClick={() => setAll(BATCH_SET_SHOW)}>SET ALL SHOWN</Button>
				<Button cta onClick={() => setAll(BATCH_SET_HIDE)}>SET ALL HIDDEN</Button>
				<Button cta onClick={() => setAll(BATCH_SET_SUGGESTED)}>SET ALL SUGGESTED</Button>
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
				buttons={() => [<Button cta onClick={() => setIsSaving(true)}>SAVE</Button>]}
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
