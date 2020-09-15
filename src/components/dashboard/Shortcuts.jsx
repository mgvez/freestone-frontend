import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Table from '../menu/Table';
import Module from '../menu/Module';
import Page from '../menu/Page';
import NativeModule from '../menu/NativeModule';
import { Heading2 } from '../../styles/Texts';
import { Button } from '../../styles/Button';

const Wrapper = styled.div`
	margin: 20px;
`;
const Section = styled.div`
	display: flex;
	> * {
		margin: 0 20px 0 0;
	}
`;
const Shortcuts = (props) => {
	if (!props.tables.length && !props.modules.length && !props.pages.length) return null;

	return (
		<Wrapper>
			<Section>
				{
					props.tables.map((item) => {
						return (
							<Table key={item.id} id={item.id} name={item.name} displayLabel={item.displayLabel} nrecords={item.nrecords}>
								<Button round info>
									Edit {item.displayLabel}
								</Button>
							</Table>
						);
					})
				}
			</Section>
			{
				props.modules.map((item) => {
					// console.log(item.isFrontendComponent, item);
					if (item.isFrontendComponent) {
						return <NativeModule key={`mod-${item.id}`} className="button-round" {...item} />;
					}
					return <Module key={`mod-${item.id}`} {...item} className="button-round" />;
				})
			}
			{
				props.pages.map((item) => {
					// console.log(item);
					return <Page key={`pg-${item.id}`} {...item} className="button-round" />;
				})
			}
		</Wrapper>
	);
};
Shortcuts.propTypes = {
	tables: PropTypes.array,
	modules: PropTypes.array,
	pages: PropTypes.array,
};
export default Shortcuts;
