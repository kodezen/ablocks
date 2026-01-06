import { __experimentalBlockVariationPicker as BlockVariationPicker } from '@wordpress/block-editor'; // eslint-disable-line @wordpress/no-unsafe-wp-apis
import { useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { variationsFlex, variationsGrid } from './variations';
import { useState } from '@wordpress/element';

export const VariationPicker = ( {
	clientId,
	setAttributes,
	defaultVariation,
} ) => {
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );
	const [ layoutType, setlayoutType ] = useState( '' );

	// Handle layout selection
	const handlelayoutSelection = ( type ) => {
		setlayoutType( type );
		setAttributes( { layout: type } );
	};

	// Handle block variation selection
	const blockVariationPickerOnSelect = (
		nextVariation = defaultVariation
	) => {
		if ( nextVariation.attributes ) {
			setAttributes( {
				...nextVariation.attributes,
				variationSelected: true,
			} );
		}
		if (
			nextVariation.innerBlocks &&
			nextVariation.name !== 'one-column'
		) {
			replaceInnerBlocks(
				clientId,
				createBlocksFromInnerBlocksTemplate( nextVariation.innerBlocks )
			);
		}
	};

	// Handle Close
	const closePicker = () => {
		wp.data.dispatch( 'core/block-editor' ).removeBlock( clientId );
	};

	// Handle Back to layout Selection
	const resetlayoutSelection = () => {
		setlayoutType( '' );
	};

	return (
		<div className="ablocks-container-block-variation-picker">
			{ layoutType && (
				<div className="ablocks-container-block-variation-chose-icon-wrapper">
					<span
						className="ablocks-icon ablocks-icon--close"
						onClick={ closePicker }
						role="presentation"
					/>
					<span
						className="ablocks-icon ablocks-icon--angle-left"
						onClick={ resetlayoutSelection }
						role="presentation"
					/>
				</div>
			) }
			{ ! layoutType && (
				<div className="ablocks-container-block-variation-chose">
					<span
						className="ablocks-icon ablocks-icon--close"
						onClick={ closePicker }
						role="presentation"
					/>
					<h3 className="ablocks-container-block-variation-picker-title">
						Which layout would you like to use?
					</h3>

					{ /* layout Selection */ }
					{ ! layoutType && (
						<div className="ablocks-layout-selector-wrapper">
							<div
								className="ablocks-layout-selector"
								onClick={ () =>
									handlelayoutSelection( 'flexBox' )
								}
							>
								<span className="ablocks-icon ablocks-icon--flexbox-svg-icon"></span>
								<span className="ablocks-icon-title">
									Flexbox
								</span>
							</div>
							<div
								className="ablocks-layout-selector"
								onClick={ () =>
									handlelayoutSelection( 'grid' )
								}
							>
								<span className="ablocks-icon ablocks-icon--grid"></span>
								<span className="ablocks-icon-title">Grid</span>
							</div>
						</div>
					) }
				</div>
			) }
			{ /* Show Variations based on Selection */ }
			{ layoutType === 'flexBox' && (
				<BlockVariationPicker
					label={ __( 'Choose Container layout', 'ablocks' ) }
					instructions={ __( '', 'ablocks' ) }
					variations={ variationsFlex }
					onSelect={ blockVariationPickerOnSelect }
				/>
			) }
			{ layoutType === 'grid' && (
				<div className="ablocks-variation-picker-grid">
					<BlockVariationPicker
						label={ __( 'Choose Grid layout', 'ablocks' ) }
						instructions={ __( '', 'ablocks' ) }
						variations={ variationsGrid }
						onSelect={ blockVariationPickerOnSelect }
					/>
				</div>
			) }
		</div>
	);
};
