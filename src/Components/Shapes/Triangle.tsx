import {useState} from 'react';
import {Video} from 'remotion';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {SlideUpFromDown} from '../Effects/SlideUpFromDown';

interface TriangleProps {
	color: string;
	TopRight?: boolean;
	TopLeft?: boolean;
	BottomLeft?: boolean;
	BottomRight?: boolean;
	size: number;
	// Texts: string[];
	// textColors: {
	// 	main: string;
	// 	third: string;
	// 	main_text: string;
	// 	secondary_text: string;
	// };
	// fonts: {main_font: string[]; secondary_font: string[]; simple_font: string[]};
	// footageLast: number;
	// footages: string[];
	// [key: string]: any; // 👈️ allows dynamic keys and values
}

export const Triangle: React.FC<TriangleProps> = ({
	color,
	BottomRight,
	BottomLeft,
	TopRight,
	TopLeft,
	size,
}) => {
	return (
		<>
			{BottomRight && (
				<span
					style={{
						width: 0,
						height: 0,
						borderStyle: 'solid',
						borderWidth: `0 0 ${size}px ${size}px`,
						borderLeft: `${size}px solid transparent`,
						borderColor: `transparent transparent ${color} transparent`,
					}}
				/>
			)}
			{TopLeft && (
				<span
					style={{
						width: 0,
						height: 0,
						borderStyle: 'solid',
						borderWidth: `${size}px ${size}px 0 0`,
						borderRight: `${size}px solid transparent`,
						borderColor: `${color} transparent transparent transparent`,
					}}
				/>
			)}
		</>
	);
};
