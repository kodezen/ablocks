import React from 'react';
import { RichText } from '@wordpress/block-editor';
import classNames from 'classnames';

const ParagraphSave = ( props ) => {
	const { attributes } = props;
	const { desDropCaps, desSize } = attributes;
	return (
		<React.Fragment>
			<RichText.Content
				tagName="p"
				className={ classNames(
					'ablocks-info-box-text',
					`ablocks-info-box-text-${ desSize }`,
					{
						'ablocks-info-box-text-drop-caps': desDropCaps,
					}
				) }
				value={ attributes.des }
			/>
		</React.Fragment>
	);
};

export default ParagraphSave;
