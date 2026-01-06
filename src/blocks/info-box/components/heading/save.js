import React from 'react';
import { RichText } from '@wordpress/block-editor';

const HeadingSave = ( props ) => {
	const { attributes } = props;
	const { headingTag } = attributes;
	return (
		<React.Fragment>
			<RichText.Content
				tagName={ headingTag }
				className="ablocks-info-box-heading"
				value={ attributes.heading }
			/>
		</React.Fragment>
	);
};

export default HeadingSave;
