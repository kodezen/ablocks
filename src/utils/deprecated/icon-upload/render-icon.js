const RenderIcon = ( {
	attributePrefix = 'icon',
	attributes = {},
	customIconData,
	style,
} ) => {
	const iconSvgPath = customIconData
		? customIconData.path || ''
		: attributes[ attributePrefix + 'SvgPath' ];

	const iconSvgViewBox = customIconData
		? customIconData.viewBox || ''
		: attributes[ attributePrefix + 'SvgViewBox' ];

	const imageUrl = attributes[ attributePrefix + 'ImageUrl' ];

	if ( ! ( imageUrl || iconSvgViewBox || iconSvgPath ) ) {
		return false;
	}

	return (
		<div className="ablocks-icon-wrap">
			{ imageUrl ? (
				<img className="ablocks-image-icon" src={ imageUrl } alt="" />
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox={ iconSvgViewBox }
					className={ `ablocks-svg-icon${
						! iconSvgViewBox && ! iconSvgPath ? ' empty-svg' : ''
					}` }
					style={ style }
				>
					<path d={ iconSvgPath }></path>
				</svg>
			) }
		</div>
	);
};

export default RenderIcon;
