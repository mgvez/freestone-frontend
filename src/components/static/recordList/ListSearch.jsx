import React, { Component } from 'react';

import debounce from 'utils/Debounce.js';

export class ListSearch extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		search: React.PropTypes.string,
		curPage: React.PropTypes.number,
		router: React.PropTypes.object,
	};

	componentDidMount() {
		this.searchInput.addEventListener('keydown', this.onUpdateSearchField);
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.tableName !== this.props.tableName && this.searchInput) {
			// console.log('change table');
			this.searchInput.value = '';
		}
	}

	componentWillUnmount() {
		this.searchInput.removeEventListener('keydown', this.onUpdateSearchField);
	}

	onUpdateSearchField = debounce(() => {
		this.search();
	}, 200);

	handleSubmit = (e) => {
		e.preventDefault();
		this.search();
	}

	search() {
		let val = this.searchInput.value;
		val = val ? `/${val}` : '';
		const path = `list/${this.props.tableName}/${this.props.curPage}${val}`;
		this.props.router.push(path);
	}

	render() {
		return (<form onSubmit={this.handleSubmit}>
			<input className="search-input" type="text" placeholder="search" ref={el => this.searchInput = el} initialValue="" />
			<button className="button-search"><i className="fa fa-search"></i></button>
		</form>);
	}
}
