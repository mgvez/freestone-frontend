import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../../../styles/Button';
import colors from '../../../styles/Colors';
import { PromptWidget, PromptContainer } from '../../../styles/Prompts';
import { Icon } from '../../../styles/Icon';

import styled from 'styled-components';

const UnusedContainer = styled.div`
	font-size: 0.7em;
	font-weight: bold;
	&.locked {
		color: ${colors.dangerPrimary}
	}
`;


export default class BankNUses extends Component {
	static propTypes = {
		bankName: PropTypes.string,
		//id de l'item de banque
		id: PropTypes.string,
		nUses: PropTypes.number,
		isLocked: PropTypes.bool,
		records: PropTypes.array,

		fetchBankUses: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			active: false,
		};
	}

	onWindowClick = () => {
		this.toggleActions();
	}

	requireData(props) {
		// console.log(props);
		if (props.id && !props.records) this.props.fetchBankUses(this.props.bankName, props.id);
	}

	toggleActions = (e) => {
		if (e) e.stopPropagation();
		const isActiveNewState = !this.state.active;

		this.setState({
			active: isActiveNewState,
		});
		//if becomes active, add event lister to close on click outside
		if (isActiveNewState) {
			this.addWindowListener();
			this.requireData(this.props);
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
		if (Number(this.props.nUses) === 0) {
			if (this.props.isLocked) {
				return <UnusedContainer className="locked">locked</UnusedContainer>;
			}
			return <UnusedContainer>not used</UnusedContainer>;
		}

		const listRecords = this.props.records && this.props.records.map((rec) => {
			return (<li key={`${rec.tableId}_${rec.recordId}`}>
				<Link to={`/edit/${rec.tableId}/${rec.recordId}`} onClick={this.toggleActions} className="record-action">{rec.tableLabel} - {rec.label}</Link>
			</li>);
		});

		return (
			<PromptContainer className={this.state.active && 'active'}>
				<Button small="true" info="true" bordered="true" round="true" onClick={this.toggleActions}>
					{this.props.nUses} use(s) <Icon icon="angle-down" side="right" />
				</Button>
				{this.state.active && (<PromptWidget light large>
					<ul>
						{listRecords}
					</ul>
				</PromptWidget>)}
			</PromptContainer>
		);
	}
}
