import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StyledSingleRecord } from '../../styles/Form';
import colors from '../../styles/Colors';

import Subform from '../../containers/form/subform/Subform';
import DeleteRecord from '../../containers/form/buttons/DeleteRecord';
import FieldGroup from '../../containers/form/FieldGroup';
import { GridContainer, GridItem } from '../../styles/Grid';
import { StyledFieldGroup } from '../../styles/Input';


let isWaitingForFrame = false;

const SideBar = styled.div`
	padding: 10px 0;
	background: ${colors.backgroundDark};
	color: ${colors.white};
	
	label {
		color: ${colors.white};
	}

	.sticky & {
		position: fixed;
			top: 170px;
	}

	.absolute & {
		position: absolute;
			top: auto;
			bottom: 0;
	}
`;

export default class SingleRecord extends Component {
	state = {
		stickyState: 'relative',
		stickyWidth: 'auto',
	}

	static propTypes = {
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		parentRecordId: PropTypes.string,
		activeGroup: PropTypes.string,
		parentTableId: PropTypes.number,
		isSubform: PropTypes.bool,
		isGod: PropTypes.bool,
		
		table: PropTypes.object,
		children: PropTypes.array,
		record: PropTypes.object,
		recordUnaltered: PropTypes.object,
		mainFields: PropTypes.array,
		env: PropTypes.object,
		language: PropTypes.string,
		isRoot: PropTypes.bool,

		fetchTable: PropTypes.func,
		fetchRecord: PropTypes.func,
		setFieldVal: PropTypes.func,
	};

	componentDidMount() {
		this.requireData(this.props);
		window.addEventListener('scroll', this.stickySidebar);
	}
	
	componentWillUnmount() {
		window.removeEventListener('scroll', this.stickySidebar);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}	

	requireData(props) {
		const { tableId, recordId } = props;
		if (!props.table) this.props.fetchTable(tableId);

		if (recordId && !props.record) {
			this.props.fetchRecord(tableId, recordId);
		}
	}

	renderChild = (child) => {
		return child && child.isDisplay ? (
			<GridItem key={child.tableId} columns="12">
				<Subform
					tableId={child.tableId}
					titleOverride={child.titleOverride}
					descriptionAppend={child.descriptionAppend}
					parentTableId={this.props.table.id}
					parentRecordId={this.props.recordId}
					language={this.props.language}
				/>
			</GridItem>
		) : null;
	}

	stickySidebar = () => {
		if (!this.sidebar) return;
		if (!isWaitingForFrame) {
			isWaitingForFrame = true;
			requestAnimationFrame(this.doScrollHandler);
		}
	}


	doScrollHandler = () => {
		isWaitingForFrame = false;
		const parent = this.sidebar.parentNode;
		const pos = parent.getBoundingClientRect();
		const inner = this.sidebar.getBoundingClientRect();

		if (pos.top <= 160 - pos.height + (inner.height + 20)) {
			if (this.state.stickyState !== 'absolute') this.setState({ stickyState: 'absolute' });
			this.sidebar.style.width = pos.width + 'px';
		} else if (pos.top <= 160) {
			if (this.state.stickyState !== 'sticky') this.setState({ stickyState: 'sticky' });
			this.sidebar.style.width = pos.width + 'px';
		} else if (this.state.stickyState !== 'relative') {
			this.setState({ stickyState: 'relative' });
			this.sidebar.style.width = 'auto';
		}
	}

	renderGroups(fields) {
		const activeGroup = this.props.activeGroup || fields.reduce((found, group) => {
			if (found) return found;
			if (group.label) return group.key;
			return null;
		}, null);

		return <FieldGroup {...this.props} groups={fields} activeGroup={activeGroup} tableId={this.props.tableId} />;
	}

	getSidebarRef = (ref) => {
		this.sidebar = ref;
	}

	render() {
		let form;
		// console.log('render', this.props.table.name);
		// console.log('render', this.props.table, this.props.record);
		if (this.props.table && this.props.record) {

			let deleteBtn;
			if (!this.props.isRoot) {
				deleteBtn = (<DeleteRecord 
					tableId={this.props.table.id}
					recordId={this.props.recordId}
					language={this.props.table.hasLanguage ? this.props.language : null}
				/>);
			}

			const subsiteField = null;//(this.props.isGod && this.props.table.isSubsiteDependent) ? <div>subsite</div> : null;

			const recIdDisplay = this.props.isGod ? <small><em>Record id {this.props.recordId}</em></small> : '';
			// const previewId = this.props.record[PREVIEWID_PSEUDOFIELD_ALIAS];
			// const previewIdDisplay = previewId ? <small><em>Preview {previewId}</em></small> : null;
			form = (
				<article>
					{subsiteField}
					<GridContainer>
						<GridItem columns="6">
							{recIdDisplay}
						</GridItem>
						<GridItem columns="6" justify="right">
							{deleteBtn}
						</GridItem>
					</GridContainer>
					<GridContainer>
						{/* <GridItem columns={`${sidebar ? 8 : 12}`}> */}
						<GridItem columns="12">
							{this.renderGroups(this.props.mainFields)}
						</GridItem>
					</GridContainer>
				</article>
			);

			//shows child forms that are not previously placed through a placeholder
			// if (this.props.children) {
			// 	subforms = (
			// 		<div>
			// 			{this.props.children.map(child => (!child.hasPlaceholder || null) && this.renderChild(child))}
			// 		</div>
			// 	);

			// }
		}
		return (
			<StyledSingleRecord>
				{form}
				{/* {subforms} */}
			</StyledSingleRecord>
		);
	}
}
