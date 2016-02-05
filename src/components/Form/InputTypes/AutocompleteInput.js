import React, { Component } from 'react';

import { Input } from 'components/Form/InputTypes/Input';
import { RequireApiData } from 'utils/RequireApiData';
import Autocomplete from 'react-autocomplete';


const styles = {
	item: {
		padding: '2px 6px',
		cursor: 'default',
	},

	highlightedItem: {
		color: 'white',
		background: 'hsl(200, 50%, 50%)',
		padding: '2px 6px',
		cursor: 'default',
	},

	menu: {
		border: 'solid 1px #ccc',
	},
};

function getItemValue(item) {
	return item.label;
}

function renderItem(item, isHighlighted) {
	return (
		<div style={isHighlighted ? styles.highlightedItem : styles.item} key={item.value} id={ item.value } >
			{item.label}
		</div>
	);
}

function renderMenu(items, value, style) {
	console.log(this);
	return (
		<div style={{ ...styles.menu, ...style }}>
			{value === '' ? (
				<div style={{ padding: 6 }}>Type of the name of a United State</div>
			) : (this.state && this.state.loading) ? (
				<div style={{ padding: 6 }}>Loading...</div>
			) : items.length === 0 ? (
				<div style={{ padding: 6 }}>No matches for {value}</div>
			) : this.renderItems(items)}
		</div>
	);
}

export class AutocompleteInput extends Input {
	static propTypes = {
		foreignOptions: React.PropTypes.object,
	};
	
	constructor(props) {
		super(props);
		this.requireDataCtrl = new RequireApiData;
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		const { foreignOptions } = props;
		this.requireDataCtrl.requireProp('foreignOptions', props, this.props.fetchForeignOptions, [props.field.id]);
	}

	fetchAutocomplete = (event, value) => {
		//this.setState({loading: true})
		this.props.fetchForeignOptions(this.props.field.id, value);
	};

	onSelect = (value, item) => {
		// console.log('set val');
		console.log(`select ${item.value}`);
		//this.setState({ unitedStates: [ item ] })
		this.changeVal(null, value);
	};
	
	render() {
		const options = this.props.foreignOptions && this.props.foreignOptions.values;
		// console.log(options);
		return (
			<Autocomplete
				initialValue={this.props.val}
				ref="autocomplete"
				items={options}
				getItemValue={getItemValue}
				onSelect={this.onSelect}
				onChange={this.fetchAutocomplete}
				renderItem={renderItem}
				renderMenu={renderMenu}
			/>
		);
	}
}
