import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ComboboxControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksTextControl from '@Controls/text';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksNumberControl from '@Controls/number';

const propTypes = {};

export default function Settings( { attributes, setAttributes, context } ) {
	const {
		metaKey = '',
		linkAdd = false,
		trimMode,
		trimLimit,
		trimEndSymbol,
		dynamicTextColor,
		dynamicTypography,
		alignment,
	} = attributes;

	React.useLayoutEffect( () => {
		if ( ! metaKey ) {
			setAttributes( { metaKey: 'core:title' } );
		}
	}, [] );

	const editorPostType = useSelect(
		( s ) => s( 'core/editor' )?.getCurrentPostType?.() || '',
		[]
	);
	const effectivePostType = context?.postType || editorPostType || '';

	const taxonomies = useSelect(
		( select ) => {
			if ( ! effectivePostType ) {
				return [];
			}
			const all =
				select( 'core' )?.getTaxonomies( { per_page: -1 } ) || [];
			return all.filter(
				( t ) =>
					Array.isArray( t.types ) &&
					t.types.includes( effectivePostType )
			);
		},
		[ effectivePostType ]
	);

	const CORE_OPTIONS = [
		{ label: 'Title', value: 'core:title' },
		{ label: 'Content', value: 'core:content' },
		{ label: 'Excerpt', value: 'core:excerpt' },
		{ label: 'Date (published)', value: 'core:date' },
		{ label: 'Date (Modified)', value: 'core:last_modified' },
		{ label: 'Permalink', value: 'core:permalink' },
		{ label: 'Author Name', value: 'core:author' },
	];

	const TAX_OPTIONS = ( taxonomies || [] ).flatMap( ( t ) => [
		{
			label: `[Tax] ${ t.labels?.name || t.name } (Names)`,
			value: `__tax:${ t.slug }:names`,
		},
	] );

	const BASE_OPTIONS = React.useMemo( () => {
		const combined = [ ...CORE_OPTIONS, ...TAX_OPTIONS ];
		const exists = combined.some( ( o ) => o.value === metaKey );
		return exists || ! metaKey
			? combined
			: [ { label: `[Meta] ${ metaKey }`, value: metaKey }, ...combined ];
	}, [ metaKey, taxonomies ] );

	return (
		<InspectorControls>
			<InspectorTabs
				attributes={ attributes }
				setAttributes={ setAttributes }
			>
				<ABlocksPanelBody
					title={ __( 'Field / Meta', 'ablocks' ) }
					initialOpen
				>
					<ContentStyleTabs
						content={
							<>
								<ComboboxControl
									className="dynamic-text-control"
									__nextHasNoMarginBottom
									label={ __(
										'Field / Taxonomy',
										'ablocks'
									) }
									value={ metaKey || 'core:title' }
									onChange={ ( val ) =>
										setAttributes( {
											metaKey: val || 'core:title',
										} )
									}
									options={ BASE_OPTIONS }
								/>

								<ABlocksToggleControl
									isResponsive={ false }
									label={ __(
										'Trim Mode (words)',
										'ablocks'
									) }
									attributeValue={ trimMode }
									setAttributes={ setAttributes }
									attributeName="trimMode"
								/>
								{ !! trimMode && (
									<>
										<ABlocksNumberControl
											label={ __(
												'Word Limit',
												'ablocks'
											) }
											attributeName="trimLimit"
											attributeValue={ trimLimit }
											setAttributes={ setAttributes }
											min={ 1 }
											isInline={ true }
											disableDynamicContent
										/>
										<ABlocksTextControl
											label={ __(
												'End Symbol',
												'ablocks'
											) }
											attributeName="trimEndSymbol"
											attributeValue={ trimEndSymbol }
											setAttributes={ setAttributes }
											isInline={ false }
											disableDynamicContent
											placeholder="…"
										/>
									</>
								) }

								{ /* Link toggle */ }
								<ABlocksToggleControl
									isResponsive={ false }
									label={ __( 'Enable Link', 'ablocks' ) }
									attributeValue={ linkAdd }
									setAttributes={ setAttributes }
									attributeName="linkAdd"
								/>
							</>
						}
						style={
							<>
								<ABlocksColorControl
									label={ __( 'Color', 'ablocks' ) }
									isGradient={ true }
									attributeName="dynamicTextColor"
									attributeValue={ dynamicTextColor }
									setAttributes={ setAttributes }
								/>
								<ABlocksTypography
									label={ __( 'Typography', 'ablocks' ) }
									attributeName="dynamicTypography"
									attributeValue={ dynamicTypography }
									setAttributes={ setAttributes }
									isResponsive={ true }
									attributes={ attributes }
								/>
								<ABlocksAlignmentControl
									label={ __( 'Alignment', 'ablocks' ) }
									attributeName="alignment"
									attributeValue={ alignment }
									setAttributes={ setAttributes }
									isInline={ false }
								/>
							</>
						}
					/>
				</ABlocksPanelBody>
			</InspectorTabs>
		</InspectorControls>
	);
}

Settings.propTypes = propTypes;
