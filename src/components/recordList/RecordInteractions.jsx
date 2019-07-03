import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import InfosFcn from '../../containers/recordList/InfosFcn';
import DuplicateBtn from '../../containers/recordList/DuplicateBtn';
import OrderFcn from '../../containers/recordList/standard/OrderFcn';
import DeleteBtn from '../../containers/recordList/DeleteBtn';
import { Button } from '../../styles/Button';
import { getActionCss } from '../../styles/RecordActions';
import { PromptContainer, PromptWidget } from '../../styles/Prompts';
import colors from '../../styles/Colors';
import { Icon } from '../../styles/Icon';

import { LASTMODIF_DATE_ALIAS, CREATED_DATE_ALIAS, PRIKEY_ALIAS, LABEL_PSEUDOFIELD_ALIAS, SLUG_PSEUDOFIELD_ALIAS } from '../../freestone/schemaProps';

const DEFAULT_LABEL = 'Actions';
const EDIT_LABEL = 'Edit';
const PREVIEW_LABEL = 'Preview';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	.actions {
		margin-bottom: 5px;
	}
`;

const ActionLink = styled.a`${props => getActionCss(props)}`;
const ActionNavLink = styled(NavLink)`${props => getActionCss(props)}`;
export default class RecordInteractions extends Component {
	static propTypes = {
		table: PropTypes.object,
		fields: PropTypes.array,
		path: PropTypes.string,
		values: PropTypes.object,
		hasPreview: PropTypes.bool,
		hasCustomOrder: PropTypes.bool,

		rememberListPage: PropTypes.func,
		lockScroll: PropTypes.func,
		fetchRecords: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			active: false,
		};
	}

	componentWillUnmount() {
		this.removeWindowListener();
	}
	
	onEditClick = () => {
		this.props.lockScroll(this.props.path, window.scrollY);
		this.props.rememberListPage(this.props.table.name, this.props.values[PRIKEY_ALIAS], this.props.path);
	}

	onWindowClick = (e) => {
		if (!this.clicked) this.toggleActions();
		this.clicked = false;
	}

	toggleActions = (e) => {
		this.clicked = true;
		const isActiveNewState = !this.state.active;

		this.setState({
			active: isActiveNewState,
		});
		//if becomes active, add event lister to close on click outside
		if (isActiveNewState) {
			this.addWindowListener();
		} else {
			this.removeWindowListener();
		}
	}

	addWindowListener() {
		window.addEventListener('click', this.onWindowClick);
	}

	removeWindowListener() {
		window.removeEventListener('click', this.onWindowClick);
	}

	render() {
		const prikeyVal = this.props.values[PRIKEY_ALIAS];
		const recordLink = this.props.values[SLUG_PSEUDOFIELD_ALIAS];

		return (
			<Container>
				<PromptContainer className={`actions ${this.state.active && 'active'}`}>
					<Button round="true" info="true" bordered="true" onClick={this.toggleActions}>{DEFAULT_LABEL} <Icon icon="angle-down" /></Button>
					{this.state.active && (<PromptWidget>
						<ActionNavLink to={`/edit/${this.props.table.name}/${prikeyVal}`} onClick={this.onEditClick} accent="true">
							<Icon icon="pencil-alt" />{EDIT_LABEL}
						</ActionNavLink>
						<DuplicateBtn tableName={this.props.table.name} prikey={prikeyVal} />
						<DeleteBtn key={`${this.props.table.name}_${prikeyVal}`} tableName={this.props.table.name} prikey={prikeyVal} />
						{recordLink && <ActionLink href={recordLink} target="_blank" accent="true"><Icon icon="eye" />{PREVIEW_LABEL}</ActionLink>}
					</PromptWidget>)}
				</PromptContainer>
				<InfosFcn
					prikey={prikeyVal}
					lastmodifdate={this.props.values[LASTMODIF_DATE_ALIAS]}
					createddate={this.props.values[CREATED_DATE_ALIAS]}
					label={this.props.values[LABEL_PSEUDOFIELD_ALIAS]}
					tableName={this.props.table.name}
				/>
				{this.props.table.hasOrder && !this.props.hasCustomOrder && <OrderFcn tableName={this.props.table.name} prikey={prikeyVal} fetchRecords={this.props.fetchRecords} />}
			</Container>
		);
	}
}
