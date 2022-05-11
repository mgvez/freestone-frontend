import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AjaxModal from '../../widgets/AjaxModal';

import { Button } from '../../../styles/Button';

import { Preloader } from '../../widgets/Preloader';
import BoolInput from '../../form/inputTypes/BoolInput';
import TextInput from '../../form/inputTypes/TextInput';
import SaveContentBlockDependencies from '../../../containers/process/SaveContentBlockDependencies';
import Field from '../../form/GenericFormField';
import { GridContainer, GridItem, MainZone, GridContainerStyle } from '../../../styles/Grid';

import FixedHeader from '../../header/FixedHeader'; 

import { Heading1 } from '../../../styles/Texts';
import { TabsList } from '../../../styles/Form';


const Container = styled.div`
	${GridContainerStyle};
`;


const getFieldFromId = (fields, searchId) => {
	const found = fields.find(field => searchId === field.id);
	if (found) return found;
	return fields.reduce((childFound, field) => {
		if (childFound) return childFound;
		if (!field.childrenFields) return null;
		return getFieldFromId(field.childrenFields, searchId);
	}, null);
};
export default function SettingsEditor(props) {
	const { settingsSchema, settingsValues, currentActiveGroup } = props;
	const [isSaving, setIsSaving] = useState(false);
	const saved = useRef(false);

	const onSaveCleanup = useCallback(() => {
		props.closeSettings();
		setIsSaving(false);
		saved.current = true;
		props.goTo('/');
	}, []);

	// console.log(props);
	useEffect(() => {
		return () => {
			if (saved.current) return;
			// eslint-disable-next-line no-alert
			const isLeaving = confirm('Changes have not been saved. Are you sure you want to leave and lose all your changes?');
			if (isLeaving) {
				props.closeSettings();
				return;
			}
			// props.goTo((props.route && props.route.pathname) || '/');
		};
	}, []);

	useEffect(() => {
		if (!isSaving) {
			if (!settingsSchema) {
				props.fetchSettingsEditorData();
			}
		}
	}, [isSaving, settingsSchema, settingsValues]);
	let content;
	let nav;
	if (settingsSchema) {

		nav = (
			<Container>
				<GridItem columns="12">
					<TabsList>
						{props.schemaGroups.map((groupName, gIdx) => {
							const isActive = currentActiveGroup === groupName || (!currentActiveGroup && gIdx === 0);
							const activeClass = isActive && 'active';
							const onClick = () => props.setActiveGroup(groupName);

							return (<button className={`tab ${activeClass}`} key={`grouptoggle${gIdx}`} onClick={onClick}>{groupName || '........'}</button>);
							
						})}
					</TabsList>
				</GridItem>
			</Container>
		);

		const activeGroupItems = settingsSchema[currentActiveGroup];
		const activeGroupValues = settingsValues[currentActiveGroup];
		if (activeGroupItems) {
			content = (
				<Container>
					<GridItem columns="12">
						<GridContainer>
							{activeGroupItems.map(item => {
								let value = (activeGroupValues && activeGroupValues[item.key]) || item.default || '';
								const onChange = (e) => {
									const v = (e && e.target) ? e.target.value : e;
									props.editSettings(currentActiveGroup, item.key, v);
								};
								let input;
								// console.log(item.type);
								const type = item.type.toLowerCase();
								
								// object or array
								if (typeof value === 'object') {
									value = JSON.stringify(value, null, '	');
								}

								switch (type) {
								case 'bool':
								case 'boolean':
									input = <BoolInput val={value} changeVal={onChange} />;
									break;
								default:
									input = <TextInput val={String(value)} changeVal={onChange} />;
								}

								return (
									<Field key={item.key} label={item.key} description={item.description}>
										{input}
									</Field>
								);
							})}
						</GridContainer>
					</GridItem>
				</Container>
			);

		}
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
				infos={() => (
					<React.Fragment>
						<Heading1>Freestone Settings</Heading1>
					</React.Fragment>
				)}
			/>

			<MainZone>
				{nav}
				{content}
				{savingComponent}
			</MainZone>
		</React.Fragment>
	);
}


SettingsEditor.propTypes = {
	currentActiveGroup: PropTypes.string,
	types: PropTypes.array,
	schemaGroups: PropTypes.array,
	settingsSchema: PropTypes.object,
	settingsValues: PropTypes.object,
	fetchSettingsEditorData: PropTypes.func,
	goTo: PropTypes.func,
	clearSettings: PropTypes.func,
	editSettings: PropTypes.func,
	closeSettings: PropTypes.func,
	setActiveGroup: PropTypes.func,
};
