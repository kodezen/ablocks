import React from 'react';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save2';
import { QRCodeSVG } from 'qrcode.react';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;

	const {
		block_id,
		bgColor,
		fgColor,
		logoOpacity,
		qrData = {},
		imageValue = {},
		isImage,
		excavateValue,
		renderKey,
	} = attributes;

	const { dir, height, width, viewBox } = qrData || {};
	const { src, x, y, imgHeight, imgWidth } = imageValue || {};

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox={ viewBox }
					width={ height }
					height={ width }
					aria-hidden="true"
					role="img"
					focusable="false"
				>
					<path
						d={ dir && dir.length > 0 ? dir[ 0 ] : '' }
						fill={ bgColor }
						shapeRendering="crispEdges"
					/>
					<path
						d={ dir && dir.length > 0 ? dir[ 1 ] : '' }
						fill={ fgColor }
						shapeRendering="crispEdges"
					/>
					{ isImage && (
						<image
							href={ src }
							height={ imgHeight }
							width={ imgWidth }
							x={ x }
							y={ y }
							opacity={ logoOpacity }
						></image>
					) }
				</svg>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
