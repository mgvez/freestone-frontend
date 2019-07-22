
import styled from 'styled-components';
import colors from './Colors';
import { lighten } from './Utils';
import cssVariables from './Variables';

export const TabsContainer = styled.nav`
	border-bottom: 1px solid ${colors.accentPrimary};
	margin: 40px 0;

	& > div {
		background: transparent;
		display: inline-block;
		vertical-align: middle;

		height: 25px;
		line-height: 25px;
		padding: 0 25px;

		border: 1px solid ${colors.accentPrimary};
		border-bottom: none;

		color: ${colors.accentPrimary};
		cursor: pointer;

		border-radius: 5px 5px 0 0;

		transition: background 0.3s, color 0.3s;

		& + div {
			margin-left: 10px;
		}

		&:hover, &.active {
			color: ${colors.white};
			background-color: ${colors.accentPrimary};
			text-decoration: none;
		}
	}
`;


export const NavGroup = styled.li `
	border-top: 1px solid ${colors.borderDark};
	overflow: hidden;
	a {
		color: ${colors.white};
		&:hover, &:active {

		}
	}
`;

export const Subnav = styled.ul `
	border-left: 2px solid ${colors.accentPrimary};
	background: ${lighten(colors.backgroundDark, 0.12)};
	transition: background 0.3s;
`;

export const GroupHeading = styled.a `
	display: flex;
	align-items: center;
	padding: 10px 15px;
	position: relative;

	cursor: pointer;
	transition: background 0.3s;


	.fa + .nav-label {
		margin-left: 10px;
	}

	.nav-label + .fa {
		margin-left: auto;
		position: relative;
		transition: transform 0.3s;
	}

	&:hover {
		background: ${lighten(colors.backgroundDark, 0.05)};
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

export const NavItem = styled.li`
	padding: 0;
	border-top: 1px solid rgba(0,0,0,.1);

	a {
		display: block;
		position: relative;
		padding: 10px 50px 10px 15px;
		transition: background 0.3s;
		border-left: 2px solid ${colors.accentPrimary};
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

export const Sidebar = styled.div`
	padding: 30px;
	background: ${colors.backgroundDark};
	color: ${colors.textSecondary};

	textarea,
	input[type="text"],
	input[type="search"],
	input[type="password"],
	input[type="email"],
	input[role="combobox"] {
		color: ${colors.textPrimary};
	}

	label {
		color: ${colors.textSecondary};
	}

	ul li {
		color: ${colors.textPrimary};

		&:hover, &:focus {
			color: ${colors.textSecondary};
		}
	}
`;
