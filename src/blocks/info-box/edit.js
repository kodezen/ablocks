import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getWrapperCSS as getIconWrapperCSS,
	getElementCSS as getIconElementCSS,
	getElementImageCSS as getIconElementImageCSS,
	//RatingIcon
	getWrapperCSS as getStarIconWrapperCSS,
	//ButtonIcon
	getWrapperCSS as getBtnIconWrapperCSS,
	getElementCSS as getBtnIconElementCSS,
	getElementImageHoverCSS,
} from '@Controls/icon-upload/helper';
import {
	getWrapperCSS,
	get_info_box,
	get_badge_css,
	get_badge_hover_css,
	get_badge_text_css,
	get_icon_wrapper_extra_css,
	get_icon_css_hover,
	get_icon_background_css_hover,
	get_info_box_content,
	get_heading_text_css,
	get_heading_text_css_hover,
	get_sub_heading_text_css,
	get_sub_heading_text_css_hover,
	get_des_text_css,
	get_des_text_css_hover,
	get_des_drop_text_css,
	getContainerCSS,
	get_rating_number_css,
	get_ratings_css,
	get_fill_rating_css,
	get_unfill_rating_css,
	get_fill_rating_css_hover,
	get_unfill_rating_css_hover,
	get_button_css,
	get_button_hover_css,
	get_button_icon_hover_css,
	get_button_text_css,
} from './styling';
import { VariationPicker } from './variationPicker';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id } = attributes;
	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
		// Save Version
		if ( ! attributes?.blockVersion ) {
			setAttributes( { blockVersion: 2 } );
		}
	}, [ block_id, clientId ] );

	// Temporary approch instead of attribute migration. Might remove it in future
	useEffect( () => {
		if (
			! attributes.iconPlacement ||
			( attributes.iconPlacement.value === '' && attributes.stack !== '' )
		) {
			const tempIconPlacement = {
				value: attributes.stack || '',
				valueTablet: '',
				valueMobile: '',
			};
			setAttributes( { iconPlacement: tempIconPlacement, stack: '' } );
		}
	}, [] );
	// Temporary approch instead of attribute migration. Might remove it in future

	// Generate CSS
	const generatedCSS = useMemo( () => {
		if ( ! attributes?.iconPlacement ) {
			return '';
		}
		let cssGenerator = null;
		if ( cssGenerator ) {
			if (
				attributes?.blockVersion === 2 &&
				! ( cssGenerator instanceof CSSGenerator2 )
			) {
				cssGenerator = new CSSGenerator2( attributes, clientId ); // Create new instance of v2 if needed
			} else if (
				attributes?.blockVersion !== 2 &&
				! ( cssGenerator instanceof CSSGenerator )
			) {
				cssGenerator = new CSSGenerator( attributes, clientId ); // Create new instance of v1 if needed
			}
		} else {
			// No instance, so create the correct one based on version
			if ( attributes?.blockVersion === 2 ) {
				cssGenerator = new CSSGenerator2( attributes, clientId );
			} else {
				cssGenerator = new CSSGenerator( attributes, clientId );
			}
		}

		if ( cssGenerator === null ) {
			return '';
		}

		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container',
			get_info_box( attributes ),
			get_info_box( attributes, 'Tablet' ),
			get_info_box( attributes, 'Mobile' )
		);
		//badge starts
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-info-box-badge-link',
			get_badge_css( attributes ),
			get_badge_css( attributes, 'Tablet' ),
			get_badge_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-info-box-badge-link:hover',
			get_badge_hover_css( attributes, '' ),
			get_badge_hover_css( attributes, 'Tablet' ),
			get_badge_hover_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-info-box-badge-link > .ablocks-info-box-badge-link-text',
			get_badge_text_css( attributes, '' ),
			get_badge_text_css( attributes, 'Tablet' ),
			get_badge_text_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-block--info-box__content',
			get_info_box_content( attributes ),
			get_info_box_content( attributes, 'Tablet' ),
			get_info_box_content( attributes, 'Mobile' )
		);

		// Icon Style
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box .ablocks-block-container > .ablocks-icon-wrap, {{WRAPPER}}.ablocks-block--info-box .ablocks-block-container > a .ablocks-icon-wrap',
			getIconWrapperCSS( attributes ),
			getIconWrapperCSS( attributes, 'Tablet' ),
			getIconWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box .ablocks-block-container > .ablocks-icon-wrap, {{WRAPPER}}.ablocks-block--info-box .ablocks-block-container > a .ablocks-icon-wrap',
			get_icon_wrapper_extra_css( attributes ),
			get_icon_wrapper_extra_css( attributes, 'Tablet' ),
			get_icon_wrapper_extra_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-icon-wrap > img.ablocks-image-icon, {{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > a .ablocks-icon-wrap > img.ablocks-image-icon',
			getIconElementImageCSS( attributes ),
			getIconElementImageCSS( attributes, 'Tablet' ),
			getIconElementImageCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box:hover > .ablocks-block-container > .ablocks-icon-wrap > img.ablocks-image-icon, {{WRAPPER}}.ablocks-block--info-box:hover > .ablocks-block-container > a .ablocks-icon-wrap > img.ablocks-image-icon',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-icon-wrap > svg.ablocks-svg-icon',
			getIconElementCSS( attributes ),
			getIconElementCSS( attributes, 'Tablet' ),
			getIconElementCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box:hover > .ablocks-block-container > .ablocks-icon-wrap > svg.ablocks-svg-icon',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box:hover .ablocks-block-container > .ablocks-icon-wrap svg.ablocks-svg-icon , {{WRAPPER}}.ablocks-block--info-box:hover .ablocks-block-container > a .ablocks-icon-wrap svg.ablocks-svg-icon',
			get_icon_css_hover( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box:hover .ablocks-block-container > .ablocks-icon-wrap , {{WRAPPER}}.ablocks-block--info-box:hover .ablocks-block-container > a .ablocks-icon-wrap',
			get_icon_background_css_hover( attributes )
		);

		//Heading starts
		const desktopHeadingTextStyles = get_heading_text_css( attributes );
		if ( attributes?.headingTextColor ) {
			desktopHeadingTextStyles.color = attributes.headingTextColor;
		}
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-heading',
			get_heading_text_css( attributes ),
			get_heading_text_css( attributes, 'Tablet' ),
			get_heading_text_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box:hover > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-heading',
			get_heading_text_css_hover( attributes ),
			get_heading_text_css_hover( attributes, 'Tablet' ),
			get_heading_text_css_hover( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-sub-heading',
			get_sub_heading_text_css( attributes ),
			get_sub_heading_text_css( attributes, 'Tablet' ),
			get_sub_heading_text_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box:hover > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-sub-heading',
			get_sub_heading_text_css_hover( attributes ),
			get_sub_heading_text_css_hover( attributes, 'Tablet' ),
			get_sub_heading_text_css_hover( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-text',
			get_des_text_css( attributes ),
			get_des_text_css( attributes, 'Tablet' ),
			get_des_text_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box:hover > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-text',
			get_des_text_css_hover( attributes ),
			get_des_text_css_hover( attributes, 'Tablet' ),
			get_des_text_css_hover( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-text-drop-caps::first-letter',
			get_des_drop_text_css( attributes ),
			get_des_drop_text_css( attributes, 'Tablet' ),
			get_des_drop_text_css( attributes, 'Mobile' )
		);

		//Star rating starts
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-info-box-star-ratings',
			getContainerCSS( attributes ),
			getContainerCSS( attributes, 'Tablet' ),
			getContainerCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-info-box-star-ratings-icons > .ablocks-info-box-rating > .ablocks-info-box-rating__fill > .ablocks-icon-wrap , {{WRAPPER}} .ablocks-info-box-star-ratings-icons > .ablocks-info-box-rating > .ablocks-info-box-rating__unfill > .ablocks-icon-wrap',
			getStarIconWrapperCSS( attributes, '', 'starIcon' ),
			getStarIconWrapperCSS( attributes, 'Tablet', 'starIcon' ),
			getStarIconWrapperCSS( attributes, 'Mobile', 'starIcon' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-info-box-star-ratings-icons',
			get_ratings_css( attributes ),
			get_ratings_css( attributes, 'Tablet' ),
			get_ratings_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-info-box-star-ratings-icons > .ablocks-info-box-rating > .ablocks-info-box-rating__fill > .ablocks-icon-wrap > svg',
			get_fill_rating_css( attributes ),
			get_fill_rating_css( attributes, 'Tablet' ),
			get_fill_rating_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-info-box-star-ratings-icons > .ablocks-info-box-rating > .ablocks-info-box-rating__unfill > .ablocks-icon-wrap > svg',
			get_unfill_rating_css( attributes ),
			get_unfill_rating_css( attributes, 'Tablet' ),
			get_unfill_rating_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box:hover > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-star-ratings > .ablocks-info-box-star-ratings-icons > .ablocks-info-box-rating > .ablocks-info-box-rating__fill > .ablocks-icon-wrap > svg',
			get_fill_rating_css_hover( attributes ),
			get_fill_rating_css_hover( attributes, 'Tablet' ),
			get_fill_rating_css_hover( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box:hover > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-star-ratings > .ablocks-info-box-star-ratings-icons > .ablocks-info-box-rating > .ablocks-info-box-rating__unfill > .ablocks-icon-wrap > svg',
			get_unfill_rating_css_hover( attributes ),
			get_unfill_rating_css_hover( attributes, 'Tablet' ),
			get_unfill_rating_css_hover( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-info-box-star-rating-number',
			get_rating_number_css( attributes ),
			get_rating_number_css( attributes, 'Tablet' ),
			get_rating_number_css( attributes, 'Mobile' )
		);

		//button starts
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-btn-link',
			get_button_css( attributes ),
			get_button_css( attributes, 'Tablet' ),
			get_button_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-btn-link:hover',
			get_button_hover_css( attributes, '' ),
			get_button_hover_css( attributes, 'Tablet' ),
			get_button_hover_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-btn-link:hover > .ablocks-icon-wrap > svg.ablocks-svg-icon',
			get_button_icon_hover_css( attributes, '' ),
			get_button_icon_hover_css( attributes, 'Tablet' ),
			get_button_icon_hover_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--info-box > .ablocks-block-container > .ablocks-block--info-box__content > .ablocks-info-box-btn-link > .ablocks-info-box-btn-link-text',
			get_button_text_css( attributes, '' ),
			get_button_text_css( attributes, 'Tablet' ),
			get_button_text_css( attributes, 'Mobile' )
		);
		//button icon starts
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-info-box-btn-link > .ablocks-icon-wrap',
			getBtnIconWrapperCSS( attributes, '', 'btnIcon' ),
			getBtnIconWrapperCSS( attributes, 'Tablet', 'btnIcon' ),
			getBtnIconWrapperCSS( attributes, 'Mobile', 'btnIcon' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-info-box-btn-link > .ablocks-icon-wrap > svg.ablocks-svg-icon',
			getBtnIconElementCSS( attributes, '', 'btnIcon' ),
			getBtnIconElementCSS( attributes, 'Tablet', 'btnIcon' ),
			getBtnIconElementCSS( attributes, 'Mobile', 'btnIcon' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-info-box-btn-link > .ablocks-icon-wrap > svg.ablocks-svg-icon:hover',
			getElementImageHoverCSS( attributes, '', 'btnIcon' ),
			getElementImageHoverCSS( attributes, 'Tablet', 'btnIcon' ),
			getElementImageHoverCSS( attributes, 'Mobile', 'btnIcon' )
		);

		return cssGenerator.generateCSS();
	}, [ attributes ] );

	if ( attributes?.iconPlacement?.value === '' ) {
		return <VariationPicker { ...props } />;
	}

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
