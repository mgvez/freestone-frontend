import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { NavGroup } from 'components/static/menu/NavGroup';
import { Gravatar } from 'components/connected/widgets/Gravatar';

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
		username: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(props) {
		this.requireData(props);
	}

	requireData(props) {
		if (!props.tree.length) this.props.fetchNav();
	}

	render() {
		// console.log('%cRender menu', 'font-weight: bold');
		// console.log(this.props.tree);
		return (
			<nav className="navbar-default" role="navigation">
				<div className="user">
					<Gravatar />
					<img src="http://placehold.it/75x75" alt="user" />
					<p>{this.props.username}</p>
				</div>
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
