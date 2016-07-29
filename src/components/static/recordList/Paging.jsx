import React, { Component } from 'react';
import { Link } from 'react-router';


export class Paging extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		nPages: React.PropTypes.number,
		curPage: React.PropTypes.number,
		search: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	getPage(num, label) {

		let display;
		if (label === 'previous') {
			display = <i className="fa fa-angle-double-left"></i>;
		} else if (label === 'next') {
			display = <i className="fa fa-angle-double-right"></i>;
		} else {
			display = label;
		}

		const activeClass = num === this.props.curPage ? 'active' : '';

		return (
			<li key={`${num}_${label}`} className={activeClass}>
				<Link to={`/list/${this.props.tableName}/${num}/${this.props.search}`} activeClassName="active" className="">{display}</Link>
			</li>
		);
	}

	render() {

		const pages = [];

		if (this.props.curPage > 1) {
			pages.push(this.getPage(this.props.curPage - 1, 'previous'));
		}

		for (let i = 1; i <= this.props.nPages; i++) {
			pages.push(this.getPage(i, i));
		}

		if (this.props.curPage < this.props.nPages) {
			pages.push(this.getPage(this.props.curPage + 1, 'next'));
		}

		return (
			<ul className="pagination">
				{pages}
			</ul>
		);

	}
}
