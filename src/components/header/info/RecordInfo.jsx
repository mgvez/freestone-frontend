import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ProdEnvWarning from '../../widgets/ProdEnvWarning';
import AnimatedHeight from '../../animation/AnimatedHeight';

export default function RecordInfo(props) {
	useEffect(() => {
		if (props.slugs === undefined) {
			props.fetchSlug(props.tableId, props.recordId);
		}
	});
	

	const { 
		lastmodifdate,
		slugs,
		isLight,
		isProdEnv,
		children,
	} = props;

	
	const lastModif = lastmodifdate ? <div className="last-modif-date">Last modification : {lastmodifdate}</div> : null;

	const renderedSlugs = slugs && slugs.length ? (
		<div>
			<h4>Links</h4>
			{slugs.map(slugDef => {
				return <div key={`slug-${slugDef.lang}`} className="permalinks"><span>{slugDef.lang}</span> <a href={slugDef.slug} target="_blank">{slugDef.slug}</a></div>;
			})}
		</div>
	) : null;
	

	return (
		<React.Fragment>
			<AnimatedHeight isOpen={!isLight}>
				{children}
				{lastModif}
			</AnimatedHeight>
			{isProdEnv && <ProdEnvWarning />}
			{renderedSlugs}
		</React.Fragment>
	);
}

RecordInfo.propTypes = {
	slugs: PropTypes.array,
	recordId: PropTypes.string,
	tableId: PropTypes.number,
	lastmodifdate: PropTypes.string,
	isLight: PropTypes.bool,
	isProdEnv: PropTypes.bool,
	children: PropTypes.any,

	fetchSlug: PropTypes.func,
};
