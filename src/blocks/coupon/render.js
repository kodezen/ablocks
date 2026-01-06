import React, { useEffect } from 'react';
import classNames from 'classnames';
import RenderContainer from '@Components/block-container/render2';
import { getRenderDomElement } from '@Utils/helper';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';
import ablocksCoupon from './coupon';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';
const propTypes = {};
const defaultProps = {};

export default function Render( props ) {
	const { attributes } = props;
	const {
		block_id,
		couponStyle,
		couponCode,
		couponBtnText,
		couponBtnAfterCopyText,
		isShowIcon,
	} = attributes;
	// dynamic content issue solve here
	const {
		isDynamicEnabled: isDynamicCouponCodeEnabled,
		data: dynamicCouponCode,
	} = useDynamicData( {
		attributeValue: couponCode,
	} );
	const {
		isDynamicEnabled: isDynamicCouponBtnTextEnabled,
		data: dynamicCouponBtnText,
	} = useDynamicData( {
		attributeValue: couponBtnText,
	} );
	const {
		isDynamicEnabled: isDynamicCouponBtnAfterCopyTextEnabled,
		data: dynamicCouponBtnAfterCopyText,
	} = useDynamicData( {
		attributeValue: couponBtnAfterCopyText,
	} );
	// dynamic content issue solve here

	const blockProps = useBlockProps();

	useEffect( () => {
		const element = getRenderDomElement( `.ablocks-block-${ block_id }` );
		if ( element !== null ) {
			ablocksCoupon( element );
		}
	}, [
		block_id,
		couponStyle,
		isDynamicCouponCodeEnabled ? dynamicCouponCode : couponCode,
		isDynamicCouponBtnTextEnabled ? dynamicCouponBtnText : couponBtnText,
		isDynamicCouponBtnAfterCopyTextEnabled
			? dynamicCouponBtnAfterCopyText
			: couponBtnAfterCopyText,
		blockProps,
	] );

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				className={ classNames( {
					'ablocks-block---coupon-layout-two':
						couponStyle === 'style2',
					'ablocks-block---coupon-layout-three':
						couponStyle === 'style3',
					'ablocks-block---coupon-layout-four':
						couponStyle === 'style4',
				} ) }
				blockProps={ {
					'data-coupon-code': isDynamicCouponCodeEnabled
						? dynamicCouponCode
						: couponCode,
					'data-clipboard-text': isDynamicCouponBtnTextEnabled
						? dynamicCouponBtnText
						: couponBtnText,
					'data-clipped-text': isDynamicCouponBtnAfterCopyTextEnabled
						? dynamicCouponBtnAfterCopyText
						: couponBtnAfterCopyText,
					'data-coupon-style': couponStyle,
				} }
			>
				{ /* Coupon Code Section */ }
				<div className="ablocks-coupon-code">
					{ isShowIcon && couponStyle === 'style3' && (
						<RenderIcon attributes={ attributes } />
					) }

					{ couponStyle !== 'style3' && isDynamicCouponCodeEnabled
						? dynamicCouponCode
						: couponCode }
					{ couponStyle === 'style3' && (
						<span className="ablocks-coupon-code-text">
							{ isDynamicCouponCodeEnabled
								? dynamicCouponCode
								: couponCode }
						</span>
					) }

					{ ( couponStyle === 'style2' ||
						couponStyle === 'style4' ) && (
						<div className="ablocks-coupon-clipboard">
							{ isShowIcon && (
								<RenderIcon attributes={ attributes } />
							) }
							<span className="ablocks-coupon-clipboard-text">
								{ isDynamicCouponBtnTextEnabled
									? dynamicCouponBtnText
									: couponBtnText }
							</span>
						</div>
					) }
				</div>

				{ couponStyle === 'default' && (
					<div className="ablocks-coupon-clipboard">
						{ isShowIcon && (
							<RenderIcon attributes={ attributes } />
						) }
						<span className="ablocks-coupon-clipboard-text">
							{ isDynamicCouponBtnTextEnabled
								? dynamicCouponBtnText
								: couponBtnText }
						</span>
					</div>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
