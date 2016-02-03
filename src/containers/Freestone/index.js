import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

import { NavGroup } from 'components/Menu/NavGroup';
import { Errors } from 'components/Errors';

import * as navActionCreators from 'actions/nav';
import { menuTreeSelector } from 'selectors/MenuTree';

const metaData = {
	title: 'Freestone',
	description: 'Start you project easy and fast with modern tools',
	canonical: 'http://example.com/path/to/page',
	meta: {
		charset: 'utf-8',
	},
};

@connect(
	state => {
		return {
			tree: menuTreeSelector(state),
			errors: state.errors,
		};
	},
	dispatch => bindActionCreators(navActionCreators, dispatch)
)
export class Freestone extends Component {
	static propTypes = {
		fetchFreestone: React.PropTypes.func,
		children: React.PropTypes.any,
		tree: React.PropTypes.array,
		errors: React.PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchFreestone();
	}

	render() {
		console.log('%cRender menu', 'font-weight: bold');
		return (
			<section className="container">
				<DocumentMeta {...metaData} />
				<div className="row">
					<div className="col-md-3">
						{
							this.props.tree.map((item) => {
								return <NavGroup key={item.id} data={item} level={0}/>;
							})
						}
					</div>
					<div className="col-md-9">
						<Errors errors={this.props.errors}/>
						{this.props.children}
					</div>
				</div>
			</section>
		);
	}
}
