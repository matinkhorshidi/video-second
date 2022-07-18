import {interpolate} from 'remotion';
import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface TitleProps {
	texts: string[];
	colors: {
		main: string;
		secondary: string;
		third: string;
		main_text: string;
		secondary_text: string;
	};
	font: string[];
	[key: string]: any; // 👈️ allows dynamic keys and values
}

export const Title: React.FC<TitleProps> = ({texts, colors, font}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const words = texts[1].split(' ');
	const opacity = interpolate(frame, [0, 30], [0, 1]);

	return (
		<>
			<span
				style={{
					fontSize: 50,
					fontWeight: 100,
					textAlign: 'center',
					position: 'absolute',
					top: 40,
					left: 120,
					opacity,
					color: colors.main_text,
					fontFamily: font[0],
				}}
			>
				{texts[0]}
			</span>
			<h1 style={{fontSize: 110, textAlign: 'center'}}>
				{words.map((t, i) => {
					const scale = spring({
						fps: videoConfig.fps,
						frame,
						config: {
							damping: 200,
						},
					});

					return (
						<span
							key={t}
							style={{
								marginLeft: 10,
								marginRight: 10,
								display: 'inline-block',
								transform: `scale(${scale})`,
								color: colors.main,
								fontFamily: `${font[0]},${font[1]}`,
								fontWeight: 500,
							}}
						>
							{t}
						</span>
					);
				})}
			</h1>
		</>
	);
};
