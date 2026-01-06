import React from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import './style.css';
import { socialShareIcon } from './helper.js';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export default function Render( props ) {
	const { attributes } = props;
	const { block_id, lists, viewButton, shape, windowsPopUp, shareBar } =
		attributes;

	const currentUrl = window.location.href;
	let button_Shape = '';
	if ( shape?.toLowerCase() === 'rounded' ) {
		button_Shape = 'ablocks-social-share-item--rounded';
	} else if ( shape?.toLowerCase() === 'circle' ) {
		button_Shape = 'ablocks-social-share-item--circle';
	}
	const openPopupWindow = ( url ) => {
		const width = 600;
		const height = 400;
		const left = ( window.innerWidth - width ) / 2;
		const top = ( window.innerHeight - height ) / 2;
		window.open(
			url,
			'_blank',
			`width=${ width },height=${ height },top=${ top },left=${ left }`
		);
	};

	const openNewWindow = ( url ) => {
		window.open( url, '_blank' );
	};

	const handleSocialClick = ( url ) => {
		if ( windowsPopUp ) {
			openPopupWindow( url );
		} else {
			openNewWindow( url );
		}
	};
	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				typography={ [
					{
						fontFamily: attributes.typography?.fontFamily,
						weight: attributes.typography?.weight,
					},
				] }
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
					<a // eslint-disable-line
						key={ index }
						role="link"
						tabIndex={ 0 }
						onKeyDown={ ( e ) => {
							if ( e.key === 'Enter' ) {
								handleSocialClick(
									`${ list?.link }${ currentUrl }`
								);
							}
						} }
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
						className={ `ablocks-social-share-item ${ getTextColorCSS(
							list?.buttonBackgroundColor
						) } ${ button_Shape } ${
							viewButton === 'Icon' && shape === 'Circle'
								? 'ablocks-social-share-item--circle-full'
								: ''
						}` }
						onClick={ () =>
							handleSocialClick(
								`${ list?.link }${ currentUrl }`
							)
						}
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
								className={ `ablocks-social-share-item--text ${ button_Shape }  ${
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
			</RenderContainer>
		</React.Fragment>
	);
}
