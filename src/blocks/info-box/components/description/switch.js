import React from 'react';
import ABlocksToggleControl from '@Controls/toggleButton';

const SwitchParagraph = ( props ) => {
	const { attributes, setAttributes } = props;
	const { allowDes } = attributes;
	return (
		<ABlocksToggleControl
			isResponsive={ false }
			attributeValue={ allowDes }
			setAttributes={ setAttributes }
			attributeName="allowDes"
		/>
	);
};

export default SwitchParagraph;
