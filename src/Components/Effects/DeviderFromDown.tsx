import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface IntroProps {
	children?: JSX.Element | JSX.Element[];
	color: string;
	[key: string]: any; // 👈️ allows dynamic keys and values
}

export const DeviderFromDown: React.FC<IntroProps> = ({color}) => {
	const frame = useCurrentFrame();
	const {height, fps} = useVideoConfig();

	const deviderAnimation = spring({
		frame: frame - 50,
		fps,
		config: {
			damping: 200,
		},
	});

	const contentTranslationDevider = interpolate(
		deviderAnimation,
		[0, 1],
		[0, -1080]
	);
	return (
		<>
			<span
				style={{
					position: 'absolute',
					background: color,
					width: 720,
					height,
					bottom: -1080,
					transform: `translateY(${contentTranslationDevider}px)`,
				}}
			/>
		</>
	);
};
