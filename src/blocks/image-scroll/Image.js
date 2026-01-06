import React from 'react';
import { ResizableBox } from '@wordpress/components';
import { store as blockEditorStore } from '@wordpress/block-editor';
import getDeviceType from '@Utils/get-device-type';
import { useSelect, useDispatch } from '@wordpress/data';
import { useClientWidth, useClientHeight } from './utils';

const propTypes = {};
export default function Image( props ) {
	const { toggleSelection } = useDispatch( blockEditorStore );
	const {
		setAttributes,
		isSelected,
		attributes,
		containerRef,
		currentImageData = {},
	} = props;

	const {
		imgAltText,
		imgTitle,
		alignment,
		imgSize,
		widthHeightWidget,
		imageScrollOption,
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

	const imgNaturalWidth = dimensionsOfCurrentSize.width;
	const imgNaturalHeight = dimensionsOfCurrentSize.height;
	const responsiveImageWidth = widthHeightWidget[ 'width' + deviceType ];
	const responsiveImageHeight = widthHeightWidget[ 'height' + deviceType ];
	const imageSource =
		attributes[ `imgUrl${ deviceType }` ] ||
		attributes.imgUrlMobile ||
		attributes.imgUrlTablet ||
		attributes.imgUrl;

	const { maxWidth } = useSelect( ( select ) => {
		const { getSettings } = select( blockEditorStore );
		// eslint-disable-next-line no-shadow
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
		// When the image is centered, show both handles.
		rightHandle = true;
		leftHandle = true;
	} else if ( alignment?.value === 'right' ) {
		// Show the right handle and hide the left handle only when it is
		// aligned right.
		rightHandle = false;
		leftHandle = true;
	}

	const resWidth = widthHeightWidget[ 'width' + deviceType ] || 'auto';
	const resHeight = widthHeightWidget[ 'height' + deviceType ] || 'auto';

	function onResizeStart() {
		toggleSelection( false );
	}

	const onResizeStop = ( delta ) => {
		const updatedWidth = Math.abs(
			responsiveImageWidth
				? parseInt( responsiveImageWidth ) + delta.width
				: clientWidth + delta.width
		);
		const updatedHeight = Math.abs(
			responsiveImageHeight
				? parseInt( responsiveImageHeight ) + delta.height
				: clientHeight + delta.height
		);

		const attribute = {
			...attributes?.widthHeightWidget,
			[ 'width' + deviceType ]: updatedWidth,
			[ 'height' + deviceType ]: updatedHeight,
			[ 'showHeight' + deviceType ]: false,
		};

		setAttributes( {
			widthHeightWidget: attribute,
		} );
		toggleSelection( true );
	};
	const checkHorizontalOption =
		imageScrollOption.value === 'horizontal-scroll' ||
		imageScrollOption.value === 'left-to-right' ||
		imageScrollOption.value === 'right-to-left';
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
			lockAspectRatio
			enable={ {
				top: false,
				bottom: true,
				left: leftHandle,
				right: rightHandle,
			} }
			onResizeStop={ ( event, direction, elt, delta ) => {
				onResizeStop( event, direction, elt, delta );
			} }
			onResizeStart={ onResizeStart }
		>
			<img
				src={ imageSource }
				alt={ imgAltText }
				title={ imgTitle }
				loading="lazy"
				style={ {
					width: checkHorizontalOption ? 'none' : '100%',
					height: '100%',
				} }
			/>
		</ResizableBox>
	);
}

Image.propTypes = propTypes;
