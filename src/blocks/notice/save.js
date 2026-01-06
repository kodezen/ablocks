import React from 'react';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save2';
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import RenderIcon from '@Controls/icon-upload/render-icon';
import './style.css';
const propTypes = {};
const defaultProps = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, headingTag, heading, isDismissible, noticeClose } =
		attributes;

	return (
		<SaveContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<div
				data-notice-close={ noticeClose }
				className="ablocks-notice-header"
			>
				<RichText.Content
					tagName={ headingTag }
					value={ heading }
					className="ablocks-notice-title"
				/>
				{ isDismissible && <RenderIcon attributes={ attributes } /> }
			</div>
			<div className="ablocks-notice-content">
				<InnerBlocks.Content />
			</div>
		</SaveContainer>
	);
}

Save.propTypes = propTypes;
Save.defaultProps = defaultProps;
