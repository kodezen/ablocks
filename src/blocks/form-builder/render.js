import React, { useEffect, useState, useRef } from 'react';
import RenderContainer from '@Components/block-container/render2';
import { BlockControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { setRoles, TOOLBAR_ALIGNMENT_OPTIONS } from './helper';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import metadata from './block.json';
import { useDispatch, select, subscribe, useSelect } from '@wordpress/data';
import { getDuplicateFieldNames, getEmptyFieldNames } from './inner-data';
import { makeRequest } from '@Utils/helper';

function generateShortUniqueName() {
	// Generates a short unique identifier, e.g., "field-5f2b9"
	return `field-${ Math.floor( Math.random() * 1000 ) + 1 }`;
}
export default function Render( props ) {
	const { attributes, setAttributes, isSelected, clientId } = props;
	const {
		block_id,
		dir,
		formType,
		alignment,
		buttonSize,
		buttonText,
		loginRedirect,
		registerRedirect,
		postId,
		link,
		navigatorAccess,
		forgetPasswordLabel,
		loginLabel,
		registerLabel,
		navigatorIcon,
		showErrorDemo,
		showSuccessDemo,
		homeLabel,
		navigatorIconShow,
		email_template_id,
	} = attributes;
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const [ isUserInsertion, setIsUserInsertion ] = useState( false );
	const fieldCounterRef = useRef( 1 );
	const previousInnerBlocks = useRef(
		wp.data.select( 'core/block-editor' ).getBlocks( clientId )
	);
	const innerBlocks = useSelect(
		( selected ) => selected( 'core/block-editor' ).getBlocks( clientId ),
		[ clientId ]
	);
	// found duplicate block
	const uniqueDuplicates = getDuplicateFieldNames( innerBlocks );
	const emptyFieldNames = getEmptyFieldNames( innerBlocks );

	useEffect( () => {
		const combined = innerBlocks.map( ( child ) => ( {
			name: child.attributes.name,
			inputType: child.attributes.inputType,
		} ) );
		setAttributes( {
			childDetails: combined,
		} );
	}, [ innerBlocks ] );
	const allowedBlocks = [
		'ablocks/form-input',
		'ablocks/form-password',
		'ablocks/form-email',
		'ablocks/form-textarea',
		'ablocks/form-checkbox',
		'ablocks/form-select',
		'ablocks/form-radio',
		'ablocks/heading',
		'ablocks/paragraph',
		'ablocks/icon',
		'ablocks/image',
		'ablocks/divider',
		'ablocks/form-hidden',
		'ablocks/form-rating',
		'ablocks/form-datepicker',
		'ablocks/form-upload',
		'ablocks/form-timepicker',
	];

	const dispatch = useDispatch();

	useEffect( () => {
		const currentPostId = wp.data
			.select( 'core/editor' )
			.getCurrentPostId();
		setAttributes( {
			postId: currentPostId,
		} );
		if ( formType === 'registration' ) {
			setRoles( setAttributes );
		}
		if ( email_template_id === '' ) {
			setAttributes( {
				email_template_id: `ablocks-form-email-template-UnId${
					Math.floor( Math.random() * 11500 ) + 133
				}`,
			} );
		}
	}, [] );

	useEffect( () => {
		const unsubscribe = subscribe( () => {
			const currentInnerBlocks =
				select( 'core/block-editor' ).getBlocks( clientId );
			const hasNewBlocks =
				currentInnerBlocks.length > previousInnerBlocks.current.length;

			if ( hasNewBlocks ) {
				setIsUserInsertion( true );
			}
		} );

		return () => unsubscribe(); // Cleanup on unmount
	}, [ clientId ] );

	useEffect( () => {
		if ( ! isUserInsertion ) {
			return;
		}

		const currentInnerBlocks =
			select( 'core/block-editor' ).getBlocks( clientId );
		const newInnerBlocks = currentInnerBlocks.filter(
			( block ) =>
				! previousInnerBlocks.current.some(
					( prevBlock ) => prevBlock.clientId === block.clientId
				)
		);

		newInnerBlocks.forEach( ( block ) => {
			if ( allowedBlocks.includes( block.name ) ) {
				const uniqueName = generateShortUniqueName();
				let updatedAttributes;
				if (
					block.name === 'ablocks/form-checkbox' ||
					block.name === 'ablocks/form-radio'
				) {
					updatedAttributes = {
						name: 'MulSe' + uniqueName,
						inputType: 'checkbox',
					};
				} else {
					updatedAttributes = {
						name: uniqueName,
						inputType: 'Text',
					};
				}

				dispatch( 'core/block-editor' ).updateBlockAttributes(
					block.clientId,
					updatedAttributes
				);
				fieldCounterRef.current++;
			}
		} );

		previousInnerBlocks.current = currentInnerBlocks;
		setIsUserInsertion( false ); // Reset the flag after handling
	}, [ isUserInsertion ] );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'ablocks-form-builder__fields' },
		{
			allowedBlocks,
		}
	);
	const FormType =
		[ 'login', 'registration', 'forget_password' ].indexOf( formType ) !==
		-1
			? formType
			: 'submit';
	const changeChildAttribute = () => {
		const childBlocks = select( 'core/block-editor' ).getBlocks( clientId );
		if ( childBlocks.length > 0 ) {
			childBlocks.forEach( ( childBlock ) => {
				const childBlockId = childBlock.clientId;
				updateBlockAttributes( childBlockId, {
					formType,
				} );
			} );
		}
	};
	useEffect( () => {
		if ( isSelected ) {
			changeChildAttribute();
		}
	}, [ attributes, isSelected ] );

	// delete  form email templates on block delete
	useEffect( () => {
		return () => {
			const checkEditor =
				select( 'core/block-editor' ).getBlock( clientId );
			if ( ! checkEditor ) {
				const deleteEmailTemplates = async () => {
					try {
						const payload = {
							action: 'ablocks/remove_templates',
							email_template_id,
						};
						const response = await makeRequest( payload );
					} catch ( error ) {
						console.error( 'Error removing templates:', error );
					}
				};
				deleteEmailTemplates();
			}
		};
	}, [ block_id, clientId, email_template_id ] );

	return (
		<React.Fragment>
			<BlockControls>
				<ABlocksToolbarAlignment
					attributeValue={ alignment }
					setAttributes={ setAttributes }
					options={ TOOLBAR_ALIGNMENT_OPTIONS }
				/>
			</BlockControls>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ uniqueDuplicates.length > 0 && (
					<div className="ablocks-form-builder-duplicatedname">
						⚠️ Some field name are duplicated: "
						{ uniqueDuplicates.join( ', ' ) }" . Please make each
						field name unique to avoid conflicts.
					</div>
				) }
				{ emptyFieldNames.length > 0 && (
					<div className="ablocks-form-builder-duplicatedname">
						⚠️ Some field "Name" are empty. Please provide a name
						its Requried ! .
					</div>
				) }
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
					<div { ...innerBlocksProps }></div>
					{ formType !== 'multi-step' && (
						<button
							className={ `ablocks-form-builder__submit-button ablocks-form-builder__submit-button--${ buttonSize }` }
							type="button"
						>
							{ buttonText }
						</button>
					) }
				</form>
				{ ( showSuccessDemo || showErrorDemo ) && (
					<div
						className={ `ablocks-block--form-builder__feedback-message ablocks-block--form-builder__${
							showErrorDemo ? 'error' : 'success'
						}` }
					>
						<p
							className={ `${
								showErrorDemo ? 'error' : 'success'
							}-msg` }
						>
							{ showErrorDemo
								? `Oops!  Something went wrong while submitting the form. Please try again later.`
								: `Congratulations! Your form has been submitted successfully!` }
						</p>
					</div>
				) }
				{ navigatorAccess && (
					<div className="ablocks-block--form-builder__navigator">
						{ formType === 'login' && (
							<div className="ablocks-block--form-builder__navigator-redirect-page">
								{ /* eslint-disable-next-line */ }
								<a href="#">{ registerLabel }</a>|
								{ /* eslint-disable-next-line */ }
								<a href="#">{ forgetPasswordLabel }</a>
							</div>
						) }
						{ ( formType === 'registration' ||
							formType === 'forget_password' ) && (
							<div className="ablocks-block--form-builder__navigator-redirect-page">
								{ /* eslint-disable-next-line */ }
								<a href="#">{ loginLabel }</a>
							</div>
						) }
						{ ( formType === 'registration' ||
							formType === 'forget_password' ||
							formType === 'login' ) && (
							<div className="ablocks-block--form-builder__navigator-home-page">
								{ /* eslint-disable-next-line */ }
								<a href="#">
									{ navigatorIconShow && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox={ navigatorIcon.viewBox }
											className="ablocks-svg-icon ablocks-block--form-builder__arrow-icon"
										>
											<path
												d={ navigatorIcon.path }
											></path>
										</svg>
									) }

									{ homeLabel }
								</a>
							</div>
						) }
					</div>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}
