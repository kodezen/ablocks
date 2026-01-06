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
import ControlLabel from '@Components/control-label';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import Separator from '@Components/separator';
import { IncludeExcludeOptions } from './includeExcludeOptions';
import {
	course_column_options,
	course_difficulty_level_options,
	price_type_options,
	order_by_options,
	order_options,
} from './helper';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes, academyTerms } = props;
	const {
		course_columns,
		show_pagination,
		difficulty_levels = '',
		price_types = '',
		order_by,
		course_order,
		cat_typography,
		category_color,
		category_hover_color,
		title_typography,
		title_color,
		title_hover_color,
		author_typography,
		author_color,
		author_hover_color,
		rating_typography,
		rating_color,
		rating_hover_color,
		price_typography,
		price_color,
		price_hover_color,
		card_background,
		card_border,
		card_margin,
		card_hover_margin,
		card_padding,
		card_hover_padding,
		wish_icon_background,
		wish_icon_color,
		wish_icon_hover_color,
	} = attributes;

	const includeExcludeProps = {
		attributes,
		setAttributes,
		academyTerms,
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
							options={ course_column_options }
							label={ __( 'Course Columns', 'ablocks' ) }
							attributeValue={ course_columns }
							attributeName={ 'course_columns' }
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
						title={ __( 'Course Query', 'academy-blocks' ) }
						initialOpen={ true }
					>
						<ABlocksRangeControl
							label={ __( 'Courses Per Page', 'ablocks' ) }
							min={ 0 }
							max={ 1000 }
							hasUnit={ false }
							isInline={ false }
							isResponsive={ false }
							attributeName="course_count"
							attributeValue={ attributes }
							setAttributes={ setAttributes }
							attributeObjectKey="course_count"
						/>
						<ABlocksSelectControl
							isMulti
							options={ course_difficulty_level_options }
							label={ __( 'Difficulty Level', 'ablocks' ) }
							attributeValue={ difficulty_levels }
							attributeName={ 'difficulty_levels' }
							setAttributes={ setAttributes }
						/>
						<ABlocksSelectControl
							isMulti
							options={ price_type_options }
							label={ __( 'Price Type', 'ablocks' ) }
							attributeValue={ price_types }
							attributeName={ 'price_types' }
							setAttributes={ setAttributes }
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
							attributeValue={ course_order }
							attributeName={ 'course_order' }
							setAttributes={ setAttributes }
						/>
						<ABlocksTabsControl tabs={ includeExcludeTabs } />
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Course Card', 'academy-blocks' ) }
						initialOpen={ false }
					>
						<ControlLabel
							label="Category"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="cat_typography"
							attributeValue={ cat_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="category_color"
							attributeValue={ category_color }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Hover color', 'ablocks' ) }
							isGradient={ false }
							attributeName="category_hover_color"
							attributeValue={ category_hover_color }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Title"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="title_typography"
							attributeValue={ title_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="title_color"
							attributeValue={ title_color }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Hover color', 'ablocks' ) }
							isGradient={ false }
							attributeName="title_hover_color"
							attributeValue={ title_hover_color }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Author"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="author_typography"
							attributeValue={ author_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="author_color"
							attributeValue={ author_color }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Hover color', 'ablocks' ) }
							isGradient={ false }
							attributeName="author_hover_color"
							attributeValue={ author_hover_color }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Rating"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="rating_typography"
							attributeValue={ rating_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="rating_color"
							attributeValue={ rating_color }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Hover color', 'ablocks' ) }
							isGradient={ false }
							attributeName="rating_hover_color"
							attributeValue={ rating_hover_color }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Price"
							isResponsive={ false }
							isHeader={ true }
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
						<ABlocksColorControl
							label={ __( 'Hover color', 'ablocks' ) }
							isGradient={ false }
							attributeName="price_hover_color"
							attributeValue={ price_hover_color }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Margin Padding"
							isResponsive={ false }
							isHeader={ true }
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
						title={ __( 'Course Style', 'academy-blocks' ) }
						initialOpen={ false }
					>
						<ABlocksBackgroundControl
							isResponsive={ true }
							attributeName="card_background"
							attributeValue={ card_background }
							setAttributes={ setAttributes }
						/>
						<Separator />
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
						title={ __( 'Wishlist Style', 'academy-blocks' ) }
						initialOpen={ false }
					>
						<ControlLabel
							label="Color"
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<ABlocksColorControl
									label={ __( 'Color', 'ablocks' ) }
									isGradient={ false }
									attributeName="wish_icon_color"
									attributeValue={ wish_icon_color }
									setAttributes={ setAttributes }
								/>
							}
							hover={
								<ABlocksColorControl
									label={ __( 'Hover Color', 'ablocks' ) }
									isGradient={ false }
									attributeName="wish_icon_hover_color"
									attributeValue={ wish_icon_hover_color }
									setAttributes={ setAttributes }
								/>
							}
						/>
						<ControlLabel
							label="Background"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBackgroundControl
							isResponsive={ true }
							attributeName="wish_icon_background"
							attributeValue={ wish_icon_background }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
