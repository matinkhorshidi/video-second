interface TriangleProps {
	color: string;
	TopRight?: boolean;
	TopLeft?: boolean;
	BottomLeft?: boolean;
	BottomRight?: boolean;
	size: number;
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
