import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import memoize from 'memoize-one';

import FileThumbnail from '../../../containers/fileThumbnail/FileThumbnail';
import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';

function getItemValue(item) {
	return item && item.label;
}

function parseLabel(string) {
	let label = string;
	const hex = /(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3})/;
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

export default class AutocompleteInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		fetchForeignOptions: PropTypes.func,
		foreignOptions: PropTypes.object,
		field: PropTypes.object,
		recordId: PropTypes.string,
		val: PropTypes.any,
	};

	constructor(props) {
		super(props);
		this.regexMatchOption = /./;
		this.fetchTimeout = null;

		this.state = {
			currentText: '', //text currently in input
			currentUserText: '', // text of currently typed text
		};
	}

	componentDidMount() {
		this.requireData();
	}

	componentDidUpdate() {
		this.requireData();
	}

	requireData() {
		if (!this.props.foreignOptions) {
			// console.log('fetch original %s', props.field.name);
			this.props.fetchForeignOptions(this.props.field.id, null, this.props.val);
		}
	}

	setCurrentText(tx) {
		this.setState({
			currentText: tx,
		});
	}

	//when we select a value among the suggestions
	onSelect = (event, { suggestion, suggestionValue }) => {
		// console.log('select %s', suggestion.value);
		this.props.changeVal(suggestion.value);
		this.setCurrentText(suggestionValue);
		clearTimeout(this.fetchTimeout);
	};

	//when we type in the field
	onChange = (event, { newValue }) => {
		// console.log('type %s', newValue);
		clearTimeout(this.fetchTimeout);

		//if we don't have all db records for options, fetch suggestions
		if (this.props.foreignOptions.is_partial) {
			this.fetchTimeout = setTimeout(() => {
				this.props.fetchForeignOptions(this.props.field.id, newValue);
			}, 500);
		}

		this.setCurrentText(newValue);
		if (newValue.length > 4) {
			const regexpVal = newValue.replace('.', '\\.').replace(/[[\]{}]/g, '\\$&');
			this.regexMatchOption = new RegExp(regexpVal);
		} else {
			this.regexMatchOption = new RegExp(newValue.replace(/[^a-z\s]/ig, '').split('').join('\\w*').replace(/\W/, ''), 'i');
		}
	};

	onBlur = (e, { highlightedSuggestion }) => {
		// console.log(a);
		if (highlightedSuggestion) {
			this.props.changeVal(highlightedSuggestion.value);
			this.setCurrentText(highlightedSuggestion.label);
			this.setState({
				selectedOptionText: highlightedSuggestion.label,
			});
		} else {
			const current = this.getCurrentOption();
			this.setCurrentText(current && current.label);
		}
		clearTimeout(this.fetchTimeout);
		this.setState({
			currentUserText: '',
		});
	};

	//when typing in field, or activating it, 
	onSuggestionsFetchRequested = ({ value }) => {
		// console.log('fetch requested %s', value);
		if (!value) this.props.changeVal(0);

		this.setState({
			currentUserText: value,
		});
	};

	getSuggestionsMemoized = memoize((value, options) => {
		
		if (!options) {
			return [];
		}
		if (!value) {
			return options;
		}
		// console.log(`${this.props.field.name} getSuggestions ${value} ` + options.length);
		// console.log(options);

		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		const res = inputLength === 0 ? options : options.filter(option => {
			return option.label.match(this.regexMatchOption);
		});
		// console.log(res);
		return res;
	})

	getCurrentOption() {
		const options = this.props.foreignOptions && this.props.foreignOptions.values;
		return (options && options.find((option) => option.value === String(this.props.val))) || {};
	}

	onSuggestionsClearRequested = () => {
		// console.log('clear');
		// throw new Error();
	}

	render() {

		// console.log(`VAL ${this.props.val}`);
		if (!this.props.foreignOptions || !this.props.foreignOptions.values.length) return null;

		const current = this.getCurrentOption();
		// console.log(current);
		const value = (this.state.currentText !== null && this.state.currentText) || current.label || '';

		// console.log('render');
		const suggestions = this.getSuggestionsMemoized(this.state.currentUserText, this.props.foreignOptions && this.props.foreignOptions.values);
		// console.log('render with "%s" tx, %s options', value, suggestions.length);
		const inputProps = {
			placeholder: 'Click or type to see suggestions...',
			value,
			onChange: this.onChange,
			onBlur: this.onBlur,
		};

		let thumb = null;
		//il peut y avoir un thumbnail, qui provient d'un fichier direct ou de la banque
		if (current.image) {
			thumb = <FileThumbnail {...current.image} />;
		} else if (current.imageBank) {
			thumb = <BankImgThumbnail id={current.imageBank} />;
		}

		return (<div>
			<Autosuggest
				id={`${this.props.field.id}_${this.props.recordId}`}
				suggestions={suggestions}
				inputProps={inputProps}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionSelected={this.onSelect}
				renderSuggestion={renderItem}
				getSuggestionValue={getItemValue}
				focusFirstSuggestion
				shouldRenderSuggestions={shouldRenderSuggestions}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			/>
			{thumb}
		</div>);
	}
}
