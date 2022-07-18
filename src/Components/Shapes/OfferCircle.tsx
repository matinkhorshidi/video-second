import {interpolate} from 'remotion';
import {spring} from 'remotion';
import {useCurrentFrame} from 'remotion';
import styled from 'styled-components';
import {useState} from 'react';
import {Video} from 'remotion';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {SlideUpFromDown} from '../Effects/SlideUpFromDown';

interface OfferCircleProps {}

export const OfferCircle: React.FC<OfferCircleProps> = () => {
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
					left: width / 2 - CIRCLE_SIZE / 2,
					top: height / 2 - CIRCLE_SIZE / 2,
					opacity: progress,
					transform: `scale(${scale}) translateY(${contentTranslation}px)`,
				}}
			>
				<AbsoluteFill
					style={{
						backgroundColor: 'rgb(0,0,0,0.7)',
					}}
				/>
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
