import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { NavGroup } from '../static/menu/NavGroup';
import { UserInfos } from './widgets/UserInfos';
import { HomeButton } from './widgets/HomeButton';

import { toggleCollapse, fetchNav } from '../../actions/nav';
import { navSelector } from '../../selectors/nav';

@connect(
	navSelector,
	dispatch => bindActionCreators({ toggleCollapse, fetchNav }, dispatch)
)
export class Nav extends Component {
	static propTypes = {
		fetchNav: React.PropTypes.func,
		toggleCollapse: React.PropTypes.func,

		tree: React.PropTypes.array,
		toggleState: React.PropTypes.object,
		username: React.PropTypes.string,
		visible: React.PropTypes.bool,
	};
	
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
		const collapsedClass = this.props.visible ? '' : 'collapsed';
		return (
			<div className={`navbar-container ${collapsedClass}`}>
				<nav className={`navbar-default ${collapsedClass}`} role="navigation">
					<UserInfos />
					<ul>
						<li className="nav-group home">
							<HomeButton showIcon customClass="table-group" />
						</li>
						{
							this.props.tree.map((item) => {
								// console.log('item...');
								return <NavGroup key={item.id} data={item} level={0} toggleState={this.props.toggleState} toggleCollapse={this.props.toggleCollapse} />;
							})
						}
					</ul>
				</nav>
			</div>
		);
	}
}
