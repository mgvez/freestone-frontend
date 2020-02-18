import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, HeaderTexts } from '../../styles/Header';
import { Button } from '../../styles/Button';
import { Heading2, ErrorTitle, ErrorMessage } from '../../styles/Texts';
import { Icon } from '../../styles/Icon';

export default class Save extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		afterSaveLocation: PropTypes.object,

		table: PropTypes.object,
		tree: PropTypes.object,
		records: PropTypes.object,
		permissions: PropTypes.object,
		deleted: PropTypes.object,
		fields: PropTypes.array,
		saveState: PropTypes.object,
		isTemporary: PropTypes.bool,

		callback: PropTypes.func,
		saveRecord: PropTypes.func,
		cancelSave: PropTypes.func,
	};

	componentDidMount() {
		// console.log('MOUNT', this.props.records, this.props.deleted);
		//callback has priority over afterSaveLocation. If a callback is present, it will execute instead of redirecting to the location.
		this.props.saveRecord(this.props.table, this.props.tree, this.props.records, this.props.deleted, this.props.permissions, this.props.isTemporary, this.props.afterSaveLocation, this.props.callback);
	}

	render() {
		// console.log(this.props.saveState);
		const isError = this.props.saveState && !!this.props.saveState.status.error;
		let msgDisplay = null;
		if (isError) {
			msgDisplay = (<div>
				<ErrorTitle>{this.props.saveState.status.msg}</ErrorTitle>
				<ErrorMessage>{this.props.saveState.status.error}</ErrorMessage>
				<Button onClick={this.props.cancelSave} danger="true"><Icon icon="pencil-alt" /> <span>Go back to form</span></Button>
			</div>);
		} else {
			msgDisplay = (<div>
				{this.props.saveState && this.props.saveState.status.msg}
			</div>);
		}

		if (this.props.isTemporary) return msgDisplay;

		let optimizationProgress = null;
		if (this.props.saveState.optimization.n_remain) {
			const { n_remain, n_todo_total } = this.props.saveState.optimization;
			const nDone = n_todo_total - n_remain;
			const prcDone = Math.round((nDone / n_todo_total) * 100);
			optimizationProgress = (
				<div key="optim">Optimizing images {prcDone}% done ({nDone} / {n_todo_total})</div>
			);
		}

		return (
			<section className="saving">
				<Header>
					<HeaderTexts>
						<Heading2>Saving...</Heading2>
						{
							Object.keys(this.props.saveState.files).map(tmpName => {
								const curPrc = this.props.saveState.files[tmpName];
								return <div key={tmpName}>Saving file {tmpName} : {curPrc}%</div>;
							})
						}
						{msgDisplay}
						{optimizationProgress}
					</HeaderTexts>	
				</Header>
			</section>
		);
	}
}
