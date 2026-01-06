import React from 'react';
import SaveChildContainer from '@Components/block-container/childSave';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import classNames from 'classnames';
import metadata from './block.json';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';
import { dropDownIcon } from './helper';
const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		label,
		link: { href, linkTarget, noFollow, keyValue },
		hasMegaMenu,
		isSubMenu,
	} = attributes;
	const { innerBlocksProps, children } = useInnerBlocksProps.save( {} );
	let anchorTagAttributes = {};

	if ( href ) {
		anchorTagAttributes.href = href;
	}

	if ( linkTarget ) {
		anchorTagAttributes.target = '_blank';
	}
	if ( noFollow ) {
		anchorTagAttributes.rel = linkTarget
			? 'nofollow noreferrer noopener'
			: 'nofollow';
	} else {
		anchorTagAttributes.rel = 'nofollow noreferrer noopener';
	}
	if ( keyValue ) {
		anchorTagAttributes = {
			...anchorTagAttributes,
			...getAnchorKeyValueAttributes( keyValue ),
		};
	}

	return (
		<React.Fragment>
			<SaveChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				tagName="li"
				{ ...innerBlocksProps }
				className={ classNames( 'ablocks-menu-item', {
					'ablocks-has-mega-menu': hasMegaMenu,
					'ablocks-has-sub-menu': ! hasMegaMenu && isSubMenu,
				} ) }
			>
				<a
					{ ...anchorTagAttributes }
					className="ablocks-menu-item__link"
				>
					{ label }
				</a>
				{ isSubMenu && (
					<div className="ablocks-menu-item__dropdown-icon">
						{ dropDownIcon }
					</div>
				) }
				{ children }
			</SaveChildContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
