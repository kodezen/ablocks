import { __experimentalBlockVariationPicker as BlockVariationPicker } from '@wordpress/block-editor'; // eslint-disable-line @wordpress/no-unsafe-wp-apis
import { useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { academyContainerVariations } from './variations';

export const VariationPicker = ( {
	clientId,
	setAttributes,
	defaultVariation = academyContainerVariations[ 0 ],
} ) => {
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	const onSelectVariation = ( variation = defaultVariation ) => {
		if ( variation.attributes ) {
			setAttributes( {
				...variation.attributes,
				variationSelected: true,
			} );
		}

		if ( variation.innerBlocks ) {
			replaceInnerBlocks(
				clientId,
				createBlocksFromInnerBlocksTemplate( variation.innerBlocks )
			);
		}
	};

	return (
		<div className="ablocks-academy-variation-picker">
			<BlockVariationPicker
				label={ __( 'Choose float layout', 'ablocks' ) }
				instructions=""
				variations={ academyContainerVariations }
				onSelect={ onSelectVariation }
			/>
		</div>
	);
};
