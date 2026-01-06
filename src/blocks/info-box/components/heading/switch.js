import React from 'react';
import ABlocksToggleControl from '@Controls/toggleButton';

const SwitchHeading = ( props ) => {
	const { attributes, setAttributes } = props;
	const { allowHeading } = attributes;
	return (
		<ABlocksToggleControl
			isResponsive={ false }
			attributeValue={ allowHeading }
			setAttributes={ setAttributes }
			attributeName="allowHeading"
		/>
	);
};

export default SwitchHeading;
