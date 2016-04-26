import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { RequireApiData } from 'utils/RequireApiData';
import { fetchMtmOptions } from 'actions/record';
import { mtmOptionsSelector } from 'selectors/mtmOptions';

import { Header } from 'components/Form/Header';


@dragDropContext(HTML5Backend)
@connect(
	mtmOptionsSelector,
	dispatch => bindActionCreators({ fetchMtmOptions }, dispatch)
)
export class SubformMtm extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentRecordId: React.PropTypes.string,
		mtmOptions: React.PropTypes.array,

		fetchMtmOptions: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		// console.log(props);
		this.requireDataCtrl = new RequireApiData;
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		// console.log(props);
		if (props.table) {
			const tableName = this.props.table.name;
			this.requireDataCtrl.requireProp('mtmOptions', props, this.props.fetchMtmOptions, [tableName]);
		}
	}

	render() {
		if (this.props.childrenRecords) {
			this.props.childrenRecords.map((record, index) => {
				// console.log(record);
			});
		}
		if (this.props.mtmOptions) {
			// console.log(this.props.mtmOptions);
			return (
				<section>
					<Header table={this.props.table} />
					{
						this.props.mtmOptions.map((optionGroup, groupIndex) => {
							// console.log(optionGroup);
							
							const { categ, options } = optionGroup;
							return options.map((option, optionIndex) => {
								// console.log(option);
								const { display, id } = option;
								return (
									<div className="col-md-3"
										key={id}
									>
									{optionIndex}. {id}:{display}
									</div>
								);
							});
							
						})
					}
				</section>
			);
		}

		return null;

	}
}
