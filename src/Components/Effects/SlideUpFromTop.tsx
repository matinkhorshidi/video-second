import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface SlideUpFromTopProps {
	children?: JSX.Element | JSX.Element[];
	delay: number;
	[key: string]: any; // 👈️ allows dynamic keys and values
}

export const SlideUpFromTop: React.FC<SlideUpFromTopProps> = (props) => {
	const frame = useCurrentFrame();
	const {height, fps} = useVideoConfig();

	const deviderAnimation = spring({
		frame: frame - props.delay,
		fps,
		config: {
			damping: 200,
		},
	});

	const contentTranslationDevider = interpolate(
		deviderAnimation,
		[0, 1],
		[0, 1080]
	);
	return (
		<>
			<span
				style={{
					position: 'absolute',
					background: props.color,
					width: 720,
					height,
					top: -1080,
					transform: `translateY(${contentTranslationDevider}px)`,
				}}
			>
				{props.children}
			</span>
		</>
	);
};
