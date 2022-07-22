import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Triangle} from '../Shapes/Triangle';

export const Transition: React.FC<{
	type: 'in' | 'out';
	color: string;
}> = ({type, color}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const firstFrame = videoConfig.durationInFrames - 9;

	const UPSTART = 10;

	const upAnimation = spring({
		// Fps: videoConfig.fps,
		fps: videoConfig.fps + 100,
		// Frame: type === 'in' ? frame : Math.max(0, frame - firstFrame),
		frame,
		config: {
			damping: 80,
		},
	});

	const TriangleTopleft = interpolate(
		upAnimation,
		[0, 1],
		type === 'in' ? [0, -1080] : [-1080, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);
	const TriangleBottomRight = interpolate(
		upAnimation,
		[0, 1],
		type === 'in' ? [0, 140] : [140, 0]
	);

	return (
		<>
			<span
				style={{
					position: 'absolute',
					top: 300,
					right: 0,
					transform: `translateX(${
						type === 'in' ? TriangleBottomRight : 0 - TriangleBottomRight
					}%)
          translateY(${TriangleBottomRight}px) `,
				}}
			>
				<Triangle BottomRight color={color} size={800} />
			</span>
			<span
				style={{
					position: 'absolute',
					top: 1080,
					left: 0,
					transform: `translateY(${TriangleTopleft}px) translateX(${TriangleTopleft}px)`,
				}}
			>
				<Triangle TopLeft color={color} size={1080} />
			</span>
		</>
	);
};
