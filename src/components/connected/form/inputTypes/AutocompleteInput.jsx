import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Input } from 'components/static/form/inputTypes/Input';
import Autosuggest from 'react-autosuggest';

import * as optionsActionCreators from 'actions/foreignOptions';
import { foreignOptionsMapStateToProps } from 'selectors/foreignOptions';


function getItemValue(item) {
	return item.label;
}

function parseLabel(string) {
	let label = string;
	const hex = /(#[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;
	const rgba = /(rgba\(\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*\d*(?:\.\d+)?\))/;
	let result;
	const parts = [];
	while ((result = hex.exec(label)) || (result = rgba.exec(label))) {
		if (result.index) {
			parts.push(label.substring(0, result.index));
		}
		parts.push(<i className="color-preview" style={{ background: result[1] }}></i>);
		label = label.substring(result.index + result[1].length);
	}
	parts.push(label);
	return parts;
}

function renderItem(item) {
	const label = parseLabel(item.label);
	return (
		<span key={item.value}>
			{label}
		</span>
	);
}

function shouldRenderSuggestions() {
	return true;
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
		
		this.state = {
			currentText: '',
			suggestions: this.getSuggestions(),
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

		if (nextProps.foreignOptions !== this.props.foreignOptions) {
			// console.log(nextProps.foreignOptions);
			this.setState({
				suggestions: this.getSuggestions(null, nextProps.foreignOptions),
			});
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

	onSelect = (event, { suggestion, suggestionValue }) => {
		// console.log(`select ${suggestionValue}`);
		this.changeVal(suggestion.value);
		this.setCurrentText(suggestionValue);
		
	};

	onChange = (event, { newValue }) => {
		// console.log(`change ${newValue}`);
		this.setCurrentText(newValue);
		this.regexMatchOption = new RegExp(newValue.split('').join('\\w*').replace(/\W/, ''), 'i');
	};

	onBlur = () => {
		// console.log(`blur`);
		const current = this.getCurrentOption();
		this.setCurrentText(current && current.label);
		this.setState({
			suggestions: this.getSuggestions(),
		});
	};

	onSuggestionsUpdateRequested = ({ value }) => {
		// console.log(`filter suggestions ${value}`);
		this.setState({
			suggestions: this.getSuggestions(value),
		});
	};

	getSuggestions = (value, foreignOptions) => {
		// console.log(`getSuggestions ${value}`);

		const options = (foreignOptions && foreignOptions.values) || (this.props.foreignOptions && this.props.foreignOptions.values);
		if (!options) return [];
		if (!value) return options;
		// console.log(options);

		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		const res = inputLength === 0 ? options : options.filter(option => {
			return option.label.match(this.regexMatchOption);
		});
		// console.log(res);
		return res;
	}

	getCurrentOption() {
		const options = this.props.foreignOptions && this.props.foreignOptions.values;
		return (options && options.find((option) => option.value === String(this.props.val))) || {};
	}

	render() {
		
		// console.log(`VAL ${this.props.val}`);
		if (!this.props.foreignOptions || !this.props.foreignOptions.values.length) return null;

		const current = this.getCurrentOption();
		// console.log(current);
		const value = (this.state.currentText !== null && this.state.currentText) || current.label;
		const { suggestions } = this.state;
		// console.log('render with "%s" tx, %s options', value, suggestions.length);
		const inputProps = {
			placeholder: '',
			value,
			onChange: this.onChange,
			onBlur: this.onBlur,
		};

		const thumb = current.image && (<img src={current.image} />);

		return (<div>
			<Autosuggest
				id={`${this.props.field.id}_${this.props.recordId}`}
				suggestions={suggestions}
				inputProps={inputProps}
				onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
				onSuggestionSelected={this.onSelect}
				renderSuggestion={renderItem}
				getSuggestionValue={getItemValue}
				focusFirstSuggestion
				shouldRenderSuggestions={shouldRenderSuggestions}
			/>
			{thumb}
		</div>);
	}
}
