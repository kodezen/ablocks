import React from 'react';
import { ResizableBox } from '@wordpress/components';
import { store as blockEditorStore } from '@wordpress/block-editor';
import getDeviceType from '@Utils/get-device-type';
import { useSelect, useDispatch } from '@wordpress/data';
import { useClientWidth, useClientHeight } from './utils';
import { applyFilters } from '@wordpress/hooks';

const propTypes = {};
export default function Image( props ) {
	const { toggleSelection } = useDispatch( blockEditorStore );
	const {
		setAttributes,
		isSelected,
		attributes,
		context,
		containerRef,
		currentImageData = {},
	} = props;

	const {
		imgAltText,
		imgTitle,
		alignment,
		imgSize,
		widthHeightWidget,
		objectFit,
	} = attributes;

	const deviceType = getDeviceType();
	const mobileImageSize =
		'Mobile' === deviceType
			? imgSize.valueMobile || imgSize.valueTablet || imgSize.value
			: 'large';
	const tabletImageSize =
		'Tablet' === deviceType
			? imgSize.valueTablet || imgSize.value
			: mobileImageSize;
	const currentSize = ! deviceType ? imgSize.value : tabletImageSize;

	const dimensionsOfCurrentSize =
		currentImageData?.media_details?.sizes?.[ currentSize ] || {};

	const imgNaturalWidth = dimensionsOfCurrentSize.width || 1;
	const imgNaturalHeight = dimensionsOfCurrentSize.height || 1;
	const responsiveImageWidth = widthHeightWidget[ 'width' + deviceType ];
	const responsiveImageHeight = widthHeightWidget[ 'height' + deviceType ];

	// eslint-disable-next-line
	let parsedImageUrlWithDeviceType = applyFilters(
		`ablocks.dynamic_content.get_dynamic_value`,
		{
			context,
			attributeValue: attributes[ `imgUrl${ deviceType }` ],
		}
	);

	// eslint-disable-next-line
	let parsedImageUrlMobile = applyFilters(
		`ablocks.dynamic_content.get_dynamic_value`,
		{
			context,
			attributeValue: attributes.imgUrlMobile,
		}
	);

	// eslint-disable-next-line
	let parsedImageUrlTablet = applyFilters(
		`ablocks.dynamic_content.get_dynamic_value`,
		{
			context,
			attributeValue: attributes.imgUrlTablet,
		}
	);

	// eslint-disable-next-line
	let parsedImageUrl = applyFilters(
		`ablocks.dynamic_content.get_dynamic_value`,
		{
			context,
			attributeValue: attributes.imgUrl,
		}
	);

	const imageSource =
		parsedImageUrlWithDeviceType ||
		parsedImageUrlMobile ||
		parsedImageUrlTablet ||
		parsedImageUrl;

	const { maxWidth } = useSelect( ( select ) => {
		const { getSettings } = select( blockEditorStore );
		const { maxWidth } = getSettings();
		return {
			maxWidth,
		};
	}, [] );

	const minWidth = 50;
	const minHeight = 50;
	const maxWidthBuffer = maxWidth * 2;
	const ratio = imgNaturalWidth / imgNaturalHeight;
	const clientWidth = useClientWidth( containerRef, [
		alignment,
		deviceType,
	] );
	const clientHeight = useClientHeight( containerRef, [
		alignment,
		deviceType,
	] );

	let rightHandle = true;
	let leftHandle = false;

	if ( alignment?.value === 'center' ) {
		rightHandle = true;
		leftHandle = true;
	} else if ( alignment?.value === 'right' ) {
		rightHandle = false;
		leftHandle = true;
	}

	const resWidth = responsiveImageWidth
		? parseInt( responsiveImageWidth )
		: 'auto';
	const resHeight = responsiveImageHeight
		? parseInt( responsiveImageHeight )
		: 'auto';

	function onResizeStart() {
		toggleSelection( false );
	}

	const onResizeStop = ( event, direction, elt, delta ) => {
		const newWidth = Math.max(
			minWidth,
			Math.min(
				maxWidthBuffer,
				( resWidth === 'auto' ? clientWidth : resWidth ) + delta.width
			)
		);

		const newHeight = Math.max(
			minHeight,
			Math.min(
				maxWidthBuffer / ratio,
				( resHeight === 'auto' ? clientHeight : resHeight ) +
					delta.height
			)
		);

		const attribute = {
			...attributes?.widthHeightWidget,
			[ 'width' + deviceType ]: newWidth,
			[ 'height' + deviceType ]: newHeight,
			[ 'showHeight' + deviceType ]: false,
		};

		setAttributes( {
			widthHeightWidget: attribute,
		} );
		toggleSelection( true );
	};

	return (
		<ResizableBox
			size={ {
				width: resWidth,
				height: resHeight,
			} }
			showHandle={ isSelected }
			minHeight={ minHeight }
			minWidth={ minWidth }
			maxWidth={ maxWidthBuffer }
			maxHeight={ maxWidthBuffer / ratio }
			lockAspectRatio={ true }
			enable={ {
				top: false,
				bottom: true,
				left: leftHandle,
				right: rightHandle,
			} }
			onResizeStop={ onResizeStop }
			onResizeStart={ onResizeStart }
		>
			<img
				src={ imageSource }
				alt={ imgAltText }
				title={ imgTitle }
				loading="lazy"
				style={ {
					width: '100%',
					height: '100%',
					objectFit:
						objectFit?.[ 'value' + deviceType ] &&
						objectFit[ 'value' + deviceType ] !== 'default'
							? objectFit[ 'value' + deviceType ]
							: 'contain',
				} }
			/>
		</ResizableBox>
	);
}

Image.propTypes = propTypes;
