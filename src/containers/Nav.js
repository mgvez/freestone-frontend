import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { NavGroup } from 'components/Menu/NavGroup';

import * as navActionCreators from 'actions/nav';
import { navSelector } from 'selectors/nav';


@connect(
	navSelector,
	dispatch => bindActionCreators(navActionCreators, dispatch)
)
export class Nav extends Component {
	static propTypes = {
		fetchNav: React.PropTypes.func,
		toggleCollapse: React.PropTypes.func,

		tree: React.PropTypes.array,
		toggleState: React.PropTypes.object,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchNav();
	}

	componentWillReceiveProps(props) {
		if (!props.tree.length) {
			this.props.fetchNav();
		}
	}

	render() {
		// console.log('%cRender menu', 'font-weight: bold');
		return (
			<nav className="navbar-default" role="navigation">
				<ul>
				{
					this.props.tree.map((item) => {
						// console.log('item...');
						return <NavGroup key={item.id} data={item} level={0} toggleState={this.props.toggleState} toggleCollapse={this.props.toggleCollapse} />;
					})
				}
				</ul>
			</nav>
		);
	}
}
