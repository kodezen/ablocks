import React from 'react';
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import { TOOLBAR_ALIGNMENT_OPTIONS } from './helper';
import RenderContainer from '@Components/block-container/render2';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';
import metadata from './block.json';
import { getPathData, pathHeight } from './helper';
import './style.css';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

const Render = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		alignment,
		block_id,
		text,
		pathType,
		isShowIcon,
		link,
		textColor,
		offsetControl,
		strokeWidth,
		iconSvgPath,
		textStroke,
		textStrokeShow,
		strokeTextColor,
		iconSvgViewBox,
	} = attributes;
	const { linkTarget, noFollow, keyValue, href } = link || {};

	let anchorTagAttributes = {};
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
			<BlockControls>
				<ABlocksToolbarAlignment
					attributeValue={ alignment }
					setAttributes={ setAttributes }
					options={ TOOLBAR_ALIGNMENT_OPTIONS }
				/>
			</BlockControls>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				typography={ [
					{
						fontFamily: attributes.typography?.fontFamily,
						weight: attributes.typography?.weight,
					},
				] }
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
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
									href={ `#text-path-${ block_id }` }
									startOffset={ offsetControl }
									className="ablocks-text-path-text"
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
								href={ `#text-path-${ block_id }` }
								startOffset={ offsetControl }
								className="ablocks-text-path-text"
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
			</RenderContainer>
		</React.Fragment>
	);
};

export default Render;
