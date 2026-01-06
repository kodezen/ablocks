import React from 'react';
import ABlocksToggleControl from '@Controls/toggleButton';

const SwitchIcon = ( props ) => {
	const { attributes, setAttributes } = props;
	const { allowIcon } = attributes;
	return (
		<ABlocksToggleControl
			isResponsive={ false }
			attributeValue={ allowIcon }
			setAttributes={ setAttributes }
			attributeName="allowIcon"
		/>
	);
};

export default SwitchIcon;
