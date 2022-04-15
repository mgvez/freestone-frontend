import styled from 'styled-components';
import colors from './Colors';

export const ErrorCtn = styled.div`
	padding-bottom: 15px;
	position: relative;
	max-height: 80vh;
	max-width: 50vw;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	box-shadow: 0px 0px 65px -26px rgb(0 0 0 / 50%);
	overflow: hidden;
`;

export const ErrorContent = styled.div`
	width: 100%;


	& > *:last-child > p:last-child {
		margin-bottom: 0;
	}

	pre {
		max-height: 20vh;
		max-width: 100%;
		overflow: scroll;
	}
`;

export const ActionsCtn = styled.div`
	margin-top: 1em;
	padding: 1em 15px 15px 15px;
	border-top: 1px solid ${colors.borderDark};
`;

export const SingleErrorCtn = styled.div`
	padding-left: 15px;
	padding-right: 15px;
`;

export const ErrorMessage = styled.p`
	margin: 1em 0;
`;

export const ContactAdminMessage = styled.p`
	margin: 1em 0 0 0;
	padding: 0 15px;
`;

export const ErrorDetailsCtn = styled.div`
	margin-bottom: 1em;
	padding: 0 15px;
`;

export const ErrorHeading = styled.div`
	padding: 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${colors.backgroundDark};
	color: ${colors.white};

	h4 {
		display: flex;
		margin: 0;
		align-items: center;
		text-transform: uppercase;
	}
`;

export const closeBtn = {
	marginLeft: '60px',
};

export const errorIcon = {
	marginRight: '10px',
	fontSize: '2em',
};

