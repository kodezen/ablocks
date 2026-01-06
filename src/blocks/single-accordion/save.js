import React from 'react';
import SaveChildContainer from '@Components/block-container/childSave';
import metadata from './block.json';
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import RenderIcon from '@Controls/icon-upload/render-icon';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, accordionTitle, accordionId, parentAttributes } =
		attributes;
	const {
		headingTag,
		iconPosition,
		showIcon,
		rightActiveIconClass,
		rightCloseIconClass,
		leftCloseIconClass,
		leftActiveIconClass,
	} = parentAttributes || {};
	const blockProps = useBlockProps.save( {
		className: 'ablocks-block--single-accordion__body-content',
	} );
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	const parentAttributesLength = parentAttributes
		? Object.keys( parentAttributes ).length
		: 0;
	const parentIcon =
		parentAttributesLength > 7 ? parentAttributes : attributes;
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
			<SaveChildContainer
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
						<RichText.Content
							tagName={ headingTag }
							className="ablocks-block-accordion-title"
							withoutInteractiveFormatting
							value={ accordionTitle }
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
					<div { ...innerBlocksProps } />
				</div>
			</SaveChildContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
