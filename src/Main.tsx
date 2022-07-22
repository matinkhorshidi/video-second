import {AbsoluteFill, Sequence, Audio} from 'remotion';
import './input_data/Fonts/font.css';

import {SlideUpFromDown} from './Components/Effects/SlideUpFromDown';
import {SlideFromRight} from './Components/Effects/SlideFromRight';
import {Logo} from './Components/ContactUs/Logo';
import {ContactUs} from './Components/ContactUs/ContactUs';
import logoZebra from './input_data/logo_zebra_trans.png';
import {PartOne} from './Components/PartOne/PartOne';
import {PartTwo} from './Components/PartTwo/PartTwo';
import audio from './input_data/Sounds/ES_Havana - BLUE STEEL.mp3';

interface MainProps {
	footages: string[];
	footageFirst: number;
	footageSecond: number;
	footageLast: number;
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
			details: string;
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

export const Main: React.FC<MainProps> = ({
	footages,
	footageFirst,
	footageSecond,
	footageLast,
	colors,
	texts,
	fonts,
}) => {
	return (
		<AbsoluteFill style={{backgroundColor: colors.main}}>
			{/* 👇 Intro Component that Open a first Scene */}
			{/*  ✔️ PART One */}
			<Sequence from={0} durationInFrames={165} name="PartOne">
				{/* 👇 BackGround Video */}
				<PartOne
					footages={footages}
					footageFirst={footageFirst}
					colors={colors}
					texts={texts}
					fonts={fonts}
				/>
			</Sequence>
			{/*  ✔️✔️ PART TWO */}
			<Sequence from={165} durationInFrames={160} name="SecondVideo">
				<PartTwo
					footages={footages}
					footageSecond={footageSecond}
					colors={colors}
					texts={texts}
					fonts={fonts}
				/>
			</Sequence>
			{/*  ✔️✔️✔️ PART Three */}
			<Sequence from={300} durationInFrames={150} name="LastPart">
				<ContactUs
					texts={texts.end_text}
					colors={colors}
					fonts={fonts}
					footageLast={footageLast}
					footages={footages}
				/>
				<Logo imageSrc={logoZebra} />
			</Sequence>
			{/* 👇 Audio File */}
			<Audio src={audio} startFrom={0} />
		</AbsoluteFill>
	);
};
