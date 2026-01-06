import React from 'react';
import ABlocksToggleControl from '@Controls/toggleButton';

const SwitchButton = ( props ) => {
	const { attributes, setAttributes } = props;
	const { allowButton } = attributes;
	return (
		<ABlocksToggleControl
			isResponsive={ false }
			attributeValue={ allowButton }
			setAttributes={ setAttributes }
			attributeName="allowButton"
		/>
	);
};

export default SwitchButton;
