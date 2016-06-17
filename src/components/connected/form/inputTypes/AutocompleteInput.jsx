import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Input } from 'components/static/form/inputTypes/Input';
import Autosuggest from 'react-autosuggest';

import * as optionsActionCreators from 'actions/foreign-options';
import { foreignOptionsMapStateToProps } from 'selectors/foreignOptions';


function getItemValue(item) {
	return item.label;
}

function renderItem(item, currentVal) {
	// const isHighlighted = item.label.trim().toLowerCase() === currentVal.value.trim().toLowerCase();
	return (
		<span key={item.value}>
			{item.label}
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
	};

	onSuggestionsUpdateRequested = ({ value }) => {
		// console.log(`filter suggestions ${value}`);
		this.setState({
			suggestions: this.getSuggestions(value),
		});
	};

	getSuggestions = (value) => {
		const options = this.props.foreignOptions && this.props.foreignOptions.values;
		if (!options) return [];
		if (!value) return options;
		// console.log(options);

		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		return inputLength === 0 ? options : options.filter(option => {
			return option.label.match(this.regexMatchOption);
		});
	}

	getCurrentOption() {
		const options = this.props.foreignOptions && this.props.foreignOptions.values;
		return (options && options.find((option) => option.value === String(this.props.val))) || {};
	}

	render() {
		
		// console.log(`VAL ${this.props.val}`);
		if (!this.props.foreignOptions) return null;

		const current = this.getCurrentOption();
		// console.log(current);
		const value = (this.state.currentText !== null && this.state.currentText) || current.label;
		const { suggestions } = this.state;
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
				shouldRenderSuggestions={shouldRenderSuggestions}
			/>
			{thumb}
		</div>);
	}
}
