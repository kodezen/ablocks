import React from 'react';
import SaveContainer from '@Components/block-container/save';
import { RichText } from '@wordpress/block-editor';
import RenderIcon from '@Controls/icon-upload/render-icon';
import classNames from 'classnames';
import metadata from './block.json';

const propTypes = {};

const DividerComp = ( { allowDivider, dividerType } ) => {
	if ( allowDivider ) {
		if ( dividerType === 'mask-style' ) {
			return (
				<div className=" ablocks-divider ablocks-advance-list-item-divider__pattern-mask "></div>
			);
		}
		return (
			<div className=" ablocks-divider ablocks-advance-list-item-divider__pattern-css "></div>
		);
	}
};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		emoji,
		advanceListItemText,
		markerType,
		shapeType,
		allowDivider,
		isLastChild,
		advanceListItemTextTag,
		dropCaps,
		advanceListItemTextSize,
		dividerType,
	} = attributes;

	const renderContent = () => {
		if ( markerType === 'Icon' ) {
			return <RenderIcon attributes={ attributes } />;
		} else if ( markerType === 'Emoji' ) {
			return (
				<RichText.Content
					tagName={ 'span' }
					value={ emoji }
					className={ 'emoji advance-list-item-marker' }
				/>
			);
		} else if ( markerType === 'none' ) {
		} else {
			return (
				<span
					className={ `advance-list-item-${ shapeType } advance-list-item-marker` }
				></span>
			);
		}
	};

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ renderContent() }
				<RichText.Content
					tagName={ advanceListItemTextTag }
					value={ advanceListItemText }
					className={ classNames(
						'ablocks-advance-list-item-text',
						`ablocks-advance-list-item-text-${ advanceListItemTextSize }`,
						{
							'ablocks-advance-list-item-text-drop-caps':
								dropCaps,
						}
					) }
				/>
				{ ! isLastChild && (
					<DividerComp
						allowDivider={ allowDivider }
						dividerType={ dividerType }
					/>
				) }
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
