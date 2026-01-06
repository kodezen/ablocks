import React, { useState, useRef, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
const iconButton = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="lucide lucide-ellipsis-vertical"
	>
		<circle cx="12" cy="12" r="1"></circle>
		<circle cx="12" cy="5" r="1"></circle>
		<circle cx="12" cy="19" r="1"></circle>
	</svg>
);

const ActionButton = ( {
	formTags = [],
	genericTags,
	attributes,
	setAttributes,
	targetKey,
	isQuillEditor = false,
} ) => {
	const [ isOpen, setIsOpen ] = useState( false );
	const dropdownRef = useRef( null );

	const toggleDropdown = () => setIsOpen( ! isOpen );

	const handleClickOutside = ( event ) => {
		if (
			dropdownRef.current &&
			! dropdownRef.current.contains( event.target )
		) {
			setIsOpen( false );
		}
	};

	const handleTagSelect = ( tag ) => {
		const currentValue = attributes[ targetKey ] || '';
		setAttributes( {
			[ targetKey ]: `${ currentValue }${
				currentValue ? ' ' : ''
			}{${ tag }}`,
		} );
		setIsOpen( false );
	};

	useEffect( () => {
		document.addEventListener( 'mousedown', handleClickOutside );
		return () =>
			document.removeEventListener( 'mousedown', handleClickOutside );
	}, [] );

	return (
		<div className="ablocks-form-builder-action-button" ref={ dropdownRef }>
			<button
				onClick={ toggleDropdown }
				className={
					isQuillEditor
						? 'ablocks-form-builder-action-button-quill-trigger'
						: 'ablocks-form-builder-action-button__trigger'
				}
			>
				{ isQuillEditor ? (
					<>
						Add Shortcode{ ' ' }
						<span className="ablocks-icon ablocks-icon--angle-down"></span>
					</>
				) : (
					iconButton
				) }
			</button>

			{ isOpen && (
				<div className="ablocks-form-builder-action-button__dropdown">
					<div className="ablocks-form-builder-action-button__section">
						<strong className="ablocks-form-builder-action-button__title">
							{ __( 'Form input tags', 'ablocks' ) }
						</strong>
						{ formTags?.length > 0 ? (
							formTags.map( ( item, index ) => (
								<div
									key={ index }
									className="ablocks-form-builder-action-button__item"
									onClick={ () =>
										handleTagSelect( item?.value )
									}
								>
									{ item?.label }
								</div>
							) )
						) : (
							<div className="ablocks-form-builder-action-button__empty">
								{ __( 'No tags available', 'ablocks' ) }
							</div>
						) }
					</div>

					<div className="ablocks-form-builder-action-button__section">
						<strong className="ablocks-form-builder-action-button__title">
							{ __( 'Generic tags', 'ablocks' ) }
						</strong>
						{ genericTags?.length > 0 ? (
							genericTags.map( ( item, index ) => (
								<div
									key={ index }
									className="ablocks-form-builder-action-button__item"
									onClick={ () =>
										handleTagSelect( item?.value )
									}
								>
									{ item?.label }
								</div>
							) )
						) : (
							<div className="ablocks-form-builder-action-button__empty">
								{ __( 'No tags available', 'ablocks' ) }
							</div>
						) }
					</div>
				</div>
			) }
		</div>
	);
};

export default ActionButton;
