import {Composition} from 'remotion';
import {ContactUs} from './Components/ContactUs/ContactUs';
import {PartOne} from './Components/PartOne/PartOne';
import {PartTwo} from './Components/PartTwo/PartTwo';
import {Main} from './Main';

export const RemotionVideo: React.FC = () => {
	const config = require('./input_data/config.json');

	return (
		<>
			<Composition
				id="Main"
				component={Main}
				durationInFrames={450}
				fps={30}
				width={720}
				height={1080}
				// 👇 You can override these props for each render:
				defaultProps={{
					footages: config.footages,
					footageFirst: config.footage_first,
					footageSecond: config.footage_second,
					footageLast: config.footage_last,
					colors: config.colors,
					texts: config.texts,
					fonts: config.fonts,
				}}
			/>
			<Composition
				id="PartOne"
				component={PartOne}
				durationInFrames={180}
				fps={30}
				width={720}
				height={1080}
				// 👇 You can override these props for each render:
				defaultProps={{
					footages: config.footages,
					footageFirst: config.footage_first,
					colors: config.colors,
					texts: config.texts,
					fonts: config.fonts,
				}}
			/>
			<Composition
				id="PartTwo"
				component={PartTwo}
				durationInFrames={181}
				fps={30}
				width={720}
				height={1080}
				// 👇 You can override these props for each render:
				defaultProps={{
					footages: config.footages,
					footageSecond: config.footage_second,
					colors: config.colors,
					texts: config.texts,
					fonts: config.fonts,
				}}
			/>
			<Composition
				id="ContactUs"
				component={ContactUs}
				durationInFrames={120}
				fps={30}
				width={720}
				height={1080}
				// 👇 You can override these props for each render:
				defaultProps={{
					footages: config.footages,
					footageLast: config.footage_last,
					colors: config.colors,
					texts: config.texts.end_text,
					fonts: config.fonts,
				}}
			/>
		</>
	);
};
