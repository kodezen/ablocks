import React from 'react';
import metadata from './block.json';
import { __ } from '@wordpress/i18n';
import RenderContainer from '@Components/block-container/render2';
import { BlockControls } from '@wordpress/block-editor';
import { TOOLBAR_ALIGNMENT_OPTIONS } from './helper';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import './style.css';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useRef } from 'react';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';
const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const svgRef = useRef( null );
	const {
		block_id,
		alignment,
		qrValue,
		bgColor,
		qrLevel,
		fgColor,
		imageSrc,
		logoWidth,
		logoOpacity,
		logoHeight,
		qrSize,
		qrData = {},
		isImage,
		positionX,
		positionY,
		excavateValue,
	} = attributes;

	const { isDynamicEnabled: isDynamicEnabled, data: dynamicText } =
		useDynamicData( {
			attributeValue: qrValue,
		} );

	useEffect( () => {
		const timer = setTimeout( () => {
			const svg =
				svgRef.current || document.getElementById( `${ block_id }123` );
			if ( ! svg ) {
				console.error( 'SVG element not found!' );
				return;
			}

			const data = {
				dir: [],
				viewBox: svg.getAttribute( 'viewBox' ) || '',
				width: svg.getAttribute( 'width' ) || '',
				height: svg.getAttribute( 'height' ) || '',
			};

			const pathList = svg.querySelectorAll( 'path' );
			pathList.forEach( ( path ) => {
				const d = path.getAttribute( 'd' );
				data.dir.push( d );
			} );

			const imageSettings = svg.querySelector( 'image' );
			let imageValue = {};
			if ( imageSettings ) {
				imageValue = {
					src: imageSettings.getAttribute( 'href' ),
					x: imageSettings.getAttribute( 'x' ),
					y: imageSettings.getAttribute( 'y' ),
					imgHeight: imageSettings.getAttribute( 'height' ),
					imgWidth: imageSettings.getAttribute( 'width' ),
					opacity: imageSettings.getAttribute( 'opacity' ),
					excavate: imageSettings.getAttribute( 'excavate' ),
				};
			}
			setAttributes( {
				qrData: data,
				imageValue,
			} );
		}, 1000 );
		return () => clearTimeout( timer );
	}, [
		block_id,
		qrValue,
		bgColor,
		fgColor,
		qrLevel,
		qrSize,
		isImage,
		imageSrc,
		positionX,
		positionY,
		logoHeight,
		logoWidth,
		logoOpacity,
		excavateValue,
	] );

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
			>
				<QRCodeSVG
					ref={ svgRef }
					id={ `${ block_id }123` }
					value={ isDynamicEnabled ? dynamicText : qrValue }
					bgColor={ bgColor }
					fgColor={ fgColor }
					level={ qrLevel }
					size={ qrSize }
					imageSettings={
						isImage
							? {
									src: imageSrc,
									x: positionX || undefined,
									y: positionY || undefined,
									height: logoHeight,
									width: logoWidth,
									opacity: logoOpacity,
									excavate: excavateValue,
							  }
							: undefined
					}
				/>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
