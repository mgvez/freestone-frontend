import React from 'react';
import PropTypes from 'prop-types';
import { WarningMessage } from '../../styles/Texts';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		console.log('Error caught by boundary', this.props.label);
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <WarningMessage>Something went wrong with <strong>{this.props.label}</strong>, see console.</WarningMessage>;
		}

		return this.props.children; 
	}
}

ErrorBoundary.propTypes = {
	label: PropTypes.string,
	children: PropTypes.any,
};
ErrorBoundary.defaultProps = {
	label: 'unknown',
	children: null,
};

export default ErrorBoundary;
