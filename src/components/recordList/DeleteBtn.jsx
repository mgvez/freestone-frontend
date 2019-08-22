import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../styles/Button';
import { RecordAction } from '../../styles/RecordActions';
import styled from 'styled-components';

import colors from '../../styles/Colors';
import { darken } from '../../styles/Utils';
import { Icon } from '../../styles/Icon';

const Prompt = styled.div`
	background: ${darken(colors.backgroundMain, 10)};
	margin: 0 -10px;
	padding: 10px;
	
	div + div {
		margin-top: 10px;
	}
`;

export default class DeleteBtn extends Component {
	static propTypes = {
		isButton: PropTypes.bool,
		prikey: PropTypes.string,
		tableName: PropTypes.string,
		deleteRecord: PropTypes.func,
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			requested: false,
		};
	}

	cancel = (e) => {
		e.stopPropagation();

		this.setState({
			requested: false,
		});
	}

	process = (e) => {
		e.stopPropagation();
		if (this.state.requested) {
			this.props.deleteRecord(this.props.tableName, this.props.prikey);
		} else {
			this.setState({
				requested: true,
			});
		}
	};

	render() {

		if (this.state.requested) {
			return (
				<Prompt>
					<RecordAction onClick={this.process}><Icon icon="trash-alt" /> Confirm</RecordAction>
					<RecordAction onClick={this.cancel}><Icon icon="undo" /> Cancel</RecordAction>
				</Prompt>
			);
		}

		return this.props.isButton ? (
			<Button onClick={this.process} round="true" small="true" danger="true"><Icon icon="trash-alt" side="left" /> Delete</Button>
		) : (
			<RecordAction onClick={this.process} danger="true"><Icon icon="trash-alt" /> Delete</RecordAction>
		);
	}
}
