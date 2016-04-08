import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { formRecordSelector } from 'selectors/formRecord';

import { RequireApiData } from 'utils/RequireApiData';
import { Children } from 'containers/Form/Children';

import { Field } from 'components/Form/Field';

const mapStateToProps = formRecordSelector;
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ ...schemaActionCreators, ...recordActionCreators }, dispatch);
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
		env: React.PropTypes.object,
		
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
		// console.log(props.recordId);
		this.requireDataCtrl.requireProp('table', props, this.props.fetchTable, [tableName]);
		if (recordId) this.requireDataCtrl.requireProp('record', props, this.props.fetchRecord, [tableName, recordId]);
	}

	render() {
		let form;
		let sub;
		// console.log('render', this.props.record);
		if (this.props.table && this.props.record) {
			
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
								env={this.props.env}
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
										parentTableId={this.props.table.id}
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
			<section className="padded-content">
				{ form }
				{ sub }
			</section>
		);
	}
}
