import {useCurrentFrame, interpolate, spring} from 'remotion';
import styled from 'styled-components';

import {AbsoluteFill, useVideoConfig} from 'remotion';

interface OfferCircleProps {
	text: string;
	color: string;
	font: string[];
	backColor?: string;
	[key: string]: any; // 👈️ allows dynamic keys and values}
}
export const OfferCircle: React.FC<OfferCircleProps> = ({
	text,
	color,
	font,
	backColor,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		frame: frame - 10,
		fps,
		config: {
			damping: 200,
		},
	});
	const scale = interpolate(progress, [0, 1], [0, 1]);

	return (
		<>
			<Circle
				style={{
					opacity: progress,
					transform: `scale(${scale}) `,
				}}
			>
				<AbsoluteFill
					style={{
						backgroundColor: backColor ? backColor : 'rgb(0,0,0,0.8)',
					}}
				/>
				<div
					style={{
						fontSize: 50,
						fontWeight: 'Bold',
						textAlign: 'center',
						position: 'inherit',
						width: 200,
						padding: 40,
						color,
						fontFamily: font[0],
					}}
				>
					<div style={{marginTop: -10}}>{text} % </div>
					<div style={{marginTop: -40}}>OFF</div>
				</div>
			</Circle>
		</>
	);
};

const CIRCLE_SIZE = 200;
const Circle = styled.div`
	width: ${CIRCLE_SIZE}px;
	height: ${CIRCLE_SIZE}px;
	border-radius: ${CIRCLE_SIZE / 2}px;
	position: absolute;
	overflow: hidden;
`;
