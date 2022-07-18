import {
	interpolate,
	spring,
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface IntroProps {
	children?: JSX.Element | JSX.Element[];
	color: string;
	[key: string]: any; // 👈️ allows dynamic keys and values
}

export const Intro: React.FC<IntroProps> = (props) => {
	const frame = useCurrentFrame();
	const {height, fps} = useVideoConfig();
	const LineHeight = 200;

	const upAnimation = spring({
		frame,
		fps,
		config: {
			damping: 200,
		},
	});

	const contentTranslationT = interpolate(upAnimation, [0, 1], [0, -650], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const contentTranslationD = interpolate(upAnimation, [0, 1], [0, +650], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<>
			{props.children}
			<AbsoluteFill
				style={{
					background: '#000',
					width: 720,
					height: height / 2,
					top: 0,
					transform: `translateY(${contentTranslationT}px)`,
				}}
			/>
			<AbsoluteFill
				style={{
					background: '#000',
					width: 720,
					height: '540',
					top: height / 2,
					transform: `translateY(${contentTranslationD}px)`,
				}}
			/>
			<AbsoluteFill
				style={{
					height: LineHeight,
					width: 720,
					backgroundColor: props.color,
					top: height / 2 - LineHeight / 2,
					transform: `translateY(${contentTranslationT}px)`,
					overflow: 'hidden',
				}}
			/>
			<AbsoluteFill
				style={{
					height: LineHeight,
					width: 720,
					backgroundColor: props.color,
					top: height / 2 - LineHeight / 2,
					transform: `translateY(${contentTranslationD}px)`,
					overflow: 'hidden',
				}}
			/>
		</>
	);
};
