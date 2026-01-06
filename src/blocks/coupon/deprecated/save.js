import React from 'react';
import classNames from 'classnames';
import SaveContainer from '@Components/block-container/save';
import metadata from './block.json';
import RenderIcon from '@Controls/icon-upload/render-icon';

const propTypes = {};
const defaultProps = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		couponStyle,
		couponCode,
		couponBtnText,
		couponBtnAfterCopyText,
		isShowIcon,
	} = attributes;

	return (
		<React.Fragment>
			<SaveContainer
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
					'data-coupon-code': couponCode,
					'data-clipboard-text': couponBtnText,
					'data-clipped-text': couponBtnAfterCopyText,
					'data-coupon-style': couponStyle,
				} }
			>
				{ /* Coupon Code Section */ }
				<div className="ablocks-coupon-code">
					{ isShowIcon && couponStyle === 'style3' && (
						<RenderIcon attributes={ attributes } />
					) }

					{ couponStyle !== 'style3' && couponCode }
					{ couponStyle === 'style3' && (
						<span className="ablocks-coupon-code-text">
							{ couponCode }
						</span>
					) }

					{ ( couponStyle === 'style2' ||
						couponStyle === 'style4' ) && (
						<div className="ablocks-coupon-clipboard">
							{ isShowIcon && (
								<RenderIcon attributes={ attributes } />
							) }
							<span className="ablocks-coupon-clipboard-text">
								{ couponBtnText }
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
							{ couponBtnText }
						</span>
					</div>
				) }
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
Save.defaultProps = defaultProps;
