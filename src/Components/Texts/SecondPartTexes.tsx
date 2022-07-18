import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {SlideUpFromDown} from '../Effects/SlideUpFromDown';

interface SecondPartTexesProps {
	texts: {main: string; secondary: string; last: string; button_text: string};
	textColors: {main: string; main_text: string};
	fonts: {main_font: string[]; secondary_font: string[]; simple_font: string[]};
	[key: string]: any; // 👈️ allows dynamic keys and values
}

export const SecondPartTexes: React.FC<SecondPartTexesProps> = ({
	texts,
	textColors,
	fonts,
}) => {
	const frame = useCurrentFrame();
	const {height, fps} = useVideoConfig();

	const LATESTART = 40;

	const FromXAnimation = spring({
		frame: frame - LATESTART,
		fps,
		config: {
			damping: 200,
		},
	});
	const contentTranslationFromRight = interpolate(
		FromXAnimation,
		[0, 1],
		[0, -250],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);
	const contentTranslationFromLeft = interpolate(
		FromXAnimation,
		[0, 1],
		[0, 750],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<>
			<SlideUpFromDown delay={0}>
				<span
					style={{
						fontSize: 70,
						textAlign: 'center',
						position: 'absolute',
						top: height / 2 + 80,
						left: 50,
						color: textColors.main_text,
						fontFamily: fonts.secondary_font[0],
						fontWeight: 'bold',
					}}
				>
					{texts.main}
				</span>
				<span
					style={{
						fontSize: 150,
						textAlign: 'center',
						position: 'absolute',
						top: height / 2 + 100,
						width: '100%',
						color: textColors.main,
						fontFamily: fonts.main_font[0],
						fontWeight: 'bold',
					}}
				>
					{texts.secondary}
				</span>
				<span
					style={{
						fontSize: 70,
						textAlign: 'center',
						position: 'absolute',
						top: height / 1.5 + 100,
						right: 50,
						color: textColors.main_text,
						fontFamily: fonts.secondary_font[0],
						fontWeight: 'bold',
					}}
				>
					{texts.last}
				</span>
			</SlideUpFromDown>
			<AbsoluteFill
				style={{
					width: 300,
					height: 100,
					position: 'absolute',
					top: 75,
					left: -300,
					backgroundColor: textColors.main,
					transform: `translateX(${contentTranslationFromLeft}px)`,
				}}
			/>
			<span
				style={{
					fontSize: 50,
					textAlign: 'center',
					position: 'absolute',
					top: 95,
					right: -200,
					color: textColors.main_text,
					fontFamily: fonts.secondary_font[0],
					fontWeight: 'bold',
					transform: `translateX(${contentTranslationFromRight}px)`,
				}}
			>
				{texts.button_text}
			</span>
		</>
	);
};
