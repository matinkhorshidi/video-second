import {AbsoluteFill, useVideoConfig} from 'remotion';
import {spring} from 'remotion';
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

interface SiteNameProps {
	SiteAddress: string;
	textColors: {main: string; main_text: string};
	fonts: {main_font: string[]; secondary_font: string[]; simple_font: string[]};
	[key: string]: any; // 👈️ allows dynamic keys and values
}
export const SiteName: React.FC<SiteNameProps> = ({
	SiteAddress,
	textColors,
	fonts,
}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);
	const {width, height, fps} = useVideoConfig();

	const upAnimation = spring({
		frame,
		fps,
		config: {
			damping: 200,
		},
	});
	const contentTranslation = interpolate(upAnimation, [0, 1], [0, -50]);

	const deviderAnimation = spring({
		frame: frame - 50,
		fps,
		config: {
			damping: 200,
		},
	});

	const contentTranslationDevider = interpolate(
		deviderAnimation,
		[0, 1],
		[0, -1080]
	);

	return (
		<>
			<AbsoluteFill style={{transform: `translateY(${contentTranslation}px)`}}>
				<span
					style={{
						fontSize: 70,
						textAlign: 'center',
						position: 'absolute',
						bottom: 10,
						width: '100%',
						opacity,
						color: textColors.main_text,
						fontFamily: fonts.simple_font[0],
						textShadow: '2px 2px 4px rgb(0,0,0,0.5)',
					}}
				>
					{SiteAddress}
				</span>
				<span
					style={{
						position: 'absolute',
						bottom: -55,
						left: width / 2 - 80,
						width: 0,
						height: 0,
						borderLeft: '80px solid transparent',
						borderRight: '80px solid transparent',
						borderBottom: `50px solid ${textColors.main}`,
						transform: `translateY(${contentTranslationDevider}px)`,
					}}
				/>
			</AbsoluteFill>
		</>
	);
};
