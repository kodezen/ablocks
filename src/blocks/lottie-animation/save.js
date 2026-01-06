import React from 'react';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save2';

const propTypes = {};
const defaultProps = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		animationSource = 'default',
		asset_url,
		custom_url,
		uploaded_json,
		trigger,
		loop,
		reverse,
		animationSpeed,
	} = attributes;

	// Determine which URL to use based on the animation source
	const getAnimationUrl = () => {
		switch ( animationSource ) {
			case 'custom':
				return custom_url;
			case 'upload':
				return uploaded_json?.url;
			case 'default':
			default:
				return asset_url;
		}
	};

	const animationUrl = getAnimationUrl();

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div
					className="ablocks-lottie-container"
					data-animation-source={ animationSource }
					data-asset-url={ animationUrl }
					data-trigger={ trigger }
					data-loop={ loop }
					data-reverse={ reverse }
					data-animation-speed={ animationSpeed }
				></div>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
Save.defaultProps = defaultProps;
