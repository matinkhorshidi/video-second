import {interpolate} from 'remotion';
import {spring} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {Img} from 'remotion';
import {AbsoluteFill, useVideoConfig, Video} from 'remotion';

import {SlideUpFromDown} from '../Effects/SlideUpFromDown';
import {OfferCircle} from '../Shapes/OfferCircle';
import {SiteName} from '../Texts/SiteName';
import illustrator from '../../input_data/Exploring-cuate.png';

interface ContactUsProps {
	texts: string[];
	colors: {
		main: string;
		third: string;
		main_text: string;
		secondary_text: string;
	};
	fonts: {main_font: string[]; secondary_font: string[]; simple_font: string[]};
	footageLast: number;
	footages: string[];
	[key: string]: any; // 👈️ allows dynamic keys and values
}

export const ContactUs: React.FC<ContactUsProps> = ({
	texts,
	colors,
	fonts,
	footageLast,
	footages,
}) => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();

	const progress = spring({
		frame: frame - 10,
		fps,
		config: {
			damping: 200,
			mass: 0.5,
		},
	});

	const coverOpacity = interpolate(progress, [0.7, 1], [0, 1]);
	const coverScale = interpolate(progress, [0.6, 1], [0.7, 1]);

	return (
		<AbsoluteFill style={{backgroundColor: colors.main_text}}>
			<Video
				src={require(`../../input_data/Videos/${footages[footageLast]}`)}
				volume={0}
				style={{
					height: 1080,
					width: 720,
					objectFit: 'cover',
					backgroundSize: 'cover',
					filter: ' contrast(150%) opacity(0.8)',
				}}
			/>

			<AbsoluteFill
				style={{
					border: `solid 5px ${colors.main}`,
					width: '90%',
					height: '95%',
					position: 'absolute',
					top: 20,
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
			/>

			<AbsoluteFill
				style={{
					backgroundColor: colors.main,
					border: `solid 5px ${colors.main}`,
					width: '100%',
					height: 515,
					position: 'absolute',
					top: 260,
				}}
			>
				<AbsoluteFill
					style={{
						backgroundColor: colors.main,
						border: `solid 5px ${colors.main_text}`,
						borderTop: '0',
						borderBottom: '0',
						width: '92%',
						height: 510,
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						marginBottom: 0,
					}}
				>
					<SlideUpFromDown delay={25}>
						<span
							style={{
								fontSize: 70,
								textAlign: 'center',
								position: 'absolute',
								top: height / 2,
								left: width / 2 - 150,
								color: colors.main_text,
								fontFamily: fonts.main_font[0],
								fontWeight: 'bold',
							}}
						>
							{texts[0]}
						</span>
					</SlideUpFromDown>
					<AbsoluteFill
						style={{
							transform: `scale(${coverScale})`,
							left: 130,
							top: 50,
							position: 'absolute',
							opacity: coverOpacity,
						}}
					>
						<Img
							src={illustrator}
							style={{
								height: 400,
								width: 400,
								filter: 'brightness(100%) contrast(100%) ',
							}}
						/>
					</AbsoluteFill>
					<span
						style={{
							position: 'absolute',
							left: -50,
							top: 80,
							transform: 'rotate(-30deg)',
						}}
					>
						<OfferCircle
							text={texts[1]}
							backColor={colors.third + 'b0'}
							color={colors.main_text}
							font={fonts.main_font}
						/>
					</span>
				</AbsoluteFill>
			</AbsoluteFill>
			<SiteName SiteAddress="www.zebracat.ai" colors={colors} fonts={fonts} />
		</AbsoluteFill>
	);
};
