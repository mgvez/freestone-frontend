import React from 'react';

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

export class FreestoneAutocomplete extends Autocomplete {

	getDefaultProps () {
		let props = super.getDefaultProps();
	return {
	inputProps: {},
	onChange () {},
	onSelect (value, item) {},
	renderMenu (items, value, style) {
	return <div style={{...style, ...this.menuStyle}} children={items}/>
	},
	shouldItemRender () { return true },
	menuStyle: {
	borderRadius: '3px',
	boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
	background: 'rgba(255, 255, 255, 0.9)',
	padding: '2px 0',
	fontSize: '90%',
	position: 'fixed',
	overflow: 'auto',
	maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
	}
	}
	},

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