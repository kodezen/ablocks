import React, { useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getYoutubePlayPauseButtonStyleCSS,
	getYoutubeProgressStyleCSS,
	getSelfVideoStyleCSS,
	getSelfHostControlStyleCSS,
	getVimeoVideoStyleCSS,
	getVimeoPlayerControlStyleCSS,
	getPosterImage,
} from './styling';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id } = attributes;
	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
	}, [ block_id, clientId ] );

	// Generate CSS
	const generatedCSS = useMemo( () => {
		let cssGenerator = null;
		if ( cssGenerator ) {
			if (
				attributes?.blockVersion === 2 &&
				! ( cssGenerator instanceof CSSGenerator2 )
			) {
				cssGenerator = new CSSGenerator2( attributes, clientId ); // Create new instance of v2 if needed
			} else if (
				attributes?.blockVersion !== 2 &&
				! ( cssGenerator instanceof CSSGenerator )
			) {
				cssGenerator = new CSSGenerator( attributes, clientId ); // Create new instance of v1 if needed
			}
		} else {
			// No instance, so create the correct one based on version
			if ( attributes?.blockVersion === 2 ) {
				cssGenerator = new CSSGenerator2( attributes, clientId );
			} else {
				cssGenerator = new CSSGenerator( attributes, clientId );
			}
		}

		if ( cssGenerator === null ) {
			return '';
		}
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-youtube-container > .plyr--video > .plyr__controls',
			getYoutubeProgressStyleCSS( attributes ),
			getYoutubeProgressStyleCSS( attributes, 'Tablet' ),
			getYoutubeProgressStyleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-youtube-container > .plyr--youtube > .plyr__control--overlaid',
			getYoutubePlayPauseButtonStyleCSS( attributes ),
			getYoutubePlayPauseButtonStyleCSS( attributes, 'Tablet' ),
			getYoutubePlayPauseButtonStyleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-selfhosted-container > .plyr--video  > .plyr__controls',
			getSelfVideoStyleCSS( attributes ),
			getSelfVideoStyleCSS( attributes, 'Tablet' ),
			getSelfVideoStyleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-selfhosted-container > .plyr--html5 > .plyr__control--overlaid',
			getSelfHostControlStyleCSS( attributes ),
			getSelfHostControlStyleCSS( attributes, 'Tablet' ),
			getSelfHostControlStyleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-vimeo-container > .plyr--video  > .plyr__controls',
			getVimeoVideoStyleCSS( attributes ),
			getVimeoVideoStyleCSS( attributes, 'Tablet' ),
			getVimeoVideoStyleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-vimeo-container > .plyr--vimeo > .plyr__control--overlaid',
			getVimeoPlayerControlStyleCSS( attributes ),
			getVimeoPlayerControlStyleCSS( attributes, 'Tablet' ),
			getVimeoPlayerControlStyleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .plyr__poster',
			getPosterImage( attributes ),
			getPosterImage( attributes, 'Tablet' ),
			getPosterImage( attributes, 'Mobile' )
		);
		return cssGenerator.generateCSS();
	}, [ attributes ] );

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
