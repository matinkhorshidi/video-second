import React from 'react';
import {
	spring,
	Sequence,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface SubtitleProps {
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

export const Subtitle: React.FC<SubtitleProps> = ({texts, colors, font}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);
	const videoConfig = useVideoConfig();
	const words = texts[2].split(' ');

	return (
		<>
			<Sequence from={10} name="Title">
				<div
					style={{
						textAlign: 'center',
						position: 'absolute',
						top: 530,
						width: '100%',
					}}
				>
					{words.map((t, i) => {
						const delay = i * 5;

						const scale = spring({
							fps: videoConfig.fps + 20,
							frame: frame - delay,
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
									fontSize: 35,
									fontWeight: 'bold',
									color: colors.main_text,
									fontFamily: font[0],
								}}
							>
								{t}
							</span>
						);
					})}
				</div>
			</Sequence>
			<span
				style={{
					fontSize: 30,
					fontWeight: 100,
					textAlign: 'center',
					position: 'absolute',
					top: 650,
					left: 90,
					opacity,
					color: colors.secondary_text,
					fontFamily: font[0],
				}}
			>
				<div
					style={{
						fontSize: 25,
						fontWeight: 100,
						textAlign: 'center',
						position: 'inherit',
						width: 540,
						padding: 10,
						opacity,
						fontFamily: font[0],
						backgroundColor: colors.main,
					}}
				>
					{texts[3]}
				</div>
			</span>
		</>
	);
};
