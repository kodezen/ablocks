import React, { useEffect, useState } from 'react';
import { useSelect, useDispatch } from '@wordpress/data';
import { useInstanceId } from '@wordpress/compose';
import {
	useBlockProps,
	store as blockEditorStore,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import variations from './variations';
import './styles.scss';

const DEFAULTS_POSTS_PER_PAGE = 3;

export default function QueryContent( { attributes, setAttributes } ) {
	const {
		queryId,
		query,
		tagName: TagName = 'div',
		query: { inherit } = {},
		selectedVariation,
	} = attributes;

	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch( blockEditorStore );
	const instanceId = useInstanceId( QueryContent );
	const blockProps = useBlockProps();

	const { postsPerPage } = useSelect( ( select ) => {
		const { getSettings } = select( blockEditorStore );
		const { getEntityRecord, getEntityRecordEdits, canUser } =
			select( coreStore );

		const settingPerPage = canUser( 'read', {
			kind: 'root',
			name: 'site',
		} )
			? +getEntityRecord( 'root', 'site' )?.posts_per_page
			: +getSettings().postsPerPage;

		const editedSettingPerPage = +getEntityRecordEdits( 'root', 'site' )
			?.posts_per_page;

		return {
			postsPerPage:
				editedSettingPerPage ||
				settingPerPage ||
				DEFAULTS_POSTS_PER_PAGE,
		};
	}, [] );

	useEffect( () => {
		const newQuery = {};
		if ( inherit && query.perPage !== postsPerPage ) {
			newQuery.perPage = postsPerPage;
		} else if ( ! query.perPage && postsPerPage ) {
			newQuery.perPage = postsPerPage;
		}
		if ( !! Object.keys( newQuery ).length ) {
			__unstableMarkNextChangeAsNotPersistent();
			updateQuery( newQuery );
		}
	}, [ postsPerPage, inherit ] );

	useEffect( () => {
		if ( ! Number.isFinite( queryId ) ) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes( { queryId: instanceId } );
		}
	}, [ queryId, instanceId ] );

	const updateQuery = ( newQuery ) =>
		setAttributes( { query: { ...query, ...newQuery } } );

	const selectedTemplate = variations.find(
		( v ) => v.name === attributes.selectedVariation
	);
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: selectedTemplate ? selectedTemplate.innerBlocks : [],
		templateLock: false,
	} );

	return (
		<TagName { ...blockProps }>
			{ ! selectedVariation && (
				<div className="ablocks-query-loop-selector">
					<h3 className="ablocks-query-loop-selector-title">
						{ __(
							'Choose a template or start from blank',
							'ablocks'
						) }
					</h3>
					<div className="ablocks-query-loop-variations">
						{ variations.map( ( variation ) => (
							<div
								key={ variation.name }
								className="ablocks-query-loop-option"
								onClick={ () =>
									setAttributes( {
										selectedVariation: variation.name,
									} )
								}
								role="button"
								tabIndex={ 0 }
							>
								<div className="ablocks-query-loop-option-icon">
									{ variation.icon }
								</div>
								<span className="ablocks-query-loop-option-title">
									{ variation.title }
								</span>
							</div>
						) ) }
					</div>
				</div>
			) }

			{ selectedVariation && <div { ...innerBlocksProps } /> }
		</TagName>
	);
}
