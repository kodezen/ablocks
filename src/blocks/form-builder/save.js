import React from 'react';
import SaveContainer from '@Components/block-container/save2';
import metadata from './block.json';

import { InnerBlocks } from '@wordpress/block-editor';
export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		dir,
		buttonSize,
		formType,
		buttonText,
		postId,
		link,
		loginRedirect,
		registerRedirect,
		navigatorAccess,
		forgetPasswordLabel,
		loginLabel,
		registerLabel,
		navigatorIcon,
		homeLabel,
		navigatorIconShow,
	} = attributes;
	const FormType =
		[ 'login', 'registration', 'forget_password' ].indexOf( formType ) !==
		-1
			? formType
			: 'submit';
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<form
					id={ `ablocks-form-builder-${ block_id }` }
					className="ablocks-form-builder"
					method="post"
				>
					<input type="hidden" name="security" value="" />
					<input
						type="hidden"
						name="action"
						value={ `ablocks/form_builder_${ FormType }_handler` }
					/>
					<input
						type="hidden"
						name="current_post_id"
						value={ postId }
					/>
					<input type="hidden" name="block_id" value={ block_id } />
					{ loginRedirect === true || registerRedirect === true ? (
						<input
							type="hidden"
							name="redirect_url"
							value={ link?.href }
						/>
					) : null }
					<div className="ablocks-form-builder__fields">
						<InnerBlocks.Content />
					</div>
					{ formType !== 'multi-step' && (
						<button
							className={ `ablocks-form-builder__submit-button ablocks-form-builder__submit-button--${ buttonSize }` }
							type="submit"
						>
							{ buttonText }
						</button>
					) }
				</form>
				<div
					className={ `ablocks-block--form-builder__feedback-message` }
				></div>
				{ navigatorAccess && (
					<div className="ablocks-block--form-builder__navigator">
						{ formType === 'login' && (
							<div className="ablocks-block--form-builder__navigator-redirect-page">
								<a href="{{ablocks_link_registration_page}}">
									{ registerLabel }
								</a>
								|
								<a href="{{ablocks_link_forget_password_page}}">
									{ forgetPasswordLabel }
								</a>
							</div>
						) }
						{ ( formType === 'registration' ||
							formType === 'forget_password' ) && (
							<div className="ablocks-block--form-builder__navigator-redirect-page">
								<a href="{{ablocks_link_login_page}}">
									{ loginLabel }
								</a>
							</div>
						) }
						{ ( formType === 'registration' ||
							formType === 'forget_password' ||
							formType === 'login' ) && (
							<div className="ablocks-block--form-builder__navigator-home-page">
								{ navigatorIconShow && (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox={ navigatorIcon.viewBox }
										className="ablocks-svg-icon ablocks-block--form-builder__arrow-icon"
									>
										<path d={ navigatorIcon.path }></path>
									</svg>
								) }
								<a href="{{ablocks_link_home}}">
									{ homeLabel }
								</a>
							</div>
						) }
					</div>
				) }
			</SaveContainer>
		</React.Fragment>
	);
}
