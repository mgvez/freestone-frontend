import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DocumentMeta from 'react-document-meta';
import GlobalStyles from '../../styles/GlobalStyles';
import { Button } from '../../styles/Button';
import { Heading1, Heading2, Heading3, Paragraph, Label, unorderedLists } from '../../styles/Texts';
import colors from '../../styles/Colors';
import { GridContainer, GridItem } from '../../styles/Grid';
import Errors from '../../containers/Errors';
import { getAdminUrl } from '../../freestone/api';

const metaData = {
	title: 'Freestone',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

const Logo = styled.div`
	width: 100%;
	height: 400px;
	max-height: 66vh;
	background: ${colors.accentSecondary} url(./assets/img/freestone-logo.png) center center no-repeat;
	background-size: auto 295px;
`;

const MainZone = styled.div`
	background: ${colors.backgroundMain};
	padding: 60px;

	form {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.btns {
			margin-top: 20px;
			display: flex;
			justify-content: space-between;
		}

		.checkbox-container {
			align-self: flex-start;
		}
	}
`;


const ReleaseNotes = styled.div`
	background: ${colors.backgroundMain};
	border-radius: 5px;
	border: 1px ${colors.borderMedium} solid;
	padding: 10px;
`;

const ReleaseVersion = styled.div`
	border-bottom: 1px ${colors.borderMedium} solid;
	padding: 10px 0;

	.date {
		font-size: 0.6em;
	}

	ul {
		padding: 10px 0;
		${unorderedLists}
	}

	em {
		font-style: italic;
	}
	strong {
		font-weight: bold;
	}
`;

const IFrame = styled.iframe`
	overflow: scroll;
	height: 800px;
	width: 100%;
	border: 1px ${colors.borderMedium} solid;
`;

export default class UpdateFreestone extends Component {
	static propTypes = {
		latestVersion: PropTypes.string,
		clientVersion: PropTypes.string,
		releaseNotes: PropTypes.array,
		jwt: PropTypes.string,

		clearData: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			updating: false,
			finished: false,
		};
	}

	startUpdate = () => {
		this.setState({
			updating: true,
		});
		// this.props.updateFreestone();
	}


	updateFinished = () => {
		this.setState({
			finished: true,
		});
	}

	render() {

		// <iframe src="dummy.html" name="dummy" style={{ display: 'none' }}></iframe>
		const url = getAdminUrl() + `updateFreestone?jwt=${this.props.jwt}`;
		// console.log(this.props.releaseNotes);
		const finishButton = this.state.finished ? <Button primary="true" onClick={this.props.clearData}>Update finished, click to refresh</Button> : null;

		const contents = !this.state.updating ? (
			<GridContainer>
				<GridItem columns="12">
					<Heading1>Freestone needs to be updated.</Heading1>
					<Paragraph>
						Database is at <Label>{this.props.clientVersion}</Label> will be updated to match backend code at <Label>{this.props.latestVersion}</Label>
					</Paragraph>
					
					<ReleaseNotes>
						<Heading2>Release notes</Heading2>
						{this.props.releaseNotes.map(versionNotes => {
							return (
								<ReleaseVersion key={versionNotes.version}>
									<Heading3>{versionNotes.version} <em className="date">{versionNotes.date}</em></Heading3>
									<ul>
									{versionNotes.log.map((note, index) => {
										return <li key={index} dangerouslySetInnerHTML={{ __html: note }} />;
									})}
									</ul>
								</ReleaseVersion>
							);
						})}
					</ReleaseNotes>
				</GridItem>
				<GridItem columns="12">
					<Paragraph>
						Please backup database manually and click button to start update.
					</Paragraph>
					<Button danger="true" onClick={this.startUpdate}>Start update</Button>
				</GridItem>
			</GridContainer>
		) : (
			<div>
				<Heading1>Updating Freestone, please be patient.</Heading1>
				<p>{finishButton}</p>
				<IFrame src={url} onLoad={this.updateFinished} />
			</div>
		);

		return (
			<section>
				<Errors />
				<DocumentMeta {...metaData} />
				<GlobalStyles />
				<Logo />
				<MainZone>
					<GridContainer>
						<GridItem columns="4" offset="5">
							{contents}
						</GridItem>
					</GridContainer>
				</MainZone>
			</section>
		);
	}
}
