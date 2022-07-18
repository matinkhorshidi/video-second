import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface IntroProps {
	children?: JSX.Element | JSX.Element[];
	color: string;
	[key: string]: any; // 👈️ allows dynamic keys and values
}

export const DeviderFromRight: React.FC<IntroProps> = ({color}) => {
	const frame = useCurrentFrame();
	const {height, fps} = useVideoConfig();

	const deviderAnimation = spring({
		frame: frame - 150,
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
					background: color,
					width: 720,
					height,
					right: -720,
					transform: `translateX(${contentTranslationDevider}px)`,
				}}
			/>
		</>
	);
};
