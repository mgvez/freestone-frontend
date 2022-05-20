import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GridItem } from '../../styles/Grid';
import {
	StyledField,
	FieldLabel,
	FieldDescription,
	DISPLAYSIZE_SMALL,
	DISPLAYSIZE_MEDIUM,
	DISPLAYSIZE_LARGE,
} from '../../styles/Input';

const GenericFormField = (props) => {
	const fieldRef = useRef();

	useEffect(() => {
		if (props.isEmphasis && fieldRef.current) {
			fieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
			// const elementOffset = fieldRef.current.getBoundingClientRect();
			// const targetPos = elementOffset.top - document.documentElement.scrollTop;
			// window.scrollTo(0, targetPos);
		}
	}, [props.isEmphasis]);

	return (
		<GridItem columns={props.columns}>
			<StyledField displaySize={props.displaySize} ref={fieldRef}>
				{props.isDisplayLabel ? (
					<React.Fragment>
						<FieldLabel>
							<label title={props.labelTitle}>
								{props.label}
								{props.lang && <em>(<span>{props.lang}</span>)</em>}
							</label>
						</FieldLabel>
						{props.children}
						{props.description && <FieldDescription dangerouslySetInnerHTML={{ __html: props.description }} />}
						{props.descriptionAppend && <FieldDescription dangerouslySetInnerHTML={{ __html: props.descriptionAppend }} />}
					</React.Fragment>
				) : (				
					props.children
				)}
			</StyledField>
		</GridItem>
	);
};

GenericFormField.propTypes = {
	columns: PropTypes.number,
	label: PropTypes.string,
	labelTitle: PropTypes.string,
	lang: PropTypes.string,
	isDisplayLabel: PropTypes.bool,
	description: PropTypes.string,
	descriptionAppend: PropTypes.string,
	displaySize: PropTypes.oneOf([
		DISPLAYSIZE_SMALL,
		DISPLAYSIZE_MEDIUM,
		DISPLAYSIZE_LARGE,
	]),

	children: PropTypes.any,
	isEmphasis: PropTypes.bool,
};
GenericFormField.defaultProps = {
	columns: 12,
	isDisplayLabel: true,
	displaySize: DISPLAYSIZE_LARGE,
};

export default GenericFormField;
