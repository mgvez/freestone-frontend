
import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/Colors';

const SIZE = 80;
const HALF = SIZE / 2;
const DOT_SIZE = 6;

const getRelativeSize = p => (p / 80) * SIZE;

const Spinner = styled.div`
	display: block;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-right: -${HALF}px;
	margin-top: -${HALF}px;
	width: ${SIZE}px;
	height: ${SIZE}px;
	opacity: 0.5;

	div {
		animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		transform-origin: ${HALF}px ${HALF}px;
	}
	div:after {
		content: " ";
		display: block;
		position: absolute;
		width: ${DOT_SIZE}px;
		height: ${DOT_SIZE}px;
		border-radius: 50%;
		background: ${colors.accentSecondary};
		margin: -${DOT_SIZE / 2}px 0 0 -${DOT_SIZE / 2}px;
	}
	div:nth-child(1) {
		animation-delay: -0.036s;
	}
	div:nth-child(1):after {
		top: ${getRelativeSize(63)}px;
		left: ${getRelativeSize(63)}px;
	}
	div:nth-child(2) {
		animation-delay: -0.072s;
	}
	div:nth-child(2):after {
		top: ${getRelativeSize(68)}px;
		left: ${getRelativeSize(56)}px;
	}
	div:nth-child(3) {
		animation-delay: -0.108s;
	}
	div:nth-child(3):after {
		top: ${getRelativeSize(71)}px;
		left: ${getRelativeSize(48)}px;
	}
	div:nth-child(4) {
		animation-delay: -0.144s;
	}
	div:nth-child(4):after {
		top: ${getRelativeSize(72)}px;
		left: ${getRelativeSize(40)}px;
	}
	div:nth-child(5) {
		animation-delay: -0.18s;
	}
	div:nth-child(5):after {
		top: ${getRelativeSize(71)}px;
		left: ${getRelativeSize(32)}px;
	}
	div:nth-child(6) {
		animation-delay: -0.216s;
	}
	div:nth-child(6):after {
		top: ${getRelativeSize(68)}px;
		left: ${getRelativeSize(24)}px;
	}
	div:nth-child(7) {
		animation-delay: -0.252s;
	}
	div:nth-child(7):after {
		top: ${getRelativeSize(63)}px;
		left: ${getRelativeSize(17)}px;
	}
	div:nth-child(8) {
		animation-delay: -0.288s;
	}
	div:nth-child(8):after {
		top: ${getRelativeSize(56)}px;
		left: ${getRelativeSize(12)}px;
	}
	@keyframes lds-roller {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export function Preloader() {
	return (

		<Spinner>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</Spinner>

	);
}
