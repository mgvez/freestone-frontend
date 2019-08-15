import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../styles/Button';
import { Icon } from '../../styles/Icon';

export default class Cancel extends Component {
	static propTypes = {
		tableName: PropTypes.string,
		recordId: PropTypes.string,
		label: PropTypes.string,
		afterCancelLocation: PropTypes.string,
		records: PropTypes.array,
		cancelEdit: PropTypes.func,
		goTo: PropTypes.func,
	};

	static defaultProps = {
		label: 'Cancel changes',
	};


	constructor(props) {
		super(props);
		this.state = {
			cancelling: false,
		};
	}

	doCancel = () => {
		this.setState({
			cancelling: true,
		});

		this.props.cancelEdit(this.props.records);
		this.props.goTo(this.props.afterCancelLocation ? this.props.afterCancelLocation : `/list/${this.props.tableName}`);
	};

	render() {
		if (this.state.cancelling) {
			return <span>Cancelling</span>;
		}

		return (
			<Button onClick={this.doCancel} round danger><Icon icon="times" />{this.props.label}</Button>
		);
	}
}
