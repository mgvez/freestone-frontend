import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../styles/Colors';

import ListNavLink from '../../containers/recordList/ListNavLink';
import { Icon } from '../../styles/Icon';

const N_TO_SHOW = 10;

const Pagination = styled.ul`
	list-style-type: none;
	padding-left: 0;
	text-align: right;
	margin: 12px 0;
`;

const Page = styled.li`
	display: inline-block;
	border: 1px solid ${colors.accentPrimary};
	text-align: center;

	a {
		display: block;
		width: 35px;
		padding: 7px 0;
		background: #fff;
		color: ${colors.accentPrimary};
		text-decoration: none;
	}

	&.active {
		a {
			background: ${colors.accentPrimary};
			color: #fff;
		}
	}

	& + li {
		margin-left: 10px;
	}
`;

export default class Paging extends Component {
	static propTypes = {
		tableName: PropTypes.string,
		nPages: PropTypes.number,
		curPage: PropTypes.number,
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
			display = <Icon icon="angle-left" side="center" />;
		} else if (label === 'first') {
			display = <Icon icon="angle-double-left" side="center" />;
		} else if (label === 'next') {
			display = <Icon icon="angle-right" side="center" />;
		} else if (label === 'last') {
			display = <Icon icon="angle-double-right" side="center" />;
		} else {
			display = label;
		}

		const activeClass = num === this.props.curPage ? 'active' : '';

		let lnk;
		if (this.props.onChangePage) {
			lnk = <a data-page={num} onClick={this.onClickPage} className="">{display}</a>;
		} else {
			lnk = <ListNavLink tableName={this.props.tableName} page={num} activeClassName="active" className="">{display}</ListNavLink>;
		}

		return (
			<Page key={`${num}_${label}`} className={activeClass}>{lnk}</Page>
		);
	}

	render() {

		if (!this.props.nPages) return null;
		const pages = [];
		const halfToShow = Math.floor(N_TO_SHOW / 2);
		let firstToShow = this.props.curPage - halfToShow;
		if (firstToShow < 1) firstToShow = 1;
		let lastToShow = firstToShow + N_TO_SHOW;
		if (lastToShow > this.props.nPages) lastToShow = this.props.nPages;
		if (lastToShow - firstToShow < N_TO_SHOW) firstToShow = lastToShow - N_TO_SHOW;
		if (firstToShow < 1) firstToShow = 1;

		if (firstToShow > 1) {
			const prev = this.props.curPage - halfToShow;
			pages.push(this.getPage(1, 'first'));
			if (prev > 1) pages.push(this.getPage(prev, 'previous'));
		}

		for (let i = firstToShow; i <= lastToShow; i++) {
			pages.push(this.getPage(i, i));
		}

		if (lastToShow < this.props.nPages) {
			const nx = this.props.curPage + halfToShow;
			if (nx < this.props.nPages) pages.push(this.getPage(nx, 'next'));
			pages.push(this.getPage(this.props.nPages, 'last'));
		}

		return (
			<Pagination>
				{pages}
			</Pagination>
		);

	}
}
