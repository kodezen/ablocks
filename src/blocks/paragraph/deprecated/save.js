import React from 'react';
import classNames from 'classnames';
import SaveContainer from '@Components/block-container/save';
import { RichText } from '@wordpress/block-editor';
import metadata from './block.json';

const propTypes = {};

export default function Save( props ) {
	const {
		attributes,

		// setAttributes,
	} = props;
	const { block_id, dropCaps, paragraphSize } = attributes;
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<RichText.Content
					tagName="p"
					className={ classNames(
						'ablocks-paragraph-text',
						`ablocks-paragraph-text-${ paragraphSize }`,
						{
							'ablocks-paragraph-text-drop-caps': dropCaps,
						}
					) }
					value={ attributes.paragraph }
				/>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
