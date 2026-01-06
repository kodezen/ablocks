import { __experimentalBlockVariationPicker as BlockVariationPicker } from '@wordpress/block-editor'; // eslint-disable-line @wordpress/no-unsafe-wp-apis
import { __ } from '@wordpress/i18n';
import { variations } from './variations';

export const VariationPicker = ( props ) => {
	const { clientId, setAttributes, defaultVariation } = props;
	const blockVariationPickerOnSelect = (
		nextVariation = defaultVariation
	) => {
		if ( nextVariation.attributes ) {
			const tempIconPlacement = {
				value: '',
				valueTablet: '',
				valueMobile: '',
			};
			tempIconPlacement.value =
				nextVariation.attributes.variationSelected;
			setAttributes( {
				alignment: nextVariation.attributes.contentAlignment,
				iconPlacement: tempIconPlacement,
				iconAlignment: nextVariation.attributes.iconAlignment,
			} );
		}
	};
	return (
		<div className="ablocks-info-box-block-variation-picker">
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
				label={ __( 'Select, Customize, Shine Bright!', 'ablocks' ) }
				instructions={ __( '', 'ablocks' ) }
				variations={ variations }
				onSelect={ ( nextVariation ) =>
					blockVariationPickerOnSelect( nextVariation )
				}
			/>
		</div>
	);
};
