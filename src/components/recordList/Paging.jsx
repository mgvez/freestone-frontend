import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class Paging extends Component {
	static propTypes = {
		tableName: PropTypes.string,
		nPages: PropTypes.number,
		curPage: PropTypes.number,
		search: PropTypes.string,
		onChangePage: PropTypes.func,
	};

	onClickPage = (e) => {
		e.preventDefault();
		const clicked = e.currentTarget;
		this.props.onChangePage(clicked.dataset.page);
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

		//le link peut etre un Link ou encore un callback
		let lnk;
		if (this.props.onChangePage) {
			lnk = <a data-page={num} onClick={this.onClickPage} className="">{display}</a>;
		} else {
			lnk = <NavLink to={`/list/${this.props.tableName}/${num}/${this.props.search}`} activeClassName="active" className="">{display}</NavLink>;
		}

		return (
			<li key={`${num}_${label}`} className={activeClass}>{lnk}</li>
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
