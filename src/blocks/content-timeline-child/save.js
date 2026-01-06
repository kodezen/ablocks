import React from 'react';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import SaveChildContainer from '@Components/block-container/childSave';
import { format } from '@wordpress/date';
import RenderIcon from '@Controls/icon-upload/render-icon';
import classNames from 'classnames';

const Save = ( props ) => {
	const { attributes } = props;
	const {
		block_id,
		indexContent,
		text_date,
		changeChildIcon,
		parentAttribute,
	} = attributes;

	const parentIcon = Object.keys( parentAttribute ).length === 0;
	const isEven = indexContent !== undefined && indexContent % 2 === 0;
	const isOdd = indexContent !== undefined && indexContent % 2 === 1;
	const blockClassNames = classNames(
		'ablocks-block-content-timeline-child',
		'ablocks-block-content-timeline-child--field',
		{
			'ablocks-block-content-timeline-child--content-center-right-side':
				isEven && attributes?.contentPosition === 'center',
			'ablocks-block-content-timeline-child--content-center-left-side':
				isOdd && attributes?.contentPosition === 'center',
			'ablocks-block-content-timeline-child--content-right-side':
				attributes?.contentPosition === 'right',
			'ablocks-block-content-timeline-child--content-left-side':
				attributes?.contentPosition === 'left',
			[ `ablocks-block-content-timeline-child--line-${ attributes?.arrowAlignment }` ]: true,
		}
	);
	const mobileDate =
		attributes?.dateFormat && text_date
			? format( attributes?.dateFormat, text_date )
			: text_date;
	const desktopTabletDate =
		attributes?.dateFormat && text_date ? (
			<div className="ablocks-block-content-timeline-child__date-inner">
				{ format( attributes?.dateFormat, text_date ) }
			</div>
		) : (
			<div className="ablocks-block-content-timeline-child__date-inner">
				{ text_date }
			</div>
		);
	const dateClassNames = classNames(
		'ablocks-block-content-timeline-child__date'
	);
	return (
		<SaveChildContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
			className={ blockClassNames }
		>
			{ changeChildIcon || parentIcon ? (
				<div className="ablocks-icon-maker ablocks__in-view-icon">
					<RenderIcon attributes={ attributes } />
				</div>
			) : (
				<div className="ablocks-icon-maker ablocks__in-view-icon">
					<RenderIcon
						attributePrefix={ 'contentTimeLineIcon' }
						attributes={ parentAttribute }
					/>
				</div>
			) }
			<div className="ablocks-block-content-timeline-child__content-part ablocks-block-content-timeline-child__events-inner">
				<InnerBlocks.Content />
				<div
					className={ `ablocks-block-content-timeline-child__inner-content-date` }
				>
					{ mobileDate }
				</div>
				<div className="ablocks-block-content-timeline-child__arrow"></div>
			</div>
			<div className={ dateClassNames }>{ desktopTabletDate }</div>
		</SaveChildContainer>
	);
};

export default Save;
