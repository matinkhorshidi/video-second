import {staticFile} from 'remotion';
import {
	interpolate,
	spring,
	Sequence,
	AbsoluteFill,
	useCurrentFrame,
	Video,
} from 'remotion';

import {DeviderFromRight} from '../Effects/DeviderFromRight';
import {SlideUpFromDown} from '../Effects/SlideUpFromDown';
import {Transition} from '../Effects/Transition';
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
	return (
		<>
			{/* <SlideUpFromDown delay={0}> */}
			<Video
				src={staticFile(`Videos/${footages[footageSecond]}`)}
				volume={0}
				style={{
					height: '100%',
					width: '100%',
					objectFit: 'cover',
					backgroundSize: 'cover',
					// Filter: 'brightness(50%) contrast(120%)',
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

			{/* <Sequence from={20} name="Title"> */}
			<SecPartTexes texts={texts.middle_text} colors={colors} fonts={fonts} />
			<DeviderFromRight color={colors.main} />
			{/* </Sequence> */}
			{/* </SlideUpFromDown> */}
			<Transition type="in" color={colors.secondary} />
		</>
	);
};
