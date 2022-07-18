import {AbsoluteFill, Sequence, Video, Audio} from 'remotion';
import './input_data/Fonts/font.css';

import {Intro} from './Components/Intro/Intro';
import {FirstPartTexes} from './Components/PartOne/FirstPartTexes';
import {SiteName} from './Components/Texts/SiteName';
import {DeviderFromDown} from './Components/Effects/DeviderFromDown';
import {SlideUpFromDown} from './Components/Effects/SlideUpFromDown';
import {SecondPartTexes} from './Components/Texts/SecondPartTexes';
import {DeviderFromRight} from './Components/Effects/DeviderFromRight';
import {SlideFromRight} from './Components/Effects/SlideFromRight';
import {Logo} from './Components/ContactUs/Logo';
import {ContactUs} from './Components/ContactUs/ContactUs';
import logoZebra from './input_data/logo_zebra_trans.png';
import audio from './input_data/Sounds/ES_Back Bay - First Bassists.mp3';
import {PartOne} from './Components/PartOne/PartOne';

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
			<Sequence from={0} name="PartOne">
				{/* 👇 BackGround Video */}
				<PartOne
					footages={footages}
					footageFirst={footageFirst}
					colors={colors}
					texts={texts}
					fonts={fonts}
				/>
			</Sequence>

			{/* <Sequence from={120} name="SiteName">
				<SiteName
					SiteAddress="www.zebracat.ai"
					textColors={colors}
					fonts={fonts}
				/>
				<DeviderFromDown color={colors.main} />
			</Sequence> */}
			{/*  ✔️✔️ PART TWO */}
			<Sequence from={180} name="SecondVideo">
				{/* 👇 SecondVideo Wrapper for  Animation From Down */}
				<SlideUpFromDown delay={0}>
					<Video
						src={require(`./input_data/Videos/${footages[footageSecond]}`)}
						volume={0}
						style={{
							height: 1080,
							width: 720,
							objectFit: 'cover',
							backgroundSize: 'cover',
							filter: 'brightness(150%) contrast(120%)',
						}}
					/>
				</SlideUpFromDown>
				{/* 👇 SlideUpFromDown Colorized Devider for  Transition From Down */}
			</Sequence>
			<Sequence from={200} name="SecondPartTexts">
				<SecondPartTexes
					texts={texts.middle_text[0]}
					textColors={colors}
					fonts={fonts}
				/>
				<DeviderFromRight color={colors.main} />
			</Sequence>
			{/*  ✔️✔️✔️ PART Three */}
			<Sequence from={330} name="LastPart">
				<SlideFromRight>
					<ContactUs
						texts={texts.end_text}
						textColors={colors}
						fonts={fonts}
						footageLast={footageLast}
						footages={footages}
					/>
					<Logo imageSrc={logoZebra} />
				</SlideFromRight>
			</Sequence>
			{/* 👇 Audio File */}
			<Audio src={audio} startFrom={0} />
		</AbsoluteFill>
	);
};
