import React from 'react';
import { __ } from '@wordpress/i18n';
import AblocksRichText from '@Components/rich-text';

const SubHeadingRender = ( props ) => {
	const { attributes, setAttributes } = props;
	const { subHeadingTag } = attributes;

	return (
		<React.Fragment>
			<AblocksRichText
				tagName={ subHeadingTag }
				value={ attributes.subHeading }
				className={ 'ablocks-info-box-sub-heading' }
				onChange={ ( subHeading ) => setAttributes( { subHeading } ) }
				placeholder={ __( 'Enter your subHeading..', 'ablocks' ) }
			/>
		</React.Fragment>
	);
};

export default SubHeadingRender;
