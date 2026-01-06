import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'just-debounce-it';
import RenderContainer from '@Components/block-container/render2';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import AblocksRichText from '@Components/rich-text';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { makeRequest } from '@Utils/helper';
import { useSelect } from '@wordpress/data';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';
import searchImg from './search.png';
const propTypes = {};
const defaultProps = {};

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const [ showSearchData, setShowSearchData ] = useState( false );
	const [ searchResult, setSearchResult ] = useState( [] );
	const [ showSpinner, setShowSpinner ] = useState( false );
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ isOpen, setIsOpen ] = useState( false );

	const {
		block_id,
		currentPostID,
		isIcon,
		allowCollapse,
		placeholder,
		variant,
		buttonText,
		buttonAlignment,
		source,
	} = attributes;
	const blockProps = useBlockProps();
	const postId = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostId(),
		[]
	);
	useEffect( () => {
		setAttributes( { currentPostID: postId } );
	}, [ postId ] );

	const SearchIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="feather feather-search"
		>
			<circle cx="11" cy="11" r="8"></circle>
			<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
		</svg>
	);

	const LoadingSpinner = () => (
		<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
			<circle
				className="ablocks-search-block__spin"
				cx="400"
				cy="400"
				fill="none"
				r="200"
				strokeWidth="50"
				stroke="currentColor"
				strokeDasharray="700 1400"
				strokeLinecap="round"
			/>
		</svg>
	);

	const searchInputChnage = ( e ) => {
		const value = e.target.value;
		setSearchTerm( value );

		if ( value.trim() ) {
			debouncedAPICall( value );
		} else {
			setShowSearchData( false );
			setSearchResult( [] );
		}
	};

	const executeSearch = useCallback(
		( keyword ) => {
			if ( ! keyword.trim() ) {
				setSearchResult( [] );
				setShowSearchData( true );
				return;
			}

			setShowSpinner( true );
			makeRequest( {
				action: 'ablocks/search_block_ajax_action',
				searchQuery: keyword,
				source,
				current_page_id: currentPostID,
			} ).then( ( res ) => {
				if ( res.data.success ) {
					setSearchResult( Object.values( res?.data.data.data ) );
					setShowSearchData( true );
				} else {
					setSearchResult( [] );
					setShowSearchData( true );
				}
				setShowSpinner( false );
			} );
		},
		[ source, currentPostID ]
	); // Dependencies that may change

	const debouncedAPICall = useCallback(
		debounce( ( keyword ) => executeSearch( keyword ), 1000 ),
		[ executeSearch ]
	);

	const clickSearch = ( e ) => {
		e.preventDefault();
		setIsOpen( ( prev ) => ! prev );
		executeSearch( searchTerm );
	};

	const isLeftAligned =
		buttonAlignment.value === 'left' || buttonAlignment === 'left';
	const isRightAligned =
		buttonAlignment.value === 'right' || buttonAlignment === 'right';
	const isClassicVariant = variant === 'classic';

	const { isDynamicEnabled, data: dynamicPlaceholderText } = useDynamicData( {
		attributeValue: placeholder,
	} );

	return (
		<React.Fragment>
			<BlockControls></BlockControls>
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
				<div className={ `ablocks-block--search-bar ${ variant } ` }>
					<form
						className={ `ablocks-block--search-form searchbar ${
							isIcon === 'both' || isIcon === 'text' ? isIcon : ''
						}` }
					>
						{ isLeftAligned && ! isClassicVariant && (
							<button
								className={ `ablocks-block--search-button ${
									[ 'both', 'text' ].includes( isIcon )
										? isIcon
										: ''
								} searchbar-submit-left` }
								onClick={ clickSearch }
							>
								{ isIcon !== 'text' && (
									<span>
										{ showSpinner
											? LoadingSpinner()
											: SearchIcon() }
									</span>
								) }
								{ isIcon !== 'icon' &&
									( showSpinner ? (
										<span>{ LoadingSpinner() }</span>
									) : (
										<AblocksRichText
											{ ...blockProps }
											tagName="span"
											identifier="text"
											value={ buttonText }
											placeholder="write"
											className="ablocks-button__text"
											onChange={ ( value ) =>
												setAttributes( { value } )
											}
											aria-label={ __( 'Text' ) }
											withoutInteractiveFormatting
										/>
									) ) }
							</button>
						) }
						<input
							className={ `ablocks-block--search-input searchbar-input ${
								allowCollapse
									? 'ablocks-block--search-input-collapse'
									: ''
							} ${ isOpen ? 'searchbar-input-open' : '' } ${
								isIcon === 'both' || isIcon === 'text'
									? isIcon
									: ''
							} searchbar-input-${ buttonAlignment.value }` }
							type="text"
							placeholder={
								isDynamicEnabled
									? dynamicPlaceholderText
									: placeholder
							}
							value={ searchTerm }
							onChange={ searchInputChnage }
						/>

						{ ( isRightAligned || isClassicVariant ) && (
							<button
								className={ `ablocks-block--search-button searchbar-submit ${
									[ 'both', 'text' ].includes( isIcon )
										? isIcon
										: ''
								} searchbar-submit-right` }
								onClick={ clickSearch }
							>
								<span>
									{ showSpinner
										? LoadingSpinner()
										: SearchIcon() }
								</span>
								{ isIcon !== 'icon' && (
									<AblocksRichText
										{ ...blockProps }
										aria-label={ __( 'Text' ) }
										tagName={ 'span' }
										identifier="text"
										withoutInteractiveFormatting
										value={ buttonText }
										placeholder="write"
										className="ablocks-button__text"
										onChange={ ( value ) =>
											setAttributes( { value } )
										}
									/>
								) }
							</button>
						) }
					</form>
					{ showSearchData && (
						<ul className="ablocks-block--search-result">
							{ Array.isArray( searchResult ) &&
							searchResult.length > 0 ? (
								searchResult.map( ( item, index ) => (
									<li
										className="ablocks-block--search-result__list"
										key={ index }
									>
										{ item.thumbnail ? (
											<a href={ item.link }>
												<img
													className="ablocks-block--search-result__list-thumbnail"
													src={ item.thumbnail }
													alt={ item.title }
												/>
											</a>
										) : (
											<a href={ item.link }>
												<img
													className="ablocks-block--search-result__list-thumbnail"
													src={ searchImg }
													alt="placeholder"
												/>
											</a>
										) }
										<a
											className="ablocks-block--search-result__list-title"
											href={ item.link }
										>
											{ item.title }
										</a>
									</li>
								) )
							) : (
								<p className="ablocks-block--search-result__list-no-data">
									No results available for your search{ ' ' }
								</p>
							) }
						</ul>
					) }
				</div>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
