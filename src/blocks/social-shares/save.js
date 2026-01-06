import React from 'react';
import SaveContainer from '@Components/block-container/save2';
import metadata from './block.json';
import './style.css';
import { socialShareIcon } from './helper.js';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
const propTypes = {};
export default function Save( props ) {
	const { attributes } = props;
	const { block_id, lists, shape, viewButton, windowsPopUp, shareBar } =
		attributes;
	let button_Shape = '';
	if ( shape?.toLowerCase() === 'rounded' ) {
		button_Shape = 'ablocks-social-share-item--rounded';
	} else if ( shape?.toLowerCase() === 'circle' ) {
		button_Shape = 'ablocks-social-share-item--circle';
	}
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ shareBar && (
					<button
						aria-label="Share on social media"
						title="Share on social media"
						className="ablocks-social-share"
					>
						{ socialShareIcon }
					</button>
				) }

				{ lists?.map( ( list, index ) => (
					<a
						data-windowspopup={ windowsPopUp }
						key={ index }
						style={ {
							background:
								getTextColorCSS(
									list?.[ 'backgroundColor' + list?.id ]
								) || '',
							'--background-hover':
								getTextColorCSS(
									list[ 'backgroundColorH' + list?.id ]
								) ||
								getTextColorCSS( list.backgroundH ) ||
								'',
						} }
						href={ `${ list?.link }` }
						target="_blank"
						rel="noopener noreferrer"
						className={ `ablocks-social-share-item ${ getTextColorCSS(
							list?.buttonBackgroundColor
						) } ${ button_Shape } ${
							viewButton === 'Icon' && shape === 'Circle'
								? 'ablocks-social-share-item--circle-full'
								: ''
						}` }
					>
						{ viewButton !== 'Text' && (
							<span
								style={ {
									background:
										getTextColorCSS(
											list?.[ 'shareBgColor' + list?.id ]
										) || '',
									'--hover-icon-bg-color':
										getTextColorCSS(
											list[ 'shareIconH' + list?.id ]
										) || '',
								} }
								className={ `ablocks-social-share-item--icon ${
									viewButton === 'Icon & Text' &&
									shape !== 'Circle' &&
									shape !== 'Rounded'
										? getTextColorCSS(
												list?.iconBackgroundColor
										  )
										: ''
								} ${ button_Shape } ${
									viewButton === 'Icon & Text' &&
									shape === 'Square'
										? 'ablocks-social-share-item-icon--icon-text-Square'
										: ''
								}` }
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox={ list?.icon?.viewBox }
									className="ablocks-svg-icon"
								>
									<path
										d={ list?.icon?.path }
										style={ {
											fill:
												getTextColorCSS(
													list?.[
														'iconFillColor' +
															list?.id
													]
												) || '#ffffff',
										} }
									/>
								</svg>
							</span>
						) }
						{ viewButton !== 'Icon' && (
							<span
								className={ `ablocks-social-share-item--text ${ button_Shape } ${
									viewButton === 'Icon & Text' &&
									shape === 'Square'
										? 'ablocks-social-share-item-text--icon-text-Square'
										: ''
								}` }
								style={ {
									background:
										getTextColorCSS(
											list?.[
												'shareTextBgColor' + list?.id
											]
										) || '',
									'--hover-text-bg-color':
										getTextColorCSS(
											list[ 'shareTextH' + list?.id ]
										) || '',
								} }
							>
								{ list?.text }
							</span>
						) }
					</a>
				) ) }
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
