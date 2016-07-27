import React, { Component } from 'react';

import { Table } from 'components/static/menu/Table';
import { Module } from 'components/static/menu/Module';

import { TweenMax } from 'utils/Greensock';

const TOGGLE_ANIM_TIME = 0.5;

export class NavGroup extends Component {
	static propTypes = {
		toggleCollapse: React.PropTypes.func,

		childrenGroups: React.PropTypes.array,
		data: React.PropTypes.object,
		level: React.PropTypes.number,
		toggleState: React.PropTypes.object,
	};

	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps) {
		const wasOpen = this.getOpenState(prevProps);
		const isOpen = this.getOpenState(this.props);
		// console.log(wasOpen, isOpen);
		//si on vient d'ouvrir, animate in
		if (wasOpen !== isOpen && isOpen) this.animate(true);
	}

	getChildrenGroups(level) {
		return this.props.data.childrenGroups.map((item) => {
			return <NavGroup key={item.id} data={item} level={level} toggleState={this.props.toggleState} toggleCollapse={this.props.toggleCollapse} />;
		});
	}

	getContents() {
		if (!this.getOpenState()) return null;
		const level = this.props.level + 1;

		return (<ul className="sub-nav" ref="children">
			{ this.getChildrenGroups(level) }
			{
				this.props.data.tables.map((item) => {
					return <Table key={item.id} name={item.name} id={item.id} actionLabel={item.actionLabel} nrecords={item.nrecords} />;
				})
			}
			{
				this.props.data.modules.map((item) => {
					return <Module key={`mod-${item.id}`} {...item} />;
				})
			}
		</ul>);
	}

	getOpenState(fromProps) {
		const props = fromProps || this.props;
		return props.toggleState[props.data.id];
	}

	animate(isOpening, callback) {
		const childrenContainer = this.refs.children;
		// console.log(childrenContainer);
		const dest = isOpening ? 'from' : 'to';
		TweenMax.set(childrenContainer, { height: 'auto' });
		TweenMax[dest](childrenContainer, TOGGLE_ANIM_TIME, { height: 0, onComplete: callback });
	}

	changeState = () => {
		this.props.toggleCollapse(this.props.data.id);
	};

	toggle = () => {

		const groupId = this.props.data.id;
		const isOpen = this.props.toggleState[groupId];
		//si pas ouvert, request le open avant, pour placer les children dans la page
		if (!isOpen) {
			this.changeState();
		} else {
			//ouvert, on ferme
			this.animate(false, this.changeState);
		}
	};

	render() {

		// console.log(this.props.level + ' nav group rendered', this.props.data);
		const isOpen = this.getOpenState();
		
		const activeClass = isOpen ? 'active' : '';
		const icon = this.props.data.icon || 'folder';

		const contents = this.getContents();
		// console.log(this.props.data);
		return (
			<li className={`${activeClass} nav-group`} >
				<a onClick={this.toggle} className={`table-group ${activeClass}`}>
					<i className={`fa fa-${icon}`}></i>
					<span className="nav-label">{this.props.data.name}</span> <span className="fa arrow"></span>
				</a>
				{ contents }				
			</li>
		);
	}
}
