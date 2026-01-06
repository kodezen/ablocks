import React from 'react';
import RenderChildContainer from '@Components/block-container/childRender';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, Toolbar } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import GetDeviceType from '@Utils/get-device-type';
import metadata from './block.json';
export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		block_id,
		name,
		placeholder,
		isRequired,
		label,
		helperText,
		errorMsg,
		customName,
		inputWidth,
	} = attributes;

	const deviceType = GetDeviceType();
	const isDesktop = deviceType === 'Desktop';
	const isTablet = deviceType === 'Tablet';
	const isMobile = deviceType === 'Mobile';

	const getButtonClass = ( width ) => {
		const currentWidth = isMobile
			? inputWidth?.valueMobile || inputWidth?.value
			: isTablet
			? inputWidth?.valueTablet || inputWidth?.value
			: inputWidth?.value;
		return currentWidth === width
			? 'ablocks-form-builder-toobar-button--active'
			: '';
	};

	const handleWidthChange = ( newWidth ) => {
		const currentDevice = isMobile
			? 'Mobile'
			: isTablet
			? 'Tablet'
			: 'Desktop';
		const updatedInputWidth = { ...inputWidth };

		if ( currentDevice === 'Desktop' ) {
			updatedInputWidth.value = newWidth;
		} else if ( currentDevice === 'Tablet' ) {
			updatedInputWidth.valueTablet = newWidth;
		} else if ( currentDevice === 'Mobile' ) {
			updatedInputWidth.valueMobile = newWidth;
		}

		setAttributes( { inputWidth: updatedInputWidth } );
	};

	return (
		<>
			<BlockControls group="block">
				<Toolbar>
					<ToolbarButton
						icon={ <span className="icon-100">100%</span> }
						label={ __( '100%', 'ablocks' ) }
						onClick={ () => handleWidthChange( 100 ) }
						className={ getButtonClass( 100 ) }
					/>
					<ToolbarButton
						icon={ <span className="icon-75">75%</span> }
						label={ __( '75%', 'ablocks' ) }
						onClick={ () => handleWidthChange( 75 ) }
						className={ getButtonClass( 75 ) }
					/>
					<ToolbarButton
						icon={ <span className="icon-50">50%</span> }
						label={ __( '50%', 'ablocks' ) }
						onClick={ () => handleWidthChange( 50 ) }
						className={ getButtonClass( 50 ) }
					/>
					<ToolbarButton
						icon={ <span className="icon-33">33%</span> }
						label={ __( '33%', 'ablocks' ) }
						onClick={ () => handleWidthChange( 33 ) }
						className={ getButtonClass( 33 ) }
					/>
					<ToolbarButton
						icon={ <span className="icon-25">25%</span> }
						label={ __( '25%', 'ablocks' ) }
						onClick={ () => handleWidthChange( 25 ) }
						className={ getButtonClass( 25 ) }
					/>
				</Toolbar>
			</BlockControls>
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				className="ablocks-form-builder__field"
			>
				<label
					className={ `ablocks-form-builder__label ${
						isRequired
							? 'ablocks-form-builder__label--required'
							: ''
					} ` }
					htmlFor={ block_id }
				>
					{ label }
				</label>
				{ helperText !== '' && (
					<label
						className={ `ablocks-form-builder__helper-text` }
						htmlFor={ block_id }
					>
						{ helperText }
					</label>
				) }
				<textarea
					className="ablocks-form-builder__input ablocks-form-builder__field__text"
					rows={ attributes?.textAreaRow }
					placeholder={ placeholder }
					name={ name === 'custom' ? customName : name }
					id={ block_id }
				></textarea>
				{ isRequired && (
					<div className="ablocks-block-error-msg">{ errorMsg }</div>
				) }
			</RenderChildContainer>
		</>
	);
}
