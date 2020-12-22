import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../styles/Button';
import { Preloader } from '../../widgets/Preloader';
import BoolInput from '../../form/inputTypes/BoolInput';

import FixedHeader from '../../header/FixedHeader'; 
import styled from 'styled-components';
import { GridContainer, GridItem, MainZone, GridContainerStyle } from '../../../styles/Grid';
import colors from '../../../styles/Colors';
import { Heading2 } from '../../../styles/Texts';
import { Input } from '../../../styles/Input';
import { Icon } from '../../../styles/Icon';
import { TabsContainer } from '../../../styles/Form';
import debounce from '../../../utils/Debounce.js';
import FormHeaderCore from '../../../containers/header/FormHeaderCore'; 

const VIEW_BY_FIELD = 'VIEW_BY_FIELD';
const VIEW_BY_TPL = 'VIEW_BY_TPL';


export default function BlockFieldDeps(props) {
	
	const { dependenciesByField, dependencies, tableId, table, types } = props;
	console.log(dependenciesByField);

	const [currentView, setCurrentView] = useState(VIEW_BY_FIELD);
	const [currentType, setCurrentType] = useState();
	const [currentField, setCurrentField] = useState();

	if (!dependencies) {
		props.fetchAllData();
	} 
	if (tableId && !table) {
		props.fetchTable(tableId);
	}

	if (!types || !table) return <MainZone><Preloader /></MainZone>;

	let tabs;
	let switches;
	if (currentView === VIEW_BY_TPL) {
		tabs = types.map((type, tIdx) => {
			const isActive = currentType === type.id || (!currentType && tIdx === 0);
			const activeClass = isActive && 'active';
			const onClick = () => setCurrentType(type.id);

			return (<button className={`tab ${activeClass}`} key={`typetoggle${type.id}`} onClick={onClick}>{type.name}</button>);
			
		});
	} else {
		const activeFieldId = currentField || table.dependingFields[0].id;
		tabs = table.dependingFields.map(field => {
			
			const isActive = activeFieldId === field.id;
			const activeClass = isActive && 'active';
			const onClick = () => setCurrentField(field.id);

			return (<button className={`tab ${activeClass}`} key={`fieldtoggle${field.id}`} onClick={onClick}>{field.label}</button>);
			
		});

		const currentFieldDependencies = dependenciesByField[activeFieldId];
		// console.log(currentFieldDependencies);
		switches = types.map(type => {
			console.log(type);
			const onChange = e => {
				console.log(activeFieldId, type.id, e.currentTarget.value);
				props.setSingleDependency(activeFieldId, type.id, e.currentTarget.value);
			};
			const isChecked = currentFieldDependencies && currentFieldDependencies[type.id] && currentFieldDependencies[type.id].idDisplay;
			return (
				<div key={type.name}>
					{type.name}
					<BoolInput val={isChecked ? '1' : '0'} fieldId={activeFieldId} recordId={type.id} changeVal={onChange} />
				</div>
			);
		});

	}

	const groupsTogglers = (
		<GridContainer>
			<GridItem columns="12">
				<TabsContainer>
					{tabs}
					{switches}
				</TabsContainer>
			</GridItem>
		</GridContainer>
	);

	return (
		<MainZone>
			<GridContainer>
				<GridItem columns="12">

					<div>
						<Button cta faded={currentView === VIEW_BY_FIELD} onClick={() => setCurrentView(VIEW_BY_FIELD)}>set by field</Button>
						<Button cta faded={currentView === VIEW_BY_TPL} onClick={() => setCurrentView(VIEW_BY_TPL)}>set by template</Button>
					</div>
					{groupsTogglers}
				</GridItem>
			</GridContainer>
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
};
