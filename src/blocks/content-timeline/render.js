import React, { useEffect } from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { useDispatch, select } from '@wordpress/data';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import ABlocksContentTimeline from './content-timeline';
import { getRenderDomElement } from '@Utils/helper';
import classNames from 'classnames';

const Render = ( props ) => {
	const { attributes, clientId, isSelected } = props;
	const {
		block_id,
		contentPosition,
		arrowAlignment,
		iconColor,
		iconBackgroundColor,
		thicknessColor,
		showAnimation,
		connectorAnimationColor,
		contentBackgroundColor,
		showDate,
		showDateTablet,
		showDateMobile,
		dateFormat,
		dateColor,
		dateAlign,
		dateBackground,
	} = attributes;
	const contentTimelineTemplate = [
		[ 'ablocks/content-timeline-child' ],
		[ 'ablocks/content-timeline-child' ],
		[ 'ablocks/content-timeline-child' ],
	];
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		const containerElement = getRenderDomElement(
			`.ablocks-block-${ block_id }.ablocks-block--content-timeline`
		);
		if ( containerElement ) {
			const timeline = new ABlocksContentTimeline(
				containerElement,
				true
			);
			timeline.updateTimeline();
		}

		const handleResize = () => {
			if ( containerElement ) {
				const timeline = new ABlocksContentTimeline( containerElement );
				timeline.updateTimeline();
			}
		};

		window.addEventListener( 'resize', handleResize );
		return () => window.removeEventListener( 'resize', handleResize );
	}, [ block_id, arrowAlignment ] );

	const changeChildAttribute = () => {
		const childBlocks = select( 'core/block-editor' ).getBlocks( clientId );
		if ( childBlocks.length > 0 ) {
			childBlocks.forEach( ( childBlock ) => {
				const childBlockId = childBlock.clientId;
				updateBlockAttributes( childBlockId, {
					contentPosition,
					arrowAlignmentment: arrowAlignment,
					iconColor,
					iconBackgroundColor,
					thicknessColor,
					showAnimation,
					connectorAnimationColor,
					contentBackgroundColor,
					showDate,
					showDateTablet,
					showDateMobile,
					dateFormat,
					dateColor,
					dateAlign,
					dateBackground,
					parentAttribute: attributes,
				} );
			} );
		}
	};

	useEffect( () => {
		if ( isSelected ) {
			changeChildAttribute();
		}
	}, [ attributes, isSelected ] );

	const blockClass = 'ablocks-block-content-timeline';
	const containerClassNames = classNames(
		blockClass,
		`${ blockClass }--outer-wrap`,
		`${ blockClass }--editor-preview-mode-desktop`,
		`${ blockClass }--${ contentPosition }`
	);

	const lineClassNames = classNames( `${ blockClass }__line` );

	return (
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
			<div
				className={ containerClassNames }
				data-arrow-alignment={ arrowAlignment }
				data-animation-color={ connectorAnimationColor }
				data-show-animation={ showAnimation }
			>
				<InnerBlocks
					template={ contentTimelineTemplate }
					templateLock={ false }
					allowedBlocks={ [ 'ablocks/content-timeline-child' ] }
				/>
				<div className={ lineClassNames }>
					<div className={ `${ blockClass }__line__inner` }></div>
				</div>
			</div>
		</RenderContainer>
	);
};

export default Render;
