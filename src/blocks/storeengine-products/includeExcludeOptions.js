import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksSelectControl from '@Controls/select';

export const IncludeExcludeOptions = ( {
	type,
	attributes,
	setAttributes,
	storeEngineTerms,
} ) => {
	let idsLabel = 'products Ids';
	let idsAttributeName = 'products_ids';
	let idsAttributeValue = attributes?.products_ids || '';

	let catsLabel = 'products Categories';
	let catsAttributeName = 'products_categories';
	let catsAttributeValue = attributes?.products_categories || '';

	let tagsLabel = 'products Tags';
	let tagsAttributeName = 'products_tags';
	let tagsAttributeValue = attributes?.products_tags || '';

	if ( type === 'exclude' ) {
		idsLabel = 'Exclude products Ids';
		idsAttributeName = 'products_exclude_ids';
		idsAttributeValue = attributes?.products_exclude_ids || '';

		catsLabel = 'Exclude products Categories';
		catsAttributeName = 'products_exclude_categories';
		catsAttributeValue = attributes?.products_exclude_categories || '';

		tagsLabel = 'Exclude products Tags';
		tagsAttributeName = 'products_exclude_tags';
		tagsAttributeValue = attributes?.products_exclude_tags || '';
	}

	const categories = storeEngineTerms.categories || [];
	const tags = storeEngineTerms.tags || [];

	return (
		<div className="ablocks-products-settings-include-exclude-options">
			<ABlocksTextareaControl
				label={ idsLabel }
				attributeName={ idsAttributeName }
				attributeValue={ idsAttributeValue }
				onChangeHandler={ ( value ) =>
					setAttributes( {
						[ idsAttributeName ]: value || undefined,
					} )
				}
				placeholder={ __( "Enter products id's separated by comma" ) }
				disableDynamicContent={ true }
			/>
			<i>Enter products id&apos;s separated by comma</i>

			<ABlocksSelectControl
				isMulti
				options={ categories }
				label={ catsLabel }
				attributeValue={ catsAttributeValue || [] }
				attributeName={ catsAttributeName }
				setAttributes={ setAttributes }
			/>

			<ABlocksSelectControl
				isMulti
				options={ tags }
				label={ tagsLabel }
				attributeValue={ tagsAttributeValue || [] }
				attributeName={ tagsAttributeName }
				setAttributes={ setAttributes }
			/>
		</div>
	);
};
