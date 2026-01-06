import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksAlignmentControl from '@Controls/alignment';
import Separator from '@Components/separator';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksColorControl from '@Controls/color';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksSelectControl from '@Controls/select';
import './style.css';
const propTypes = {};
export default function Settings( props ) {
	const { attributes, setAttributes, context } = props;
	const {
		alignment,
		paragraphSize,
		textShadow,
		typography,
		textColor,
		paragraph,
		textStroke,
		dropCaps,
		dropCapsTextColor,
	} = attributes;
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-paragraph-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Title', 'academy-blocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextareaControl
										label={ __( 'Title', 'ablocks' ) }
										attributeName="paragraph"
										attributeValue={ paragraph }
										setAttributes={ setAttributes }
										placeholder={ __( 'Enter your title' ) }
										context={ context }
									/>
									<Separator />
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="alignment"
										attributeValue={ alignment }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
									<ABlocksSelectControl
										label={ __( 'Sizes', 'ablocks' ) }
										isResponsive={ false }
										options={ [
											{ label: 'Small', value: 'sm' },
											{ label: 'Medium', value: 'md' },
											{ label: 'Large', value: 'lg' },
										] }
										attributeValue={ paragraphSize || 'md' }
										attributeName="paragraphSize"
										setAttributes={ setAttributes }
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Drop caps"
										attributeValue={ attributes.dropCaps }
										setAttributes={ setAttributes }
										attributeName="dropCaps"
									/>

									{ dropCaps && (
										<>
											<Separator />
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="dropCapsTextColor"
												attributeValue={
													dropCapsTextColor
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="textColor"
										attributeValue={ textColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="typography"
										attributeValue={ typography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="textShadow"
										attributeValue={ textShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									<ABlocksTextStroke
										label={ __( 'Text Stroke', 'ablocks' ) }
										attributeName="textStroke"
										attributeValue={ textStroke }
										setAttributes={ setAttributes }
										isResponsive={ true }
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
