import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import { InspectorControls } from '@wordpress/block-editor';
import SelectParentBlockButton from '@Components/select-parent-block';
import { useSelect } from '@wordpress/data';
import ABlocksSelectControl from '@Controls/select';
const propTypes = {};
export default function Settings( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { dataCategory } = attributes;
	const parentFilterableAttributes = useSelect(
		( select ) => {
			const { getBlock, getBlockParents } = select( 'core/block-editor' );
			const parentIds = getBlockParents( clientId );
			if ( ! parentIds.length ) {
				return null;
			}
			for ( const parentId of parentIds ) {
				const parentBlock = getBlock( parentId );
				if ( parentBlock?.name === 'ablocks/filterable-cards' ) {
					return parentBlock.attributes;
				}
			}

			return null;
		},
		[ clientId ]
	);

	const dynamicOptions =
		parentFilterableAttributes?.filterList &&
		Array.isArray( parentFilterableAttributes.filterList )
			? parentFilterableAttributes.filterList.map( ( item ) => ( {
					label: item.text || 'all',
					value: item.text || '',
			  } ) )
			: [];
	return (
		<React.Fragment>
			<InspectorControls>
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __(
									'Explore Filterable Blocks Options',
									'ablocks'
								) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'Access the Filterable block setting to customize menus for easy navigation.',
									'ablocks'
								) }
							</span>
						</div>
						<SelectParentBlockButton clientId={ clientId } />
					</div>
				</ABlocksPanelBody>
			</InspectorControls>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Filterable Controls', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksSelectControl
							min={ 0 }
							label={ __( 'Control Name', 'ablocks' ) }
							attributeName="dataCategory"
							options={ dynamicOptions }
							attributeValue={ dataCategory }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
