import React from 'react';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
const RenderContent = ( attributes ) => {
	const { buttonText, appearance, iconSizing, strokeSize } = attributes;
	const progressSize = iconSizing.value + 20;
	if ( appearance === 'progressIndicator' ) {
		return (
			<span
				className="ablocks-scroll-progress-wrapper"
				style={ { width: progressSize, height: progressSize } }
			>
				<svg
					className="ablocks-scroll-progress-ring"
					width={ progressSize }
					height={ progressSize }
				>
					<circle
						cx={ progressSize / 2 }
						cy={ progressSize / 2 }
						r={ progressSize / 2 - 4 }
						stroke={ getTextColorCSS(
							attributes?.progressColorBg
						) }
						strokeWidth={ strokeSize }
						fill="transparent"
					/>
					<circle
						className="ablocks-scroll-progress-ring__circle"
						cx={ progressSize / 2 }
						cy={ progressSize / 2 }
						r={ progressSize / 2 - 4 }
						stroke={ getTextColorCSS( attributes?.progressColor ) }
						strokeWidth={ strokeSize }
						strokeLinecap="round"
						fill="transparent"
					/>
				</svg>

				<div
					className="ablocks-scroll-progress-content"
					style={ {
						width: progressSize * 0.66,
						height: progressSize * 0.66,
					} }
				>
					<RenderIcon attributes={ attributes } />
				</div>
			</span>
		);
	}

	if ( appearance === 'icon' ) {
		return <RenderIcon attributes={ attributes } />;
	}

	if ( appearance === 'text' ) {
		return (
			<span className="ablocks-scroll-to-top-button-text">
				{ buttonText }
			</span>
		);
	}

	return null;
};

export default RenderContent;
