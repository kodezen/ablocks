import React from 'react';
import SaveContainer from '@Components/block-container/save';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import classNames from 'classnames';

const propTypes = {};
const defaultProps = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, lists, backgroundImage, contentTrigger } = attributes;

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ /* Background image */ }
				<img
					className="ablocks-image-hotspot__bg-image"
					alt="Background"
					src={
						attributes.imageSizes[ attributes.selectedImageSize ]
							?.url ||
						attributes.imageSizes[ attributes.selectedImageSize ]
							?.source_url ||
						backgroundImage
					}
				/>

				{ /* All tooltip container */ }
				{ lists?.map( ( list ) => (
					<div
						key={ list.id }
						className={ classNames(
							'ablocks-image-hotspot__pin',
							`ablocks-image-hotspot-list-${ list.id }`
						) }
						data-tooltip-index={ list.id }
						data-xaxis={ list.xAxis }
						data-yaxis={ list.yAxis }
						data-trigger={ contentTrigger }
					></div>
				) ) }

				{ /* Tooltip content container */ }
				<div className="ablocks-image-hotspot__tooltip-content">
					<InnerBlocks.Content />
					<span className="ablocks-icon ablocks-icon--close">
						<svg
							width="20"
							height="21"
							viewBox="0 0 20 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.7307 15.4458L5.53795 7.25305C5.25803 6.97313 5.19161 6.5753 5.39143 6.37548C5.59125 6.17565 5.98909 6.24208 6.26901 6.522L14.4618 14.7148C14.7417 14.9947 14.8081 15.3925 14.6083 15.5924C14.4085 15.7922 14.0107 15.7258 13.7307 15.4458Z"
								fill="#74777C"
							/>
							<path
								d="M5.39169 15.5924C5.19187 15.3925 5.25829 14.9947 5.53821 14.7148L13.731 6.522C14.0109 6.24208 14.4087 6.17565 14.6086 6.37548C14.8084 6.5753 14.742 6.97313 14.4621 7.25305L6.26927 15.4458C5.98935 15.7258 5.59152 15.7922 5.39169 15.5924Z"
								fill="#74777C"
							/>
						</svg>
					</span>
				</div>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
Save.defaultProps = defaultProps;
