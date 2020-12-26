import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AjaxModal from '../../widgets/AjaxModal';

import { Button } from '../../../styles/Button';
import { Preloader } from '../../widgets/Preloader';
import BoolInput from '../../form/inputTypes/BoolInput';
import SaveContentBlockDependencies from '../../../containers/process/SaveContentBlockDependencies'; 
import { GridContainer, GridItem, MainZone } from '../../../styles/Grid';
import { TabsContainer } from '../../../styles/Form';

import FixedHeader from '../../header/FixedHeader'; 
import styled from 'styled-components';
import colors from '../../../styles/Colors';
import { Heading2 } from '../../../styles/Texts';
import { Input } from '../../../styles/Input';
import { Icon } from '../../../styles/Icon';
import FormHeaderCore from '../../../containers/header/FormHeaderCore'; 

const VIEW_BY_FIELD = 'VIEW_BY_FIELD';
const VIEW_BY_TPL = 'VIEW_BY_TPL';

export default function BlockFieldDeps(props) {
	
	const { dependenciesByField, dependencies, tableId, table, types } = props;

	const [currentView, setCurrentView] = useState(VIEW_BY_FIELD);
	const [currentType, setCurrentType] = useState();
	const [currentField, setCurrentField] = useState();
	const [isSaving, setIsSaving] = useState(false);

	const onSaveCleanup = useCallback(() => {
		// props.clearDependencies();
		setIsSaving(false);
		// props.goTo('/');
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
	

	let content;
	if (types && table && dependencies) {

		const getRow = (key, label, fieldId, typeId) => {
			const onChange = v => {
				props.setSingleDependency(fieldId, typeId, v);
			};
			const currentDependency = dependenciesByField[fieldId] && dependenciesByField[fieldId][typeId];
			const isChecked = currentDependency && currentDependency.isDisplay;
			const isSuggested = currentDependency && currentDependency.isSuggested;
			const background = isSuggested ? 'green' : 'red';
			return (
				<GridContainer key={key}>
					<GridItem cols="2">
						{label}
					</GridItem>
					<GridItem cols="2">
						<div style={{ background }}>Suggested? {isSuggested}</div>
					</GridItem>
					<GridItem cols="2">
						<BoolInput key={`${key}-${fieldId}-${typeId}`} val={isChecked && isChecked !== '0'} fieldId={fieldId} recordId={typeId} changeVal={onChange} />
					</GridItem>
				</GridContainer>
			);
		};

		let tabs;
		let switches;
		let header;
		if (currentView === VIEW_BY_TPL) {
			const activeTypeId = currentType || types[0].id;
			const activeType = types.find(type => activeTypeId === type.id);
			tabs = types.map(type => {
				const isActive = activeTypeId === type.id;
				const activeClass = isActive && 'active';
				const onClick = () => setCurrentType(type.id);

				return (<button className={`tab ${activeClass}`} key={`typetoggle${type.id}`} onClick={onClick}>{type.name}</button>);
				
			});
			switches = table.dependingFields.map(field => getRow(field.name, field.langAgnosticName, field.id, activeTypeId));

			header = (
				<div>
					<Heading2>When type is <strong>{activeType.name}</strong>, display fields:</Heading2>
				</div>
			);

		} else {
			const activeFieldId = currentField || table.dependingFields[0].id;
			const activeField = table.dependingFields.find(field => activeFieldId === field.id);

			tabs = table.dependingFields.map(field => {
				
				const isActive = activeFieldId === field.id;
				const activeClass = isActive && 'active';
				const onClick = () => setCurrentField(field.id);

				return (<button className={`tab ${activeClass}`} key={field.id} onClick={onClick}>{field.langAgnosticName}</button>);
				
			});
			switches = types.map(type => getRow(type.name, type.name, activeFieldId, type.id));
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
				<Button cta onClick={() => setIsSaving(true)}>SAVE</Button>
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
		<MainZone>
			{content}
			{savingComponent}
		</MainZone>
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
	goTo: PropTypes.func,
	clearDependencies: PropTypes.func,
};
