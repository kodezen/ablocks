import React from 'react';
import metadata from './block.json';
import classNames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import SaveContainer from '@Components/block-container/save2';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		imgUrl,
		imgUrlTablet,
		imgUrlMobile,
		caption,
		imgTitle,
		imgAltText,
		onHoverImg,
		imgCaption,
		captionAlignment,
		imgLink: { linkDestination = '', href = '', linkTarget = '', rel = '' },
		widthHeightWidget: { width, height, imgNaturalWidth, imgNaturalHeight },
	} = attributes;

	const renderImage = imgUrl && (
		<picture>
			<source
				media="(min-width:800px)"
				className="ablocks-image"
				srcSet={ imgUrl }
			/>
			<source
				media="(min-width:480px)"
				className="ablocks-image-tablet"
				srcSet={ imgUrlTablet || imgUrl }
			/>
			<img
				src={ imgUrlMobile || imgUrlTablet || imgUrl }
				className={ classNames(
					`ablocks-image-mobile ablocks-image--effect ablocks-image--effect-${ onHoverImg }`
				) }
				alt={ imgAltText }
				width={ width ? width : imgNaturalWidth }
				height={ height ? height : imgNaturalHeight }
				title={ imgTitle }
				loading="lazy"
			/>
		</picture>
	);

	const imageCaption = (
		<>
			{ ! RichText.isEmpty( caption ) && (
				<RichText.Content
					tagName="figcaption"
					className={ classNames(
						'ablocks-image-caption',
						`ablocks-image-caption--${ captionAlignment?.value }`
					) }
					value={ caption }
				/>
			) }
		</>
	);
	const imageOverlayLink = href ? (
		<a // eslint-disable-line
			className="ablocks-image--layout-overlay-link"
			href={ href }
			target={ linkTarget ? '_blank' : '_self' }
			rel={ rel || 'noopener noreferrer' }
		>
			{ renderImage }
		</a>
	) : (
		renderImage
	);
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<figure className="ablocks-image-figure">
					{ linkDestination !== '' && linkDestination === 'custom'
						? imageOverlayLink
						: renderImage }
					{ imgCaption && imageCaption }
				</figure>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
