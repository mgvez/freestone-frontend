import React, { Component } from 'react';

export default class Cancel extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		recordId: React.PropTypes.string,
		label: React.PropTypes.string,
		afterCancelLocation: React.PropTypes.string,

		records: React.PropTypes.array,

		callback: React.PropTypes.func,
		cancelEdit: React.PropTypes.func,
		goTo: React.PropTypes.func,
	};

	static defaultProps = {
		label: 'Cancel changes',
	};

	componentWillMount() {

		this.setState({
			cancelling: false,
		});
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
