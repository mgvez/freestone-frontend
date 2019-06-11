import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getListLink } from '../../selectors/listRecords';
import debounce from '../../utils/Debounce.js';

export default class ListSearch extends Component {
	static propTypes = {
		tableName: PropTypes.string,
		to: PropTypes.string,
		params: PropTypes.shape({
			tableName: PropTypes.string,
			page: PropTypes.string,
			search: PropTypes.string,
			filter: PropTypes.array,
			order: PropTypes.string,
		}),
		goTo: PropTypes.func,
		numRecords: PropTypes.number,
		needsFetch: PropTypes.bool,
		children: PropTypes.any,
	};

	constructor(props) {
		super(props);
		this.searchInput = React.createRef();
	}

	componentDidMount() {
		this.searchInput.current.addEventListener('keydown', this.onUpdateSearchField);
	}
	
	// componentDidUpdate(prevProps) {
	// 	if (prevProps.tableName !== this.props.tableName && this.searchInput) {
	// 		this.searchInput.value = '';
	// 	}
	// }

	componentWillUnmount() {
		this.searchInput.current.removeEventListener('keydown', this.onUpdateSearchField);
	}

	onUpdateSearchField = debounce(() => {
		this.search();
	}, 300);

	getSearchResults() {

		if (this.props.needsFetch) return <div className="search-results-num">{this.props.children}</div>;
		return this.props.params.search ? <div className="search-results-num">Showing {this.props.numRecords} result{(this.props.numRecords > 1) ? 's' : ''} for '{this.props.params.search}' in {this.props.tableName}</div> : <div> </div>;
	}

	getClearSearch() {
		return this.props.params.search ? <button className="button-search clear" type="reset" onClick={this.onUpdateSearchField}><i className="fa fa-times"></i></button> : null;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.search();
	}

	search() {
		const { to: path } = getListLink(this.props.params, 1, this.searchInput.current.value); 
		this.props.goTo(path);
	}

	render() {
		return (<form className="search-results-infos" onSubmit={this.handleSubmit}>
			{this.getSearchResults()}
			<div className="search-inputs-ctn">
				<input className="search-input" type="search" placeholder="search" ref={this.searchInput} />
				<button className="button-search"><i className="fa fa-search"></i></button>
				{this.getClearSearch()}
			</div>
		</form>);
	}
}
