import { BaseControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

const ImageRadioControl = ( { label, selectedImage, options, onChange } ) => {
	const [ selected, setSelected ] = useState( selectedImage );
	useEffect( () => {
		if ( selectedImage ) {
			setSelected( selectedImage );
		}
	}, [ selectedImage ] );

	const handleSelection = ( value, optionLabel ) => {
		setSelected( value );
		onChange( optionLabel, value );
	};
	const controlId = `image-radio-control-${ label
		.replace( /\s+/g, '-' )
		.toLowerCase() }`;
	return (
		<BaseControl label={ label } id={ controlId }>
			<div className="ablocks-block--certificate__image-radio-control">
				{ options.map( ( option ) => (
					<div
						role="presentation"
						key={ option.value }
						className={ `ablocks-block--certificate__image-radio-control__image-option ${
							selected === option.value ? 'selected' : ''
						}` }
						onClick={ () =>
							handleSelection( option.value, option.label )
						}
					>
						<img src={ option.value } alt={ option.label } />
					</div>
				) ) }
			</div>
		</BaseControl>
	);
};

export default ImageRadioControl;
