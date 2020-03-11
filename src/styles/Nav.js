
import styled from 'styled-components';
import colors from './Colors';
import { lighten } from './Utils';
import cssVariables from './Variables';

export const NavGroup = styled.li `
	/* border-top: 1px solid ${colors.borderDark}; */
	overflow: hidden;
	
`;

export const Subnav = styled.ul `
	border-left: 3px solid ${colors.accentPrimary};
	transition: background 0.3s;
	/* border-top: 1px ${colors.borderDark} solid; */

`;

export const GroupHeading = styled.a `
	display: flex;
	align-items: center;
	padding: 10px 15px;
	position: relative;

	cursor: pointer;
	transition: background 0.3s;
	
	text-transform: uppercase;
	font-size: 0.8em;

	&.level0 {
		font-weight:bold;
		background: ${colors.backgroundDark};
		color: rgba(255, 255, 255, 0.7);
		padding: 15px;

		.icon:first-child {
			color: ${colors.white}
		}
	}

	&.level1 {
		background: ${colors.navFirstLevelBackground};
		color: ${colors.backgroundDark};
	}

	

	.fa + .nav-label {
		margin-left: 10px;

	}

	.nav-label + .fa {
		margin-left: auto;
		position: relative;
		transition: transform 0.3s;
	}

	&:hover {
		background: ${lighten(colors.backgroundDark, 0.25)};
		color: white;
		/* &.level0 {
			background: ${lighten(colors.backgroundDark, 0.15)};
		} */
	} 
	&.active {
		.nav-label + .fa {
			transform: rotate(180deg);
		}
	}
`;

export const NavbarContainer = styled.nav`
	background: ${colors.backgroundDark};
	color: ${colors.textSecondary};
	position: fixed;
		top: 0;
		left: 0;
	z-index: 10;

	width: ${cssVariables.navWidth}px;
	height: 100vh;
	overflow-y: scroll;
	::-webkit-scrollbar { 
		display: none; 
	}
	padding-bottom: 50px;
	transition: transform 0.3s;

	&.collapsed {
		transform: translate(-100%, 0);
	}

	ul {
		padding: 0;
		
		li {
			list-style-type: none;
		}
	}
`;

const itemBorderCol = lighten(colors.backgroundDark, 0.6);

 
export const NavItem = styled.li`
	padding: 0;

	/* border-top: 1px solid ${itemBorderCol}; */

	a {
		display: block;
		position: relative;
		padding: 10px 50px 10px 25px;
		transition: background 0.3s;
		/* border-left: 3px solid ${colors.accentPrimary}; */
		font-size: 12px;
		line-height: 1.3em;
		background: ${colors.navLinkBackground};

		color: ${colors.backgroundDark};
		text-decoration: none;

		.nrecords, .flag {
			display: block;
			text-align: center;
			position: absolute;
				top: 0;
				right: 0;

			width: 40px;
			height: 100%;
			opacity: 0.5;

			font-size: 0.8em;

			span {
				position: absolute;
					top: 50%;
					left: 0;
				width: 100%;
				transform: translate(0, -50%);

				&.info {

				}
				&.success {
					color: ${colors.accentPrimary};
				}
			}
		}

		&:hover, &:active, &.active {
			background: ${colors.navLinkHoverBackground};
		}
	}
`;
