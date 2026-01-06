import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import './styles.scss';
import ActionAfterSubmiton from './ActionAfterSubmission';

import MailchimpAction from './ActionAfterSubmission/actions/MailchimpAction';
import MailerLiteAction from './ActionAfterSubmission/actions/MailerLiteAction';
import DripAction from './ActionAfterSubmission/actions/DripAction';
import SubmissionAction from './ActionAfterSubmission/actions/SubmissionAction';
import GetResponseAction from './ActionAfterSubmission/actions/GetResponseAction';
import WebhookAction from './ActionAfterSubmission/actions/WebhookAction';
import ConvertKitAction from './ActionAfterSubmission/actions/ConvertKitAction';
import FormConfirmation from './ActionAfterSubmission/FormConfirmation';
import FormEmailNotifications from './ActionAfterSubmission/FormEmailNotifications';

export default function FormSetting( props ) {
	const { attributes } = props;
	const [ activePath, setActivePath ] = useState( 'general' );
	const [ tabs, setTabs ] = useState( [
		{
			name: 'general',
			icon: 'ablocks-icon',
			title: __( 'General', 'ablocks' ),
		},
		{
			name: 'from_confirmation',
			icon: 'ablocks-icon',
			title: __( 'General', 'ablocks' ),
		},
		{
			name: 'from_email_notifications',
			icon: 'ablocks-icon',
			title: __( 'Email Notifications', 'ablocks' ),
		},
	] );
	useEffect( () => {
		const { formActions = [] } = attributes;

		const baseTabs = [
			{
				name: 'general',
				icon: 'ablocks-icon',
				title: __( 'General', 'ablocks' ),
			},
			{
				name: 'from_confirmation',
				icon: 'ablocks-icon',
				title: __( 'From Confirmation', 'ablocks' ),
			},
			{
				name: 'from_email_notifications',
				icon: 'ablocks-icon',
				title: __( 'Email Notifications', 'ablocks' ),
			},
		];

		const dynamicTabs = formActions
			?.map( ( action ) => {
				switch ( action ) {
					case 'webhook':
						return {
							name: 'webhook',
							icon: 'ablocks-icon',
							title: __( 'Webhook', 'ablocks' ),
						};
					case 'mailchimp':
						return {
							name: 'mailchimp',
							icon: 'ablocks-icon',
							title: __( 'Mailchimp', 'ablocks' ),
						};
					case 'mailerlite':
						return {
							name: 'mailerlite',
							icon: 'ablocks-icon',
							title: __( 'MailerLite', 'ablocks' ),
						};
					case 'drip':
						return {
							name: 'drip',
							icon: 'ablocks-icon',
							title: __( 'Drip', 'ablocks' ),
						};
					case 'submission':
						return {
							name: 'submssion',
							icon: 'ablocks-icon',
							title: __( 'Submission', 'ablocks' ),
						};
					case 'getResponse':
						return {
							name: 'getResponse',
							icon: 'ablocks-icon ',
							title: __( 'GetResponse', 'ablocks' ),
						};
					case 'convertkit':
						return {
							name: 'convertkit',
							icon: 'ablocks-icon',
							title: __( 'convertkit', 'ablocks' ),
						};
					case 'from_confirmation':
						return {
							name: 'from_confirmation',
							icon: 'ablocks-icon',
							title: __( 'From Confirmation', 'ablocks' ),
						};
					case 'from_email_notifications':
						return {
							name: 'from_email_notifications',
							icon: 'ablocks-icon',
							title: __( 'From Confirmation', 'ablocks' ),
						};
					default:
						return null;
				}
			} )
			.filter( Boolean );

		setTabs( [ ...baseTabs, ...dynamicTabs ] );
	}, [ attributes.formActions ] );

	const renderContent = ( path ) => {
		switch ( path ) {
			case 'general':
				return <ActionAfterSubmiton { ...props } />;
			case 'from_confirmation':
				return <FormConfirmation { ...props } />;
			case 'from_email_notifications':
				return <FormEmailNotifications { ...props } />;
			case 'mailchimp':
				return <MailchimpAction { ...props } />;
			case 'mailerlite':
				return <MailerLiteAction { ...props } />;
			case 'drip':
				return <DripAction { ...props } />;
			case 'submssion':
				return <SubmissionAction { ...props } />;
			case 'getResponse':
				return <GetResponseAction { ...props } />;
			case 'webhook':
				return <WebhookAction { ...props } />;
			case 'convertkit':
				return <ConvertKitAction { ...props } />;
			default:
				return null;
		}
	};

	return (
		<React.Fragment>
			<div className="ablocks-form-builder-action-setting">
				<div className="ablocks-form-builder-action-setting__settings">
					<div className="ablocks-form-builder-action-setting__page-content">
						<div className="ablocks-form-builder-action-setting__page-content--settings">
							<div className="ablocks-form-builder-action-setting__tab-panel">
								{ tabs.map( ( tabItem, tabIndex ) => {
									const isActive =
										activePath === tabItem.name;

									return (
										<div
											className={ `ablocks-form-builder-action-setting__tab-panel-item ${
												isActive
													? 'ablocks-form-builder-action-setting__tab-panel-item--open'
													: ''
											}` }
											key={ tabIndex }
										>
											<button
												onClick={ () =>
													setActivePath(
														tabItem.name
													)
												}
												className={ `ablocks-form-builder-action-setting__tab-item ${
													isActive
														? 'ablocks-form-builder-action-setting__tab-item--active'
														: ''
												}` }
											>
												<span
													className={ tabItem.icon }
												/>
												{ tabItem.title }
											</button>
										</div>
									);
								} ) }
							</div>

							<div className="ablocks-form-builder-action-setting__settings-content">
								{ renderContent( activePath ) }
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
