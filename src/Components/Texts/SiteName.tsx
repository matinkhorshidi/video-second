import {AbsoluteFill, useVideoConfig} from 'remotion';
import {spring} from 'remotion';
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

interface SiteNameProps {
	SiteAddress: string;
	colors: {main: string; main_text: string};
	fonts: {main_font: string[]; secondary_font: string[]; simple_font: string[]};
	[key: string]: any; // 👈️ allows dynamic keys and values
}
export const SiteName: React.FC<SiteNameProps> = ({
	SiteAddress,
	colors,
	fonts,
}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);
	const {fps} = useVideoConfig();

	const upAnimation = spring({
		frame,
		fps,
		config: {
			damping: 200,
		},
	});
	const contentTranslation = interpolate(upAnimation, [0, 1], [0, -50]);

	return (
		<>
			<AbsoluteFill style={{transform: `translateY(${contentTranslation}px)`}}>
				<span
					style={{
						fontSize: 70,
						textAlign: 'center',
						position: 'absolute',
						bottom: 130,
						width: '100%',
						opacity,
						color: colors.main_text,
						fontFamily: fonts.main_font[0],
						textShadow: '2px 2px 4px rgb(0,0,0,0.5)',
					}}
				>
					{SiteAddress}
				</span>
			</AbsoluteFill>
		</>
	);
};
