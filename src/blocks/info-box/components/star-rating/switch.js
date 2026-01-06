import React from 'react';
import ABlocksToggleControl from '@Controls/toggleButton';

const SwitchRating = ( props ) => {
	const { attributes, setAttributes } = props;
	const { allowRating } = attributes;
	return (
		<ABlocksToggleControl
			isResponsive={ false }
			attributeValue={ allowRating }
			setAttributes={ setAttributes }
			attributeName="allowRating"
		/>
	);
};

export default SwitchRating;
