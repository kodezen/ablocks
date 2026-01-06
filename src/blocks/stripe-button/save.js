import React from 'react';
import classNames from 'classnames';
import metadata from './block.json';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { RichText } from '@wordpress/block-editor';
import SaveContainer from '@Components/block-container/save2';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		postId,
		buttonSize,
		iconPosition,
		iconClass,
		showIcon,
		iconImageID,
		iconImageUrl,
		text,
		openInNewTab,
		errorMessage,
	} = attributes;

	return (
		<SaveContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<form
				className="ablocks-stripe-form"
				method="post"
				id="stripe-form"
				data-ablocks__block-id={ block_id }
				data-ablocks__post-id={ postId }
				data-ablocks__open-new-tab={ openInNewTab }
				data-ablocks__error-msg={ errorMessage }
			>
				<input type="hidden" name="action" value="submit_stripe_form" />
				<input type="hidden" name="widget_id" value="97cb6e5" />
				<input type="hidden" name="current_url" />

				{ /* Submit Button */ }
				<button
					type="submit"
					className={ classNames(
						'ablocks-stripe-button',
						`ablocks-stripe-button--${ buttonSize }`,
						{
							[ `ablocks-stripe-button--icon-${ iconPosition }` ]:
								( iconClass && iconPosition ) ||
								( iconImageID && iconImageUrl ),
						}
					) }
				>
					{ showIcon && <RenderIcon attributes={ attributes } /> }
					<RichText.Content
						tagName={ 'span' }
						className="ablocks-stripe-button__text"
						value={ text }
					/>
				</button>

				<div className="ablocks-stripe-button__error"></div>
			</form>
		</SaveContainer>
	);
}

Save.propTypes = propTypes;
