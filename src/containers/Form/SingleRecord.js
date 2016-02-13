import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';
import * as optionsActionCreators from 'actions/foreign-options';

import { formRecordSelector } from 'selectors/FormRecord';

import { RequireApiData } from 'utils/RequireApiData';
import { Children } from 'containers/Form/Children';

import { Field } from 'components/Form/Field';

const mapStateToProps = formRecordSelector;
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ ...schemaActionCreators, ...recordActionCreators, ...optionsActionCreators }, dispatch);
};

@connect(
	mapStateToProps,
	mapDispatchToProps
)
export class SingleRecord extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		recordId: React.PropTypes.string,

		table: React.PropTypes.object,
		children: React.PropTypes.array,
		record: React.PropTypes.object,
		recordUnaltered: React.PropTypes.object,
		fields: React.PropTypes.array,
		foreignOptions: React.PropTypes.object,
		
		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
		setFieldVal: React.PropTypes.func,
		fetchForeignOptions: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.requireDataCtrl = new RequireApiData;
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// console.log('receive', nextProps.table.id, nextProps.table === this.props.table);
		this.requireData(nextProps);
	}

	// shouldComponentUpdate(nextProps) {
	// 	console.log('should ', nextProps.table.id, nextProps.table === this.props.table);
	// 	return true;
	// 	//return nextProps.id !== this.props.id;
	// }

	requireData(props) {
		const { tableName, recordId } = props;
		// console.log(props.record);
		this.requireDataCtrl.requireProp('table', props, this.props.fetchTable, [tableName]);
		this.requireDataCtrl.requireProp('record', props, this.props.fetchRecord, [tableName, recordId]);
	}

	render() {
		let header;
		let form;
		let sub;
		// console.log('render', this.props.table.id);
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
							return (<Field
								key={field.id} 
								field={field}
								tableName={this.props.table.name}
								recordId={this.props.recordId}
								val={this.props.record[field.id]}
								origVal={this.props.recordUnaltered[field.id]}
								setFieldVal={this.props.setFieldVal}
								fetchForeignOptions={this.props.fetchForeignOptions}
								foreignOptions={this.props.foreignOptions[field.id]}
							/>);
						})
					}
				</article>
			);
			if (this.props.children) {

				sub = (
					<div>
						{
							this.props.children.map((tableId) => {
								return (
									<Children
										key={tableId}
										tableId={tableId}
										parentTableName={this.props.table.name}
										parentRecordId={this.props.recordId}
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
