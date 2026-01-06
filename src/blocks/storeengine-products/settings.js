import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksSelectControl from '@Controls/select';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTabsControl from '@Components/tabs-control';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksBackgroundControl from '@Controls/background';
import ABlocksBorderControl from '@Controls/border';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import Separator from '@Components/separator';
import { IncludeExcludeOptions } from './includeExcludeOptions';
import ControlLabel from '@Components/control-label';
import {
	products_column_options,
	order_by_options,
	order_options,
} from './helper';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes, storeEngineTerms } = props;
	const {
		products_columns,
		show_pagination,
		order_by,
		products_count,
		products_order,
		title_typography,
		title_color,
		title_hover_color,
		price_typography,
		price_color,
		card_background,
		card_border,
		card_margin,
		card_hover_margin,
		card_padding,
		card_hover_padding,
		cart_button_typography,
		cart_button_color,
		cart_button_hover_color,
		cart_button_text_hover_color,
		cart_button_text_color,
		buttonWidth,
	} = attributes;

	const includeExcludeProps = {
		attributes,
		setAttributes,
		storeEngineTerms,
	};
	const includeExcludeTabs = [
		{
			title: 'Include',
			name: 'include',
			render: (
				<IncludeExcludeOptions
					type="include"
					{ ...includeExcludeProps }
				/>
			),
		},
		{
			title: 'Exclude',
			name: 'exclude',
			render: (
				<IncludeExcludeOptions
					type="exclude"
					{ ...includeExcludeProps }
				/>
			),
		},
	];

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Layout Options', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksSelectControl
							options={ products_column_options }
							label={ __( 'Products Columns', 'ablocks' ) }
							attributeValue={ products_columns }
							attributeName={ 'products_columns' }
							setAttributes={ setAttributes }
						/>
						<ABlocksToggleControl
							isResponsive={ false }
							label="Show Pagination"
							attributeValue={ show_pagination }
							setAttributes={ setAttributes }
							attributeName="show_pagination"
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Product Query', 'storeEngine-blocks' ) }
						initialOpen={ false }
					>
						<ABlocksRangeControl
							label={ __( 'Product Per Page', 'ablocks' ) }
							min={ 1 }
							max={ 1000 }
							hasUnit={ false }
							isInline={ false }
							isResponsive={ false }
							attributeName="products_count"
							attributeValue={ products_count }
							setAttributes={ setAttributes }
							attributeObjectKey="products_count"
						/>
						<ABlocksSelectControl
							options={ order_by_options }
							label={ __( 'Order By', 'ablocks' ) }
							attributeValue={ order_by }
							attributeName={ 'order_by' }
							setAttributes={ setAttributes }
						/>
						<ABlocksSelectControl
							options={ order_options }
							label={ __( 'Order', 'ablocks' ) }
							attributeValue={ products_order }
							attributeName={ 'products_order' }
							setAttributes={ setAttributes }
						/>
						<ABlocksTabsControl tabs={ includeExcludeTabs } />
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Products Card', 'storeEngine-blocks' ) }
						initialOpen={ false }
					>
						<ControlLabel
							label="Product Title"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="title_typography"
							attributeValue={ title_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="title_color"
										attributeValue={ title_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Hover color', 'ablocks' ) }
										isGradient={ false }
										attributeName="title_hover_color"
										attributeValue={ title_hover_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Price"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="price_typography"
							attributeValue={ price_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="price_color"
							attributeValue={ price_color }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Margin , Padding"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksDimensions
										label={ __( 'Margin', 'ablocks' ) }
										isResponsive={ false }
										attributeName="card_margin"
										attributeValue={ card_margin }
										setAttributes={ setAttributes }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ false }
										attributeName="card_padding"
										attributeValue={ card_padding }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksDimensions
										label={ __( 'Margin', 'ablocks' ) }
										isResponsive={ false }
										attributeName="card_hover_margin"
										attributeValue={ card_hover_margin }
										setAttributes={ setAttributes }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ false }
										attributeName="card_hover_padding"
										attributeValue={ card_hover_padding }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __(
							'Products Background',
							'storeEngine-blocks'
						) }
						initialOpen={ false }
					>
						<ABlocksBackgroundControl
							isResponsive={ true }
							attributeName="card_background"
							attributeValue={ card_background }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Products Border', 'storeEngine-blocks' ) }
						initialOpen={ false }
					>
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="card_border"
							attributeValue={ card_border }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __(
							'Products Cart Button',
							'storeEngine-blocks'
						) }
						initialOpen={ false }
					>
						<ABlocksRangeControl
							label={ __( 'Width', 'ablocks' ) }
							min={ 0 }
							unitValue={ buttonWidth }
							hasUnit={ true }
							isInline={ false }
							isResponsive={ true }
							attributeName="buttonWidth"
							attributeValue={ buttonWidth }
							setAttributes={ setAttributes }
						/>

						<ABlocksTypography
							label={ __( 'Button Typography', 'ablocks' ) }
							attributeName="cart_button_typography"
							attributeValue={ cart_button_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Text Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="cart_button_text_color"
										attributeValue={
											cart_button_text_color
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										isGradient={ false }
										attributeName="cart_button_color"
										attributeValue={ cart_button_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __(
											'Text Hover Color',
											'ablocks'
										) }
										isGradient={ false }
										attributeName="cart_button_text_hover_color"
										attributeValue={
											cart_button_text_hover_color
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Hover Color',
											'ablocks'
										) }
										isGradient={ false }
										attributeName="cart_button_hover_color"
										attributeValue={
											cart_button_hover_color
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
