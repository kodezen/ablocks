import React from 'react';
import classNames from 'classnames';
import metadata from './block.json';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { RichText } from '@wordpress/block-editor';
import SaveContainer from '@Components/block-container/save';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		buttonSize,
		iconPosition,
		iconClass,
		showIcon,
		iconImageID,
		iconImageUrl,

		paypalAccount,
		trxType,
		itemName,
		price,
		currency,
		quantity,
		shippingPrice,
		tax,
		isAmountFixed,
		isAutoRenewal,
		billingCycle,
		redirectionAfterPayment,
		sandboxMode,
		openInNewTab,
		customMessage,
		errorMessage,
	} = attributes;

	// PayPal form action URL
	const formAction = sandboxMode
		? 'https://www.sandbox.paypal.com/cgi-bin/webscr'
		: 'https://www.paypal.com/cgi-bin/webscr';

	return (
		<SaveContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<form
				action={ formAction }
				method="post"
				target={ openInNewTab ? '_blank' : '_self' }
				className="ablocks-paypal-button__form"
				data-ablocks__error-msg={ errorMessage }
			>
				{ /* common */ }
				<input type="hidden" name="business" value={ paypalAccount } />
				<input type="hidden" name="cmd" value={ trxType } />
				<input type="hidden" name="item_name" value={ itemName } />
				<input type="hidden" name="custom" value={ customMessage } />
				<input type="hidden" name="currency_code" value={ currency } />
				<input
					type="hidden"
					name="return"
					value={ redirectionAfterPayment }
				/>

				{ /* Checkout */ }
				{ trxType === '_xclick' && (
					<>
						<input type="hidden" name="amount" value={ price } />
						<input
							type="hidden"
							name="quantity"
							value={ quantity }
						/>
						<input
							type="hidden"
							name="shipping"
							value={ shippingPrice }
						/>
					</>
				) }
				{ /* Donation */ }
				{ trxType === '_donations' && (
					<>
						{ isAmountFixed ? (
							<input
								type="hidden"
								name="amount"
								value={ price }
							/>
						) : (
							<input type="hidden" name="amount" value="" />
						) }
					</>
				) }
				{ /* Subscription */ }
				{ trxType === '_xclick-subscriptions' && (
					<>
						<input type="hidden" name="a3" value={ price } />
						<input type="hidden" name="p3" value="1" />
						<input type="hidden" name="t3" value={ billingCycle } />
						<input
							type="hidden"
							name="src"
							value={ isAutoRenewal }
						/>
						<input type="hidden" name="no_note" value="1" />
					</>
				) }

				{ tax && <input type="hidden" name="tax_rate" value={ tax } /> }
				<button
					className={ classNames(
						'ablocks-paypal-button',
						`ablocks-paypal-button--${ buttonSize }`,
						{
							[ `ablocks-paypal-button--icon-${ iconPosition }` ]:
								( iconClass && iconPosition ) ||
								( iconImageID && iconImageUrl ),
						}
					) }
					// eslint-disable-next-line
				type="submit"
				>
					{ showIcon && <RenderIcon attributes={ attributes } /> }
					<RichText.Content
						tagName={ 'span' }
						className="ablocks-paypal-button__text"
						value={ attributes.text }
					/>
				</button>
			</form>
		</SaveContainer>
	);
}

Save.propTypes = propTypes;
