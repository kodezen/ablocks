import React from 'react';
import ABlocksToggleControl from '@Controls/toggleButton';

const SwitchSubHeading = ( props ) => {
	const { attributes, setAttributes } = props;
	const { allowSubHeading } = attributes;
	return (
		<ABlocksToggleControl
			isResponsive={ false }
			attributeValue={ allowSubHeading }
			setAttributes={ setAttributes }
			attributeName="allowSubHeading"
		/>
	);
};

export default SwitchSubHeading;
