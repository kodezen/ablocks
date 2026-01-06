import React from 'react';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save2';
import { getPathData, pathHeight } from './helper';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

const Save = ( props ) => {
	const { attributes } = props;
	const {
		block_id,
		text,
		pathType,
		isShowIcon,
		link,
		offsetControl,
		strokeWidth,
		iconSvgPath,
		textStroke,
		textStrokeShow,
		iconSvgViewBox,
	} = attributes;
	const { linkTarget, noFollow, keyValue, href } = link || {};

	let anchorTagAttributes = {};

	if ( href ) {
		anchorTagAttributes.href = href;
	}

	if ( linkTarget ) {
		anchorTagAttributes.target = '_blank';
	}
	if ( noFollow ) {
		anchorTagAttributes.rel = linkTarget
			? 'nofollow noreferrer noopener'
			: 'nofollow';
	} else {
		anchorTagAttributes.rel = 'noopener';
	}
	if ( keyValue ) {
		anchorTagAttributes = {
			...anchorTagAttributes,
			...getAnchorKeyValueAttributes( keyValue ),
		};
	}

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<svg
					className="ablocks-path-text-path"
					height={ pathHeight( pathType ) }
					viewBox={
						pathType === 'custom'
							? `${ iconSvgViewBox }`
							: `0 0 250 ${ pathHeight( pathType ) }`
					}
				>
					<path
						id={ `text-path-${ block_id }` }
						d={
							pathType === 'custom'
								? iconSvgPath
								: getPathData( pathType )
						}
						fill="none"
						strokeWidth={ strokeWidth }
						className="ablocks-text-path-svg"
						stroke={
							isShowIcon
								? getTextColorCSS( attributes?.strokeColor )
								: 'transparent'
						}
					/>

					{ href ? (
						<a { ...anchorTagAttributes }>
							<text
								strokeWidth={ textStrokeShow ? textStroke : 0 }
								stroke={
									getTextColorCSS(
										attributes?.strokeTextColor
									) ||
									getTextColorCSS( attributes?.textColor )
								}
								className="ablocks-text-path-text-parent"
							>
								<textPath
									className="ablocks-text-path-text"
									href={ `#text-path-${ block_id }` }
									startOffset={ offsetControl }
									fill={
										getTextColorCSS(
											attributes?.textColor
										) ||
										getTextColorCSS(
											attributes?.textColorH
										)
									}
								>
									{ text }
								</textPath>
							</text>
						</a>
					) : (
						<text
							strokeWidth={ textStrokeShow ? textStroke : 0 }
							stroke={
								getTextColorCSS(
									attributes?.strokeTextColor
								) || getTextColorCSS( attributes?.textColor )
							}
							className="ablocks-text-path-text-parent"
						>
							<textPath
								className="ablocks-text-path-text"
								href={ `#text-path-${ block_id }` }
								startOffset={ offsetControl }
								fill={
									getTextColorCSS( attributes?.textColor ) ||
									getTextColorCSS( attributes?.textColorH )
								}
							>
								{ text }
							</textPath>
						</text>
					) }
				</svg>
			</SaveContainer>
		</React.Fragment>
	);
};

export default Save;
