import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {SlideUpFromDown} from '../Effects/SlideUpFromDown';
import {SlideUpFromTop} from '../Effects/SlideUpFromTop';

interface SecPartTexesProps {
	texts: {
		main: string;
		secondary: string;
		last: string;
		details: string;
		button_text: string;
	}[];
	colors: {
		main: string;
		secondary: string;
		third: string;
		main_text: string;
		secondary_text: string;
	};
	fonts: {main_font: string[]; secondary_font: string[]};
	[key: string]: any; // 👈️ allows dynamic keys and values
}

export const SecPartTexes: React.FC<SecPartTexesProps> = ({
	texts,
	colors,
	fonts,
}) => {
	const frame = useCurrentFrame();
	const {height, fps} = useVideoConfig();
	const opacity = interpolate(frame, [0, 30], [0, 1]);
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
			<SlideUpFromTop delay={0}>
				<AbsoluteFill
					style={{
						width: 300,
						height: 500,
						position: 'absolute',
						top: 0,
						left: 200,
						backgroundColor: colors.main + 'b0',
					}}
				>
					<div
						style={{
							color: colors.main_text,
							fontSize: 80,
							textAlign: 'center',
							position: 'inherit',
							width: 310,
							padding: 10,
							fontFamily: fonts.main_font[0],
						}}
					>
						<div>{texts[0].main}</div>
						<div>{texts[0].secondary}</div>
						<div>{texts[0].last}</div>
					</div>
				</AbsoluteFill>
			</SlideUpFromTop>
			<span
				style={{
					fontSize: 50,
					fontWeight: 100,
					textAlign: 'center',
					position: 'absolute',
					top: 700,
					left: 90,
					opacity,
					color: colors.secondary_text,
					fontFamily: fonts.main_font[0],
				}}
			>
				<div
					style={{
						fontSize: 25,
						fontWeight: 100,
						textAlign: 'center',
						position: 'inherit',
						width: 540,
						padding: 10,
						opacity,
						fontFamily: fonts.main_font[0],
						backgroundColor: colors.secondary + 'b0',
					}}
				>
					{texts[0].details}
				</div>
			</span>
		</>
	);
};