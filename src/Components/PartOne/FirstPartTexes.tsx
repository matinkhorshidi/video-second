import {Sequence} from 'remotion';

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
			<Sequence from={65} name="Title">
				<span
					style={{
						position: 'absolute',
						right: 220,
						top: 850,
					}}
				>
					<OfferCircle
						text={texts[4]}
						color={colors.main}
						font={fonts.main_font}
					/>
				</span>
			</Sequence>
		</>
	);
};
