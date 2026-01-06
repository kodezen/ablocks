import React from 'react';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save';
import { getPathData, pathHeight } from '../helper';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';

const Save = ( props ) => {
	const { attributes } = props;
	const {
		block_id,
		text,
		pathType,
		isShowIcon,
		strokeColor,
		link,
		textColor,
		offsetControl,
		strokeWidth,
		iconSvgPath,
		textColorH,
		textStroke,
		textStrokeShow,
		strokeTextColor,
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
				<div className="ablocks-text-path">
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
							stroke={ isShowIcon ? strokeColor : 'transparent' }
						/>

						{ href ? (
							<a { ...anchorTagAttributes }>
								<text
									strokeWidth={
										textStrokeShow ? textStroke : 0
									}
									stroke={ strokeTextColor || textColor }
								>
									<textPath
										className="ablocks-text-path-text"
										href={ `#text-path-${ block_id }` }
										startOffset={ offsetControl }
										fill={ textColor || textColorH }
									>
										{ text }
									</textPath>
								</text>
							</a>
						) : (
							<text
								strokeWidth={ textStrokeShow ? textStroke : 0 }
								stroke={ strokeTextColor || textColor }
							>
								<textPath
									className="ablocks-text-path-text"
									href={ `#text-path-${ block_id }` }
									startOffset={ offsetControl }
									fill={ textColor || textColorH }
								>
									{ text }
								</textPath>
							</text>
						) }
					</svg>
				</div>
			</SaveContainer>
		</React.Fragment>
	);
};

export default Save;
