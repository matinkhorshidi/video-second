import {
	interpolate,
	spring,
	Sequence,
	AbsoluteFill,
	useCurrentFrame,
	Video,
} from 'remotion';

import {DeviderFromRight} from '../Effects/DeviderFromRight';
import {Triangle} from '../Shapes/Triangle';
import {SecPartTexes} from './SecPartTexes';

interface PartTwoProps {
	footages: string[];
	footageSecond: number;
	colors: {
		main: string;
		secondary: string;
		third: string;
		main_text: string;
		secondary_text: string;
	};
	texts: {
		start_text: string[];
		middle_text: {
			main: string;
			secondary: string;
			details: string;
			last: string;
			button_text: string;
		}[];
		end_text: string[];
	};
	fonts: {
		main_font: string[];
		secondary_font: string[];
		simple_font: string[];
	};
	[key: string]: any; // 👈️ allows dynamic keys and values
}

export const PartTwo: React.FC<PartTwoProps> = ({
	footages,
	footageSecond,
	colors,
	texts,
	fonts,
}) => {
	const frame = useCurrentFrame();

	const UPSTART = 10;

	const upAnimation = spring({
		frame: frame - UPSTART,
		fps: 100,
	});

	const TriangleTopleft = interpolate(upAnimation, [0, 1], [0, -1080], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const TriangleBottomRight = interpolate(upAnimation, [0, 1], [0, 2000]);

	return (
		<>
			<Video
				src={require(`../../input_data/Videos/${footages[footageSecond]}`)}
				volume={0}
				style={{
					height: '100%',
					width: '100%',
					objectFit: 'cover',
					backgroundSize: 'cover',
					filter: 'brightness(50%) contrast(120%)',
				}}
			/>
			<AbsoluteFill
				style={{
					width: 720,
					height: 1080,
				}}
			>
				<AbsoluteFill
					style={{
						border: `solid 6px ${colors.secondary}`,
						width: '90%',
						height: '95%',
						position: 'absolute',
						top: 20,
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					<AbsoluteFill
						style={{
							border: `solid 6px ${colors.secondary}`,
							width: '90%',
							height: '90%',
							position: 'absolute',
							top: 50,
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					/>
				</AbsoluteFill>
			</AbsoluteFill>
			<span
				style={{
					position: 'absolute',
					top: 500,
					right: 0,
					transform: `translateY(${TriangleBottomRight}px) translateX(${TriangleBottomRight}px)`,
				}}
			>
				<Triangle BottomRight color={colors.secondary} size={800} />
			</span>
			<span
				style={{
					position: 'absolute',
					top: 1080,
					left: 0,
					transform: `translateY(${TriangleTopleft}px) translateX(${TriangleTopleft}px)`,
				}}
			>
				<Triangle TopLeft color={colors.secondary} size={1080} />
			</span>
			<Sequence from={20} name="Title">
				<SecPartTexes texts={texts.middle_text} colors={colors} fonts={fonts} />
				<DeviderFromRight color={colors.main} />
			</Sequence>
		</>
	);
};
