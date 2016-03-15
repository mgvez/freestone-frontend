import React from 'react';

import { Input } from 'components/Form/InputTypes/Input';
import { RequireApiData } from 'utils/RequireApiData';
import Autocomplete from 'react-autocomplete';
// import { FreestoneAutocomplete } from 'components/Form/InputTypes/FreestoneAutocomplete';

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
		<div style={isHighlighted ? styles.highlightedItem : styles.item} key={item.value}>
			{item.label}
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
		// const { foreignOptions } = props;
		this.requireDataCtrl.requireProp('foreignOptions', props, this.props.fetchForeignOptions, [props.field.id]);
	}

	onSelect = (value, item) => {
		// console.log('set val');
		// console.log(`select ${item.value}`);
		//this.setState({ unitedStates: [ item ] })
		this.changeVal(item.value);
	};
	
	fetchAutocomplete = (event, value) => {
		//this.setState({loading: true})
		// console.log('change...');
		this.props.fetchForeignOptions(this.props.field.id, value);
	};

	render() {
		const options = this.props.foreignOptions && this.props.foreignOptions.values;
		// console.log(options);
		const current = (options && options.find((option) => option.value === String(this.props.val))) || {};
		// console.log(this.props.val, current);

		return (
			<Autocomplete
				initialValue={current.label}
				ref="autocomplete"
				items={options}
				getItemValue={getItemValue}
				onSelect={this.onSelect}
				onChange={this.fetchAutocomplete}
				renderItem={renderItem}
			/>
		);
	}
}
