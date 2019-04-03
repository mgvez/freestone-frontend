import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cancel extends Component {
	static propTypes = {
		tableName: PropTypes.string,
		recordId: PropTypes.string,
		label: PropTypes.string,
		afterCancelLocation: PropTypes.string,

		records: PropTypes.array,

		callback: PropTypes.func,
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

		if (this.props.callback) {
			this.props.callback();
		} else {
			this.props.goTo(this.props.afterCancelLocation ? this.props.afterCancelLocation : `list/${this.props.tableName}`);
		}
	};

	render() {
		if (this.state.cancelling) {
			return <span>Cancelling</span>;
		}

		return (
			<a onClick={this.doCancel} className="button-round-danger">{this.props.label}</a>
		);
	}
}
