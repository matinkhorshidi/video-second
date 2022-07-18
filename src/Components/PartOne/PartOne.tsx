import {Video} from 'remotion';
import {
	interpolate,
	spring,
	Sequence,
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

import styled from 'styled-components';
import {Triangle} from '../Shapes/Triangle';
import {FirstPartTexes} from './FirstPartTexes';

interface PartOneProps {
	footages: string[];
	footageFirst: number;
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

export const PartOne: React.FC<PartOneProps> = ({
	footages,
	footageFirst,
	colors,
	texts,
	fonts,
}) => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();

	const UPSTART = 10;

	const upAnimation = spring({
		frame: frame - UPSTART,
		fps: 100,
		// Config: {
		// 	damping: 200,
		// },
	});
	const downAnimation = spring({
		frame: frame - UPSTART,
		fps,
		// Config: {
		// 	damping: 200,
		// },
	});
	const TriangleTopleft = interpolate(upAnimation, [0, 1], [0, -1080], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const TriangleBottomRight = interpolate(upAnimation, [0, 1], [0, 140]);

	return (
		<>
			<AbsoluteFill
				style={{
					backgroundColor: colors.secondary,
					width: 720,
					height: 1080,
				}}
			/>
			<Video
				src={require(`../../input_data/Videos/${footages[footageFirst]}`)}
				volume={0}
				style={{
					height: '100%',
					width: '100%',
					objectFit: 'cover',
					backgroundSize: 'cover',
					filter: 'brightness(50%) contrast(120%)',
					padding: 30,
				}}
			/>
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
				<FirstPartTexes
					texts={texts.start_text}
					colors={colors}
					fonts={fonts}
				/>
			</Sequence>
		</>
	);
};