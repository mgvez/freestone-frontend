
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { THUMBNAIL_SIZE } from '../../../freestone/settings';

const FileInfosStyle = styled.div`
	font-style: italic;
	display: flex;
	margin-right: 10px;
	font-size: 0.8em;
	width: 100%;

	.thumbnail {
		max-width: ${THUMBNAIL_SIZE}px;
		margin-right: 20px;
	}

	a {
		display: block;
		margin-bottom: 5px;
	}

	.sizeInfos {
		margin: 6px 0;
	}
	.warning {
		max-width: ${THUMBNAIL_SIZE}px;
	}
`;
const FileInfos = (props) => {

	return (
		<FileInfosStyle>
			<div className="thumbnail">
				{props.thumbnail}
				{props.displayVal}
				{props.sizeInfos}
			</div>
			<div className="warning">
				{props.warnings}
			</div>
		</FileInfosStyle>
	);
};


FileInfos.propTypes = {
	thumbnail: PropTypes.element,
	displayVal: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	sizeInfos: PropTypes.element,
	warnings: PropTypes.arrayOf(PropTypes.element),
};

export default FileInfos;
