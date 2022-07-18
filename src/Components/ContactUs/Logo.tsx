import styled from 'styled-components';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
} from 'remotion';
interface LogoProps {
	imageSrc: string;
}
export const Logo: React.FC<LogoProps> = ({imageSrc}) => {
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
		<AbsoluteFill
			style={{
				transform: `scale(${coverScale})`,
				left: width / 2 - COVER_SIZE / 2,
				top: height / 6 - 50,
				position: 'absolute',
				opacity: coverOpacity,
			}}
		>
			<Cover>
				<Img
					src={imageSrc}
					style={{
						height: COVER_SIZE,
						width: COVER_SIZE,
						filter: 'brightness(100%) contrast(180%) ',
					}}
				/>
			</Cover>
		</AbsoluteFill>
	);
};
export const COVER_SIZE = 300;
const Cover = styled.div`
	width: ${COVER_SIZE}px;
	height: ${COVER_SIZE}px;
	// box-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
`;
