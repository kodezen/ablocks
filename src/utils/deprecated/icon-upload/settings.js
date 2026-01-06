import React from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import ABlocksColorControl from '@Controls/color';
import ABlocksRangeControl from '@Controls/range';
import ABlocksDimensions from '@Controls/dimensions';

const propTypes = {
	label: PropTypes.string,
	attributePrefix: PropTypes.string,
	setAttributes: PropTypes.func,
	attributes: PropTypes.object,
	onChangeHandler: PropTypes.func,
	deleteHandler: PropTypes.func,
	getIconClass: PropTypes.func,
};

export default function Settings( props ) {
	const { setAttributes, attributes, attributePrefix = 'icon' } = props;
	const iconType = attributes[ attributePrefix + 'Type' ];
	const imgId = attributes[ attributePrefix + 'ImageID' ];
	const isIconType = iconType === 'stacked' || iconType === 'framed';

	return (
		<React.Fragment>
			{ ! imgId && (
				<ABlocksColorControl
					label={ __( 'Primary color', 'ablocks' ) }
					attributeName={ attributePrefix + 'Color' }
					attributeValue={ attributes[ attributePrefix + 'Color' ] }
					setAttributes={ setAttributes }
				/>
			) }
			{ iconType && (
				<ABlocksColorControl
					label={ __( 'Background color', 'ablocks' ) }
					attributeName={ attributePrefix + 'BgColor' }
					attributeValue={ attributes[ attributePrefix + 'BgColor' ] }
					setAttributes={ setAttributes }
				/>
			) }
			<ABlocksRangeControl
				label={ __( 'Rotate', 'ablocks' ) }
				min={ 0 }
				max={ 360 }
				isInline={ false }
				isResponsive={ false }
				attributeName={ attributePrefix + 'Rotate' }
				attributeValue={
					attributes?.[ attributePrefix + 'Rotate' ] ?? '0'
				}
				setAttributes={ setAttributes }
			/>
			{ isIconType && (
				<>
					<ABlocksDimensions
						label={ __( 'Padding', 'ablocks' ) }
						isResponsive={ true }
						attributeName={ attributePrefix + 'Padding' }
						attributeValue={
							attributes[ attributePrefix + 'Padding' ]
						}
						setAttributes={ setAttributes }
					/>

					{ iconType === 'framed' && (
						<ABlocksDimensions
							label={ __( 'Border width', 'ablocks' ) }
							isResponsive={ true }
							attributeName={ attributePrefix + 'BorderWidth' }
							attributeValue={
								attributes[ attributePrefix + 'BorderWidth' ]
							}
							setAttributes={ setAttributes }
						/>
					) }

					<ABlocksDimensions
						label={ __( 'Border radius', 'ablocks' ) }
						isResponsive={ true }
						attributeName={ attributePrefix + 'BorderRadius' }
						attributeValue={
							attributes[ attributePrefix + 'BorderRadius' ]
						}
						setAttributes={ setAttributes }
					/>
				</>
			) }
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
