import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksSelectControl from '@Controls/select';

export const IncludeExcludeOptions = ( {
	type,
	attributes,
	setAttributes,
	academyTerms,
} ) => {
	let idsLabel = 'Course Ids';
	let idsAttributeName = 'course_ids';
	let idsAttributeValue = attributes?.course_ids || '';

	let catsLabel = 'Course Categories';
	let catsAttributeName = 'course_categories';
	let catsAttributeValue = attributes?.course_categories || '';

	let tagsLabel = 'Course Tags';
	let tagsAttributeName = 'course_tags';
	let tagsAttributeValue = attributes?.course_tags || '';

	if ( type === 'exclude' ) {
		idsLabel = 'Exclude Course Ids';
		idsAttributeName = 'course_exclude_ids';
		idsAttributeValue = attributes?.course_exclude_ids || '';

		catsLabel = 'Exclude Course Categories';
		catsAttributeName = 'course_exclude_categories';
		catsAttributeValue = attributes?.course_exclude_categories || '';

		tagsLabel = 'Exclude Course Tags';
		tagsAttributeName = 'course_exclude_tags';
		tagsAttributeValue = attributes?.course_exclude_tags || '';
	}

	const categories = academyTerms.categories || [];
	const tags = academyTerms.tags || [];

	return (
		<div className="ablocks-course-settings-include-exclude-options">
			<ABlocksTextareaControl
				label={ idsLabel }
				attributeName={ idsAttributeName }
				attributeValue={ idsAttributeValue }
				onChangeHandler={ ( value ) =>
					setAttributes( {
						[ idsAttributeName ]: value || undefined,
					} )
				}
				placeholder={ __( "Enter Course id's separated by comma" ) }
			/>
			<i>Enter Course id&apos;s separated by comma</i>

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
