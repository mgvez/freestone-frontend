import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

import { NavGroup } from 'components/Menu/NavGroup';
import { Errors } from 'components/Errors';

import * as navActionCreators from 'actions/nav';

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
			...state.freestone,
			...state.ajax,
		};
	},
	dispatch => bindActionCreators(navActionCreators, dispatch)
)
export class Freestone extends Component {
	static propTypes = {
		fetchFreestone: React.PropTypes.func,
		tables: React.PropTypes.array,
		fields: React.PropTypes.object,
		modules: React.PropTypes.array,
		pages: React.PropTypes.array,
		navGroups: React.PropTypes.array,
		children: React.PropTypes.any,
		errors: React.PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchFreestone();
	}

	render() {
		// console.log(this.props);

		let groups = this.props.navGroups.map((group) => {
			const groupId = group.id;

			return {
				...group,
				tables: this.props.tables.filter((table) => {
					return table.group_id === groupId;
				}),
				modules: this.props.modules.filter((module) => {
					return module.group_id === groupId;
				}),
				pages: this.props.pages.filter((page) => {
					return page.group_id === groupId;
				}),
				childrenGroups: [],
			};
		});

		groups.filter(group => group.parent_id !== 0).forEach((group) => {
			const parent = groups.find(candidate => candidate.id === group.parent_id);
			if (parent) {
				parent.childrenGroups.push(group);
			}
		});

		groups = groups.filter(group => group.parent_id === 0);
		// console.log(groups);

		return (
			<section className="container">
				<DocumentMeta {...metaData} />
				<div className="row">
					<div className="col-md-3">
						{
							groups.map((item) => {
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
