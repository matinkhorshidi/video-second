import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface SlideFromRightProps {
	children?: JSX.Element | JSX.Element[];
	[key: string]: any; // 👈️ allows dynamic keys and values
}

export const SlideFromRight: React.FC<SlideFromRightProps> = (props) => {
	const frame = useCurrentFrame();
	const {height, fps} = useVideoConfig();

	const deviderAnimation = spring({
		frame,
		fps,
		config: {
			damping: 200,
		},
	});

	const contentTranslationDevider = interpolate(
		deviderAnimation,
		[0, 1],
		[0, -720]
	);
	return (
		<>
			<span
				style={{
					position: 'absolute',
					background: props.color,
					width: 720,
					height,
					right: -720,
					transform: `translateX(${contentTranslationDevider}px)`,
				}}
			>
				{props.children}
			</span>
		</>
	);
};
