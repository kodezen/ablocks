import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import RenderChildContainer from '@Components/block-container/childRender';
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { select as dataSelect } from '@wordpress/data';
import AblocksRichText from '@Components/rich-text';
import metadata from './block.json';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { block_id, accordionTitle, accordionId, parentAttributes } =
		attributes;
	const blockProps = useBlockProps( {
		className:
			'ablocks-block ablocks-block--single-accordion__body-content',
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		templateLock: false,
	} );
	const {
		iconPosition,
		headingTag,
		showIcon,
		leftCloseIconClass,
		leftActiveIconClass,
		rightActiveIconClass,
		rightCloseIconClass,
	} = parentAttributes || {};

	const blockIndex =
		dataSelect( 'core/block-editor' ).getBlockIndex( clientId );
	const parentAttributesLength = parentAttributes
		? Object.keys( parentAttributes ).length
		: 0;
	const parentIcon =
		parentAttributesLength > 7 ? parentAttributes : attributes;
	useEffect( () => {
		if ( blockIndex !== accordionId ) {
			setAttributes( {
				accordionId: blockIndex,
				accordionTitle: `Accordion Title ${ blockIndex + 1 }`,
			} );
		}
	}, [ blockIndex ] );
	const leftActiveIconChecked =
		showIcon &&
		( iconPosition === 'left' || iconPosition === 'both' ) &&
		leftActiveIconClass;
	const leftCloseIconChecked =
		showIcon &&
		( iconPosition === 'left' || iconPosition === 'both' ) &&
		leftCloseIconClass;
	const rightActiveIconChecked =
		showIcon &&
		( iconPosition === 'right' || iconPosition === 'both' ) &&
		rightActiveIconClass;
	const rightCloseIconChecked =
		showIcon &&
		( iconPosition === 'right' || iconPosition === 'both' ) &&
		rightCloseIconClass;
	return (
		<React.Fragment>
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				blockProps={ {
					'data-id-acc': accordionId,
				} }
			>
				<div className="ablocks-block--single-accordion__heading">
					<div className="ablocks-block--single-accordion__heading-rightSide">
						{ leftActiveIconChecked && (
							<div className="ablocks-block--single-accordion__heading-collapse-icon-open">
								<RenderIcon
									attributePrefix={ 'leftActiveIcon' }
									attributes={ parentIcon }
								/>
							</div>
						) }
						{ leftCloseIconChecked && (
							<div className="ablocks-block--single-accordion__heading-collapse-icon-off">
								<RenderIcon
									attributePrefix={ 'leftCloseIcon' }
									attributes={ parentIcon }
								/>
							</div>
						) }
						<AblocksRichText
							{ ...blockProps }
							tagName={ headingTag }
							identifier={ 'accordionTitle' }
							value={ attributes.accordionTitle }
							withoutInteractiveFormatting={ true }
							placeholder={ attributes.accordionTitle }
							className={ 'ablocks-block-accordion-title' }
							onChange={ ( accordionTitle ) =>
								setAttributes( { accordionTitle } )
							}
						/>
					</div>
					{ rightActiveIconChecked && (
						<div className="ablocks-single-accordion-right-side-icon ablocks-block--single-accordion__heading-collapse-icon-open">
							<RenderIcon
								attributePrefix={ 'rightActiveIcon' }
								attributes={ parentIcon }
							/>
						</div>
					) }
					{ rightCloseIconChecked && (
						<div className="ablocks-single-accordion-right-side-icon ablocks-block--single-accordion__heading-collapse-icon-off">
							<RenderIcon
								attributePrefix={ 'rightCloseIcon' }
								attributes={ parentIcon }
							/>
						</div>
					) }
				</div>
				<div className="ablocks-block--single-accordion__body">
					<div { ...innerBlocksProps }></div>
				</div>
			</RenderChildContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
