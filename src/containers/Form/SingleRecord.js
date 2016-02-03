import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { formSchemaSelector } from 'selectors/FormSchema';
import { formRecordSelector } from 'selectors/FormRecord';

import { RequireApiData } from 'containers/common/RequireApiData';
import { Children } from 'containers/Form/Children';

import { Input } from 'components/Form/Input';

@connect(
	(state, props) => {
		return {
			...formSchemaSelector(state, props),
			record: formRecordSelector(state, props),
		};
	},
	dispatch => bindActionCreators({ ...schemaActionCreators, ...recordActionCreators }, dispatch)
)
export class SingleRecord extends Component {
	static propTypes = {
		params: React.PropTypes.object,
		table: React.PropTypes.object,
		children: React.PropTypes.array,
		record: React.PropTypes.object,
		fields: React.PropTypes.array,
		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
		setFieldVal: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.requireDataCtrl = new RequireApiData;
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		const { tableName, recordId } = props.params;
		// console.log(props.record);
		this.requireDataCtrl.requireProp('table', props, this.props.fetchTable, [tableName]);
		this.requireDataCtrl.requireProp('record', props, this.props.fetchRecord, [tableName, recordId]);
	}

	render() {
		let header;
		let form;
		let sub;
		if (this.props.table && this.props.record) {
			header = (
				<header>
					<h1>{this.props.table.displayLabel}</h1>
					<div>{this.props.table.help}</div>
				</header>
			);
			form = (
				<article>
					{
						this.props.fields.map((field) => {
							return (<Input
								key={field.id} 
								field={field}
								tableName={this.props.table.name}
								recordId={this.props.params.recordId}
								val={this.props.record[field.name]}
								setFieldVal={this.props.setFieldVal}
							/>);
						})
					}
				</article>
			);
			if (this.props.children && false) {

				sub = (
					<div>
						{
							this.props.children.map((tableId) => {
								return (
									<Children
										key={tableId}
										tableId={tableId}
										parentTableName={this.props.table.name}
										parentRecordId={this.props.params.recordId}
									/>
								);
							})
						}
					</div>
				);

			}
		}
		return (
			<section>
				{ header }
				{ form }
				{ sub }
			</section>
		);
	}
}
