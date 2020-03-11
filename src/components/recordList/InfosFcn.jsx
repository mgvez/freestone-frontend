import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../styles/Button';
import { Tooltip } from '../../styles/Prompts';
import { Icon } from '../../styles/Icon';

const Container = styled.div`
	position: relative;
`;


export default class InfosFcn extends Component {
	static propTypes = {
		prikey: PropTypes.string,
		tableName: PropTypes.string,
		createddate: PropTypes.string,
		lastmodifdate: PropTypes.string,
		label: PropTypes.string,

		fetchRecordInfo: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			active: false,
		};
	}

	handleMouseOver = () => {
		if (!this.props.createddate) this.onRequestInfo();
		this.setState({
			active: true,
		});
	}

	handleMouseOut = () => {
		this.setState({
			active: false,
		});
	}

	onRequestInfo = () => {
		if (!this.props.tableName) return;
		this.props.fetchRecordInfo(this.props.tableName, this.props.prikey);
	}
	
	render() {
		const created = this.props.createddate || 'unknown';
		const modified = this.props.lastmodifdate || 'unknown';
		const tt = this.state.active ? (
			<Tooltip>
				id. {this.props.prikey}<br />
				c. {created}<br />
				m. {modified}<br />
			</Tooltip>
		) : '';
		return (
			<Container>
				{tt}
				<Button onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} tiny="true" faded="true" info="true" circle="true"><Icon icon="info" side="center" /></Button>
			</Container>
		);
	}
}
