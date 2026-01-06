import React, { useRef } from 'react';
import { __ } from '@wordpress/i18n';
import Image from './Image';
import { RichText } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

const propTypes = {};

export default function Layouts( props ) {
	const ref = useRef();
	const { setAttributes, attributes, context, addCaptionRef } = props;
	const {
		imgUrl,
		caption,
		imgCaption,
		imgLink: { linkDestination, href, linkTarget },
	} = attributes;

	// eslint-disable-next-line
	let parsedImageUrl = applyFilters(
		`ablocks.dynamic_content.get_dynamic_value`,
		{
			context,
			attributeValue: imgUrl,
		}
	);

	const changeHandler = ( newValue, attributeName ) => {
		return setAttributes( {
			[ attributeName ]: newValue,
		} );
	};

	const handlePreventLink = ( event ) => {
		event.preventDefault();
	};

	let layout;

	if ( parsedImageUrl ) {
		layout = <Image { ...props } containerRef={ ref } />;
	}
	if ( parsedImageUrl && linkDestination === 'custom' ) {
		layout = (
			<a
				href={ href }
				target={ linkTarget }
				onClick={ handlePreventLink }
			>
				<Image { ...props } containerRef={ ref } />
			</a>
		);
	}
	if ( parsedImageUrl && imgCaption ) {
		layout = (
			<>
				<Image { ...props } containerRef={ ref } />
				<RichText
					tagName="figcaption"
					className="ablocks-image-caption"
					aria-label={ __( 'Image caption text', 'ablocks' ) }
					placeholder={ __( 'Add caption', 'ablocks' ) }
					value={ caption }
					ref={ addCaptionRef }
					onChange={ ( value ) => changeHandler( value, 'caption' ) }
				/>
			</>
		);
	}
	if ( parsedImageUrl && imgCaption && linkDestination === 'custom' ) {
		layout = (
			<a
				href={ href }
				target={ linkTarget }
				onClick={ handlePreventLink }
			>
				<Image { ...props } containerRef={ ref } />
				<RichText
					tagName="figcaption"
					className="ablocks-image-caption"
					aria-label={ __( 'Image caption text', 'ablocks' ) }
					placeholder={ __( 'Add caption', 'ablocks' ) }
					value={ caption }
					onChange={ ( value ) => changeHandler( value, 'caption' ) }
				/>
			</a>
		);
	}

	return (
		<figure className="ablocks-image-figure" ref={ ref }>
			{ ( imgUrl || '' ).startsWith( 'ablocks_dc:' ) &&
			! parsedImageUrl ? (
				<h2>No Data</h2>
			) : (
				layout
			) }
		</figure>
	);
}

Layouts.propTypes = propTypes;
