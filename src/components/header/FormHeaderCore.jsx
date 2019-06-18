import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cssVars from '../../styles/Variables';
import { Header, HeaderTexts, HeaderFcn } from '../../styles/Header';

import LanguageToggler from '../../containers/form/LanguageToggler';
import ProdEnvWarning from '../widgets/ProdEnvWarning';
import PreviewRecord from '../../containers/process/PreviewRecord';

const marginBottom = 60;
const StyledHeader = styled(Header)`
	
	margin-bottom: ${marginBottom}px;

	&.prod-warning-enhance {
		background: rgb(255, 245, 201);
	}

	&.light {
		justify-content: flex-end;
		position:fixed;
			top: 0;
			left: 0;
		transition: transform 0.3s ease;
		z-index: 5;
	}
	
	.permalinks {
		span {
			font-weight: bold;
			text-transform: uppercase;
		}
	}

	.last-modif-date {
		margin-top: 20px;
		font-weight: ${cssVars.fontWeightMedium};
	}

	.popout {
		position: absolute;
		bottom:0;
		right: 30px;

		display: flex;
		transform: translate(0, 100%);
	}

	.button-preview {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		font-weight: ${cssVars.fontWeightSemibold};
		text-transform: uppercase;

		&.schema + .button-preview {
			margin-left: 20px;
		}
	}
`;


export default class FormHeaderCore extends Component {
	static propTypes = {
		isGod: PropTypes.bool,
		slugs: PropTypes.array,
		params: PropTypes.shape({
			tableName: PropTypes.string,
			recordId: PropTypes.string,
		}),
		
		table: PropTypes.object,
		isModal: PropTypes.bool,
		isViewingPreview: PropTypes.bool,
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
	};

	static contextTypes = {
		setHeight: PropTypes.func,
	};
	
	componentDidMount() {
		this.requireData(this.props);
		
		this.onResize();
		window.addEventListener('resize', this.onResize);
	}

	componentWillUnMount() {
		window.removeEventListener('resize', this.onResize);
	}

	onResize = () => {
		const h = this.refs.header.getBoundingClientRect().height;
		this.context.setHeight(this.props.isLight, h, marginBottom);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}

	requireData(props) {
		if (props.slugs === undefined && props.table) {
			this.props.fetchSlug(props.table.id, props.params.recordId);
		}
	}

	render() {
		const language = this.props.language;

		const languageToggler = this.props.hasLanguageToggle ? <LanguageToggler onChangeLang={this.props.isModal ? this.props.setLanguageState : null} localLanguage={language} /> : null;
		
		
		const lastModif = this.props.lastmodifdate ? <div className="last-modif-date">Last modification : {this.props.lastmodifdate}</div> : null;

		let editSchema = null;
		if (this.props.isGod) {
			const editSchemaLink = this.props.table ? `#/edit/zva_table/${this.props.table.id}` : '';
			if (editSchemaLink) {
				editSchema = <a href={editSchemaLink} className="button-preview schema"><i className="fa fa-edit"></i>Edit Schema</a>;
			} else if (this.props.editSchemaAction) {
				editSchema = <a onClick={this.props.editSchemaAction} className="button-preview schema"><i className="fa fa-edit"></i>Edit Schema</a>;
			}
		}
		
		// const previewBtn = this.props.table && this.props.table.hasTemplate ? <PreviewButton tableId={this.props.table.id} recordId={this.props.params.recordId} setIsPreviewing={this.props.setIsPreviewing} isViewingPreview={this.props.isViewingPreview} /> : null;

		const previewProcessor = this.props.table && this.props.table.hasTemplate ? <PreviewRecord 
			tableId={this.props.table.id}
			recordId={this.props.params.recordId}
			isPreviewEdited={this.props.isPreviewEdited}
			isViewingPreview={this.props.isViewingPreview}
			setIsPreviewing={this.props.setIsPreviewing}
		/> : null;

		const slugs = this.props.slugs && this.props.slugs.length ? (
			<div>
				<h4>Links</h4>
				{this.props.slugs.map(slugDef => {
					return <div key={`slug-${slugDef.lang}`} className="permalinks"><span>{slugDef.lang}</span> <a href={slugDef.slug} target="_blank">{slugDef.slug}</a></div>;
				})}
			</div>
		) : null;


		const infos = (this.props.isLight) ? '' : (
			<HeaderTexts>
				{this.props.children}
				{lastModif}
				{slugs}
				{this.props.isProdEnv && <ProdEnvWarning />}
			</HeaderTexts>
		);

		const classList = [];
		if (this.props.isLight) classList.push('light');
		if (this.props.isProdEnv) classList.push('prod-warning-enhance');

		const style = {
			width: this.props.isLight && this.props.isViewingPreview ? '50%' : '100%',
		};

		// console.log(this.props.isProdEnv);
		return (
			<StyledHeader className={classList.join(' ')} style={style} ref="header">
				{infos}
				
				<HeaderFcn>
					{this.props.buttons}
				</HeaderFcn>
				<div className="popout">
					{editSchema}
					{previewProcessor}
					{languageToggler}
				</div>
			</StyledHeader>
		);
	}
}
