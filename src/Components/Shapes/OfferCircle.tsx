import {interpolate} from 'remotion';
import {spring} from 'remotion';
import {useCurrentFrame} from 'remotion';
import styled from 'styled-components';
import {useState} from 'react';
import {Video} from 'remotion';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {SlideUpFromDown} from '../Effects/SlideUpFromDown';

interface OfferCircleProps {
	texts: string[];
	colors: {
		main: string;
		secondary: string;
		third: string;
		main_text: string;
		secondary_text: string;
	};
	font: string[];
	[key: string]: any; // 👈️ allows dynamic keys and values}
}
export const OfferCircle: React.FC<OfferCircleProps> = ({
	texts,
	colors,
	font,
}) => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();

	const progress = spring({
		frame: frame - 10,
		fps,
		config: {
			damping: 200,
		},
	});
	const scale = interpolate(progress, [0, 1], [0, 1]);

	const UPSTART = 60;
	const upAnimation = spring({
		frame: frame - UPSTART,
		fps,
		config: {
			damping: 200,
		},
	});
	const contentTranslation = interpolate(upAnimation, [0, 1], [0, -100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

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
						backgroundColor: 'rgb(0,0,0,0.8)',
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
						color: colors.main_text,
						fontFamily: font[0],
					}}
				>
					<div style={{marginTop: -10}}>{texts[4]} % </div>
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
