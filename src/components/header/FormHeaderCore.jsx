import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cssVars from '../../styles/Variables';
import { Header, HeaderTexts, HeaderFcn, headerMarginBottom } from '../../styles/Header';

import LanguageToggler from '../../containers/form/LanguageToggler';
import ProdEnvWarning from '../widgets/ProdEnvWarning';
import PreviewRecord from '../../containers/process/PreviewRecord';
import { NavLinkButton, Button } from '../../styles/Button';
import { Icon } from '../../styles/Icon';


export default function FormHeaderCore(props) {
	useEffect(() => {
		if (props.slugs === undefined && props.table) {
			props.fetchSlug(props.table.id, props.params.recordId);
		}
	});

	const headerRef = useRef();

	useEffect(() => {
		if (props.reportDimensions) {
			const rect = headerRef.current.getBoundingClientRect();
			props.reportDimensions(rect.width, rect.height, { bottom: headerMarginBottom });
		}
	}, []);
	

	const { 
		language,
		hasLanguageToggle,
		isModal,
		setLanguageState,
		lastmodifdate,
		isGod,
		table,
		params,
		editSchemaAction,
		isPreviewEdited,
		isViewingPreview,
		setIsPreviewing,
		slugs,
		isLight,
		isProdEnv,
		previewType,
		children,
		buttons,
	} = props;

	const languageToggler = hasLanguageToggle ? <LanguageToggler onChangeLang={isModal ? setLanguageState : null} localLanguage={language} /> : null;
	
	const lastModif = lastmodifdate ? <div className="last-modif-date">Last modification : {lastmodifdate}</div> : null;

	let editSchema = null;
	if (isGod) {
		const editSchemaLink = table ? `/edit/zva_table/${table.id}` : '';
		if (editSchemaLink) {
			editSchema = <NavLinkButton to={editSchemaLink} flat="true"><Icon icon="edit" /> Edit Schema</NavLinkButton>;
		} else if (editSchemaAction) {
			editSchema = <Button onClick={editSchemaAction} flat="true"><Icon icon="edit" /> Edit Schema</Button>;
		}
	}
	

	const previewProcessor = table && table.hasTemplate ? (
		<PreviewRecord 
			tableId={table.id}
			recordId={params.recordId}
			isPreviewEdited={isPreviewEdited}
			isViewingPreview={isViewingPreview}
			setIsPreviewing={setIsPreviewing}
		/>
	) : null;

	const renderdSlugs = slugs && slugs.length ? (
		<div>
			<h4>Links</h4>
			{slugs.map(slugDef => {
				return <div key={`slug-${slugDef.lang}`} className="permalinks"><span>{slugDef.lang}</span> <a href={slugDef.slug} target="_blank">{slugDef.slug}</a></div>;
			})}
		</div>
	) : null;
	

	const infos = isLight ? renderdSlugs : (
		<React.Fragment>
			{children}
			{lastModif}
			{renderdSlugs}
			{isProdEnv && <ProdEnvWarning />}
		</React.Fragment>
	);

	const classList = [];
	if (isLight) classList.push('light');
	if (isProdEnv) classList.push('prod-warning-enhance');

	const style = {
		width: isLight && isViewingPreview && previewType === 'iframe' ? '50%' : '100%',
	};

	// console.log(this.props.isProdEnv);
	return (
		<Header className={classList.join(' ')} style={style} ref={headerRef}>
			<HeaderTexts columns="8">
				{infos}
			</HeaderTexts>

			<HeaderFcn columns="4" offset="9" justify="end" align="end">
				{buttons}
			</HeaderFcn>

			<div className="popout">
				{editSchema}
				{previewProcessor}
				{languageToggler}
			</div>
		</Header>
	);

}

FormHeaderCore.propTypes = {
	isGod: PropTypes.bool,
	slugs: PropTypes.array,
	params: PropTypes.shape({
		tableName: PropTypes.string,
		recordId: PropTypes.string,
	}),
	
	table: PropTypes.object,
	isModal: PropTypes.bool,
	isViewingPreview: PropTypes.bool,
	previewType: PropTypes.string,
	isPreviewEdited: PropTypes.bool,
	language: PropTypes.string,
	hasLanguageToggle: PropTypes.bool,
	lastmodifdate: PropTypes.string,
	isLight: PropTypes.bool,
	isProdEnv: PropTypes.bool,
	buttons: PropTypes.any,
	children: PropTypes.any,

	setLanguageState: PropTypes.func,
	fetchSlug: PropTypes.func,
	setIsPreviewing: PropTypes.func,
	editSchemaAction: PropTypes.func,
	reportDimensions: PropTypes.func,
};
