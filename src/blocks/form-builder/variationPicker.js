import { __experimentalBlockVariationPicker as BlockVariationPicker } from '@wordpress/block-editor'; // eslint-disable-line @wordpress/no-unsafe-wp-apis
import { useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { variations } from './variations';

export const VariationPicker = ( props ) => {
	const { clientId, setAttributes, defaultVariation } = props;
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );
	const blockVariationPickerOnSelect = (
		nextVariation = defaultVariation
	) => {
		if ( nextVariation.attributes ) {
			setAttributes( {
				...nextVariation.attributes,
				variationSelected: false,
				formType: nextVariation.name,
				formActions: nextVariation.attributes.formActions || '',
			} );
		}

		if ( nextVariation.innerBlocks ) {
			replaceInnerBlocks(
				clientId,
				createBlocksFromInnerBlocksTemplate( nextVariation.innerBlocks )
			);
		}
	};
	return (
		<div className="ablocks-form-builder-block-variation-picker">
			<span
				className="ablocks-variation-picker-delete-button ablocks-icon ablocks-icon--close"
				onClick={ () =>
					wp.data
						.dispatch( 'core/block-editor' )
						.removeBlock( clientId )
				}
				role="presentation"
			/>

			<BlockVariationPicker
				label={ __( 'Please Select a Form Type', 'ablocks' ) }
				variations={ variations }
				onSelect={ ( nextVariation ) =>
					blockVariationPickerOnSelect( nextVariation )
				}
			/>
		</div>
	);
};
