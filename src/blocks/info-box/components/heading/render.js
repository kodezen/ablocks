import React from 'react';
import { __ } from '@wordpress/i18n';
import AblocksRichText from '@Components/rich-text';

const HeadingRender = ( props ) => {
	const { attributes, setAttributes } = props;
	const { headingTag } = attributes;

	return (
		<AblocksRichText
			tagName={ headingTag }
			value={ attributes.heading }
			onChange={ ( heading ) => setAttributes( { heading } ) }
			placeholder={ __( 'Enter your heading..', 'ablocks' ) }
			className={ 'ablocks-info-box-heading' }
		/>
	);
};

export default HeadingRender;
