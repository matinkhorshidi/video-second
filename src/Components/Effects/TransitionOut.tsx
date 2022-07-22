import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Triangle} from '../Shapes/Triangle';

export const TransitionOut: React.FC<{
	color: string;
	delay: number;
}> = ({color, delay}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const firstFrame = videoConfig.durationInFrames - 9;

	const upAnimation = spring({
		frame: frame - delay,
		fps: 100,
	});

	const TriangleTopleft = interpolate(upAnimation, [0, 1], [0, +1080], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const TriangleBottomRight = interpolate(upAnimation, [0, 1], [0, -750]);

	return (
		<>
			{/* 👇 Transition Out */}
			{/* 👇 BottomRight Triangle */}
			<span
				style={{
					position: 'absolute',
					top: 1000,
					right: 0,
					transform: `translateY(${TriangleBottomRight}px) `,
				}}
			>
				<Triangle BottomRight color={color} size={800} />
			</span>
			{/* 👇 BottomLeft Triangle */}
			<span
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					transform: `translateY(${TriangleTopleft}px) `,
				}}
			>
				<Triangle TopLeft color={color} size={1080} />
			</span>
		</>
	);
};
