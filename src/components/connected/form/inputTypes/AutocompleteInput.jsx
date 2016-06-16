import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Input } from 'components/static/form/inputTypes/Input';
import Autocomplete from 'react-autocomplete';

import * as optionsActionCreators from 'actions/foreign-options';
import { foreignOptionsMapStateToProps } from 'selectors/foreignOptions';

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
		position: 'absolute',
		top: '100%',
		left: 0,
		zIndex: 1000,
		borderRadius: '3px',
		boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
		background: 'rgba(255, 255, 255, 0.9)',
		padding: '2px 0',
		fontSize: '90%',
		overflow: 'auto',
	},

	wrapper: {
		position: 'relative',
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

@connect(
	foreignOptionsMapStateToProps,
	dispatch => bindActionCreators(optionsActionCreators, dispatch)	
)
export class AutocompleteInput extends Input {
	static propTypes = {
		fetchForeignOptions: React.PropTypes.func,
		foreignOptions: React.PropTypes.object,
	};
	
	constructor(props) {
		super(props);
		this.regexMatchOption = /./;
		this.currentText = '';
		this.currentMatch = {};
		
		this.state = {
			currentText: '',
		};
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
		//quand on change de record, empty le texte entré, pour mettre la valeur réelle du champ
		if (nextProps.recordId !== this.props.recordId) {
			this.setCurrentText(null);
		}
	}

	requireData(props) {
		if (!props.foreignOptions) this.props.fetchForeignOptions(props.field.id);
	}

	setCurrentText(tx) {
		this.setState({
			currentText: tx,
		});
	}

	onSelect = (value, item) => {
		// console.log(`select ${item.value}`);
		this.changeVal(item.value);
		this.setCurrentText(item.label);
	};

	onChange = (event, value) => {
		// console.log(`change ${value}`);
		this.setCurrentText(value);
		this.regexMatchOption = new RegExp(value.split('').join('\\w*').replace(/\W/, ''), 'i');
	};

	filterOption = (option, inputTextVal) => {
		// console.log(`filtering ${inputTextVal} => ${this.state.currentText}`);
		if (!inputTextVal) return true;
		const currentMatch = this.currentMatch[option.value] = this.currentMatch[option.value] || {};
		if (currentMatch.text === this.state.currentText) {
			return currentMatch.isMatch;
		}
		// console.log(inputTextVal);
		const isMatch = option.label.match(this.regexMatchOption);
		currentMatch.text = this.state.currentText;
		currentMatch.isMatch = isMatch;
		// console.log(isMatch);
		return isMatch;
	};

	render() {
		const options = this.props.foreignOptions && this.props.foreignOptions.values;
		const current = (options && options.find((option) => option.value === String(this.props.val))) || {};

		if (!options) return null;
		const val = this.state.currentText || current.label;

		return (
			<Autocomplete
				value={val}
				ref="autocomplete"
				items={options}
				shouldItemRender={this.filterOption}
				getItemValue={getItemValue}
				onSelect={this.onSelect}
				onChange={this.onChange}
				renderItem={renderItem}
				menuStyle={styles.menu}
				wrapperStyle={styles.wrapper}
			/>
		);
	}
}
