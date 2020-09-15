import React, { Component } from 'react';
import styled from 'styled-components';

import DocumentMeta from 'react-document-meta';
import { Heading2 } from '../styles/Texts';

import GoogleAnalytics from '../containers/dashboard/GoogleAnalytics';
import Shortcuts from '../containers/dashboard/Shortcuts';
import LatestModifs from '../containers/dashboard/LatestModifs';

const Wrapper = styled.div`
	margin: 20px;
	display: flex;
`;
const LatestModifSection = styled.section`
	margin: 0 20px 20px 0;
	width: 60%;
`;
const ShortcutsSection = styled.section`
`;


const metaData = {
	title: 'Freestone Home',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

export default class Home extends Component {

	render() {
		return (
			<Wrapper>
				<DocumentMeta {...metaData} />
				<LatestModifSection>
					<Heading2>Latest Activity</Heading2>
					<LatestModifs />
				</LatestModifSection>
				<ShortcutsSection>
					<Heading2>Shortcuts</Heading2>
					<Shortcuts />
				</ShortcutsSection>
				<GoogleAnalytics />
			</Wrapper>
		);
	}
}
