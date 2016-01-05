import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

import * as actionCreators from 'actions/menu';

const metaData = {
	title: 'Freestone',
	description: 'Start you project easy and fast with modern tools',
	canonical: 'http://example.com/path/to/page',
	meta: {
		charset: 'utf-8',
	},
};

@connect(
	state => state.freestone,
	dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Home extends Component {
	static propTypes = {
		fetchFreestone: React.PropTypes.func,
		tables: React.PropTypes.array,
	}

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// console.log(this.props);
		this.props.fetchFreestone();
	}

	render() {
		return (
			<section>
				<DocumentMeta {...metaData} />
				{
					this.props.tables.map((item, index) =>
						<div>
							{index}. { item.name }
						</div>
					)
				}
			</section>
		);
	}
}
