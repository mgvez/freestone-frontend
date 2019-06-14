import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getListLink } from '../../selectors/listNavig';
import debounce from '../../utils/Debounce.js';
import { Button } from '../../styles/Button';
import { Input } from '../../styles/Input';
import { Heading3 } from '../../styles/Texts';
import styled from 'styled-components';


const Container = styled.div`
	display: flex;
	align-items: center;

	input {
		margin-bottom: 0;
	}
`;

const Form = styled.form`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export default class ListSearch extends Component {
	static propTypes = {
		tableName: PropTypes.string,
		search: PropTypes.string,
		to: PropTypes.string,
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

		if (this.props.needsFetch) return <Heading3>{this.props.children}</Heading3>;
		return this.props.search ? <Heading3>Showing {this.props.numRecords} result{(this.props.numRecords > 1) ? 's' : ''} for '{this.props.search}' in {this.props.tableName}</Heading3> : <div> </div>;
	}

	getClearSearch() {
		return this.props.search ? <Button danger icon type="reset" onClick={this.onUpdateSearchField}><i className="fa fa-times"></i></Button> : null;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.search();
	}

	search() {
		const path = getListLink(this.props.tableName, {}, 1, this.searchInput.current.value); 
		this.props.goTo(path);
	}

	render() {
		return (<Form onSubmit={this.handleSubmit}>
			{this.getSearchResults()}
			<Container>
				<Input search type="search" placeholder="search" ref={this.searchInput} />
				<Button icon><i className="fa fa-search"></i></Button>
				{this.getClearSearch()}
			</Container>
		</Form>);
	}
}
