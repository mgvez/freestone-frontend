import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getListLink } from '../../selectors/listNavig';
import debounce from '../../utils/Debounce.js';
import { Button } from '../../styles/Button';
import { Input } from '../../styles/Input';
import { Heading3 } from '../../styles/Texts';
import styled from 'styled-components';
import { Icon } from '../../styles/Icon';
import colors from '../../styles/Colors';


const Container = styled.div`
	position: relative;
	display: flex;
	align-items: stretch;

	.cancel-search {
		position: absolute;
		left: 250px;
		padding: 0 10px;
		background: none;
		color: ${colors.textPrimary};
		font-size: 18px;
		height: 100%;
	}
	
	&.input-wrapper {
		position: relative;
		
		input {
			width: 250px;
			margin-bottom: 0;
			margin-right: 0;
		}
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
		return this.props.search ? <Button danger="true" icon="true" type="reset" onClick={this.onUpdateSearchField} className="cancel-search" >&times;</Button> : null;
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
				<Container className="input-wrapper">
					<Input search rounded type="search" placeholder="search" ref={this.searchInput} />
					<Button icon="true" inputCta="true" ><Icon icon="search" side="center" /></Button>
				</Container>
				
				{this.getClearSearch()}
			</Container>
		</Form>);
	}
}
