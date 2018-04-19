import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from '../../utils/Debounce.js';

export default class ListSearch extends Component {
	static propTypes = {
		tableName: PropTypes.string,
		search: PropTypes.string,
		curPage: PropTypes.number,
		router: PropTypes.object,
		numRecords: PropTypes.number,
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

	getSearchResults() {
		return this.props.search ? <div className="search-results-num">Showing {this.props.numRecords} result{(this.props.numRecords > 1) ? 's' : ''} for '{this.props.search}' in {this.props.tableName}</div> : <div> </div>;
	}

	getClearSearch() {
		return this.props.search ? <button className="button-search clear" type="reset" onClick={this.onUpdateSearchField}><i className="fa fa-times"></i></button> : null;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.search();
	}

	search() {
		let val = this.searchInput.value;
		val = val ? `/${val}` : '';
		const path = `list/${this.props.tableName}/1${val}`;
		this.props.router.push(path);
	}

	render() {
		return (<form className="search-results-infos" onSubmit={this.handleSubmit}>
			{this.getSearchResults()}
			<div className="search-inputs-ctn">
				<input className="search-input" type="search" placeholder="search" ref={el => this.searchInput = el} initialValue="" />
				<button className="button-search"><i className="fa fa-search"></i></button>
				{this.getClearSearch()}
			</div>
		</form>);
	}
}
