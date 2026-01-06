import FormFieldWithAction from '../../Components/FormFieldWithAction';
import { __ } from '@wordpress/i18n';

export default function WebhookAction( { attributes, setAttributes } ) {
	const { webhookLink } = attributes;
	const handleTargetToggle = ( e ) => {
		const isChecked = e.target.checked;
		setAttributes( {
			webhookLink: {
				...webhookLink,
				linkTarget: isChecked,
			},
		} );
	};

	return (
		<div className="ablock-form-builder-actions-wrapper">
			<FormFieldWithAction
				label="Webhook URL"
				type="url"
				value={ webhookLink.href || '' }
				onChange={ ( e ) =>
					setAttributes( {
						webhookLink: {
							...webhookLink,
							href: e.target.value,
						},
					} )
				}
				placeholder="https://your-webhook-endpoint.com"
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div className="ablocks-form-builder-form-group">
				<label className="ablocks-form-builder-form-label">
					<input
						type="checkbox"
						checked={ !! webhookLink.linkTarget }
						onChange={ handleTargetToggle }
					/>
					<span style={ { marginLeft: '8px' } }>
						{ __( 'Open in new window', 'ablocks' ) }
					</span>
				</label>
			</div>
		</div>
	);
}
