import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getContentTimelineIconBackgroundCSS,
	getContentTimelineIconCSS,
	getContentTimelineConnectorCSS,
	getContentTimelineItemGapCSS,
	getContentTimelineContentCSS,
	getContentTimelineContentBackgroundCSS,
	getContentTimelineDateCSS,
	getContentTimelineArrowCSS,
	getContentTimelineDateAlignmentCSS,
	getContentTimelineDateMobileCSS,
	getContentTimelineDateHoverMobileCSS,
	getContentTimelineShowDateCenterCSS,
	getContentTimelineShowDateLeftRightCSS,
	getContentTimelineShowDateLeftRightLineCSS,
	getContentTimelineShowDateMobileCSS,
	getContentTimelineContentPaddingCSS,
} from './styling';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { arrowAlignment, block_id } = attributes;

	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
		// Save Version
		if ( ! attributes?.blockVersion ) {
			setAttributes( { blockVersion: 2 } );
		}
	}, [ block_id, clientId ] );
	// Generate CSS
	const generatedCSS = useMemo( () => {
		let cssGenerator = null;
		if ( cssGenerator ) {
			if (
				attributes?.blockVersion === 2 &&
				! ( cssGenerator instanceof CSSGenerator2 )
			) {
				cssGenerator = new CSSGenerator2( attributes, clientId ); // Create new instance of v2 if needed
			} else if (
				attributes?.blockVersion !== 2 &&
				! ( cssGenerator instanceof CSSGenerator )
			) {
				cssGenerator = new CSSGenerator( attributes, clientId ); // Create new instance of v1 if needed
			}
		} else {
			// No instance, so create the correct one based on version
			if ( attributes?.blockVersion === 2 ) {
				cssGenerator = new CSSGenerator2( attributes, clientId );
			} else {
				cssGenerator = new CSSGenerator( attributes, clientId );
			}
		}

		if ( cssGenerator === null ) {
			return '';
		}
		// Generate wrapper CSS
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline-child__date-inner',
			getContentTimelineShowDateCenterCSS( attributes, '' ),
			getContentTimelineShowDateCenterCSS( attributes, 'Tablet' ),
			getContentTimelineShowDateCenterCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline-child__date',
			getContentTimelineShowDateLeftRightCSS( attributes, '' ),
			getContentTimelineShowDateLeftRightCSS( attributes, 'Tablet' ),
			getContentTimelineShowDateLeftRightCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline-child__inner-content-date',
			getContentTimelineShowDateMobileCSS( attributes, '' ),
			getContentTimelineShowDateMobileCSS( attributes, 'Tablet' ),
			getContentTimelineShowDateMobileCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline--left .ablocks-block-content-timeline__line,.ablocks-block-content-timeline--right .ablocks-block-content-timeline__line',
			getContentTimelineShowDateLeftRightLineCSS( attributes, '' ),
			getContentTimelineShowDateLeftRightLineCSS( attributes, 'Tablet' ),
			getContentTimelineShowDateLeftRightLineCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-maker svg',
			getContentTimelineIconCSS( attributes ),
			getContentTimelineIconCSS( attributes, 'Tablet' ),
			getContentTimelineIconCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline--outer-wrap .ablocks__in-view-icon',
			getContentTimelineIconBackgroundCSS( attributes ),
			getContentTimelineIconBackgroundCSS( attributes, 'Tablet' ),
			getContentTimelineIconBackgroundCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline__line',
			getContentTimelineConnectorCSS( attributes ),
			getContentTimelineConnectorCSS( attributes, 'Tablet' ),
			getContentTimelineConnectorCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline-child--field',
			getContentTimelineItemGapCSS( attributes ),
			getContentTimelineItemGapCSS( attributes, 'Tablet' ),
			getContentTimelineItemGapCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline-child--field .ablocks-block-content-timeline-child__content-part',
			getContentTimelineContentCSS( attributes ),
			getContentTimelineContentCSS( attributes, 'Tablet' ),
			getContentTimelineContentCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline-child__content-part .block-editor-block-list__layout',
			getContentTimelineContentPaddingCSS( attributes ),
			getContentTimelineContentPaddingCSS( attributes, 'Tablet' ),
			getContentTimelineContentPaddingCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline-child__content-part .ablocks-block-content-timeline-child__arrow::after',
			getContentTimelineContentBackgroundCSS( attributes ),
			getContentTimelineContentBackgroundCSS( attributes, 'Tablet' ),
			getContentTimelineContentBackgroundCSS( attributes, 'Mobile' )
		);
		if ( arrowAlignment === 'top' ) {
			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-block-content-timeline-child--line-top .ablocks-block-content-timeline-child__arrow',
				getContentTimelineArrowCSS( attributes ),
				getContentTimelineArrowCSS( attributes, 'Tablet' ),
				getContentTimelineArrowCSS( attributes, 'Mobile' )
			);
			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-block-content-timeline-child--line-top .ablocks-block-content-timeline-child__date',
				getContentTimelineDateAlignmentCSS( attributes ),
				getContentTimelineDateAlignmentCSS( attributes, 'Tablet' ),
				getContentTimelineDateAlignmentCSS( attributes, 'Mobile' )
			);
		} else if ( arrowAlignment === 'bottom' ) {
			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-block-content-timeline-child--line-bottom .ablocks-block-content-timeline-child__arrow',
				getContentTimelineArrowCSS( attributes ),
				getContentTimelineArrowCSS( attributes, 'Tablet' ),
				getContentTimelineArrowCSS( attributes, 'Mobile' )
			);
			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-block-content-timeline-child--line-bottom .ablocks-block-content-timeline-child__date',
				getContentTimelineDateAlignmentCSS( attributes ),
				getContentTimelineDateAlignmentCSS( attributes, 'Tablet' ),
				getContentTimelineDateAlignmentCSS( attributes, 'Mobile' )
			);
		}
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline-child__date, .ablocks-block-content-timeline-child__inner-content-date',
			getContentTimelineDateCSS( attributes ),
			getContentTimelineDateCSS( attributes, 'Tablet' ),
			getContentTimelineDateCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline-child__inner-content-date',
			getContentTimelineDateMobileCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-content-timeline-child__inner-content-date:hover',
			getContentTimelineDateHoverMobileCSS( attributes, 'Mobile' )
		);
		return cssGenerator.generateCSS();
	}, [ attributes ] );
	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
