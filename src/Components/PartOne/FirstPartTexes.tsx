import {
	interpolate,
	spring,
	Sequence,
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

import styled from 'styled-components';
import {OfferCircle} from '../Shapes/OfferCircle';
import {Subtitle} from '../Texts/Subtitle';
import {Title} from '../Texts/Title';

interface FirstPartTexesProps {
	texts: string[];
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

export const FirstPartTexes: React.FC<FirstPartTexesProps> = ({
	texts,
	colors,
	fonts,
}) => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();

	const progress = spring({
		frame: frame - 10,
		fps,
		config: {
			damping: 200,
		},
	});
	const scale = interpolate(progress, [0, 1], [0, 1]);

	const UPSTART = 60;
	const upAnimation = spring({
		frame: frame - UPSTART,
		fps,
		config: {
			damping: 200,
		},
	});
	const contentTranslation = interpolate(upAnimation, [0, 1], [0, -100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<>
			<Sequence from={20} name="Title">
				<span style={{position: 'absolute', top: 300, width: '100%'}}>
					<Title texts={texts} colors={colors} font={fonts.main_font} />
				</span>
			</Sequence>
			<Sequence from={50} name="Title">
				<Subtitle texts={texts} colors={colors} font={fonts.main_font} />
			</Sequence>
			<Sequence from={50} name="Title">
				<OfferCircle />
			</Sequence>
		</>
	);
};
