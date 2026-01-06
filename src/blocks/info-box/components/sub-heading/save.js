import React from 'react';
import { RichText } from '@wordpress/block-editor';

const SubHeadingSave = ( props ) => {
	const { attributes } = props;
	const { subHeadingTag } = attributes;
	return (
		<React.Fragment>
			<RichText.Content
				tagName={ subHeadingTag }
				className="ablocks-info-box-sub-heading"
				value={ attributes.subHeading }
			/>
		</React.Fragment>
	);
};

export default SubHeadingSave;
