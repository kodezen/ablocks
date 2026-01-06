import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';
import ABlockLinkControl from '@Controls/link-control';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksDimensions from '@Controls/dimensions';

// colors
import ABlocksColorControl from '@Controls/color';

const IconSettings = ( props ) => {
	const { attributes, setAttributes } = props;
	const { iconLink, iconPrimaryColorH, iconBackgroundColorH, iconMargin } =
		attributes;
	return (
		<ABlocksPanelBody
			title={ __( 'Icon', 'ablocks' ) }
			initialOpen={ false }
		>
			<ContentStyleTabs
				content={
					<>
						<ABlocksIconUploader
							label={ __( 'Icon', 'ablocks' ) }
							attributePrefix={ 'icon' }
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
						<ABlockLinkControl
							label={ __( 'Link', 'ablocks' ) }
							attributeName="iconLink"
							attributeValue={ iconLink }
							setAttributes={ setAttributes }
						/>
					</>
				}
				style={
					<>
						<ABlocksDimensions
							label={ __( 'Margin', 'ablocks' ) }
							isResponsive={ true }
							attributeName="iconMargin"
							attributeValue={ iconMargin }
							setAttributes={ setAttributes }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksIconStyleSettings
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="iconPrimaryColorH"
										attributeValue={ iconPrimaryColorH }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="iconBackgroundColorH"
										attributeValue={ iconBackgroundColorH }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Transition Duration',
											'ablocks'
										) }
										min={ 0 }
										max={ 5 }
										step={ 0.01 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeValue={
											attributes?.iconTransition || 0
										}
										attributeName={ 'iconTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</>
				}
			/>
		</ABlocksPanelBody>
	);
};

export default IconSettings;
