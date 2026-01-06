import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import AblocksRichText from '@Components/rich-text';

const ParagraphRender = ( props ) => {
	const { attributes, setAttributes } = props;
	const { des, desTag, desDropCaps, desSize } = attributes;

	return (
		<AblocksRichText
			tagName={ desTag || 'p' }
			value={ des }
			placeholder={ __( 'Enter your text..', 'ablocks' ) }
			onChange={ ( changeParagraph ) =>
				setAttributes( { des: changeParagraph } )
			}
			className={ classNames(
				'ablocks-info-box-text',
				`ablocks-info-box-text-${ desSize }`,
				{ 'ablocks-info-box-text-drop-caps': desDropCaps }
			) }
		/>
	);
};

export default ParagraphRender;
