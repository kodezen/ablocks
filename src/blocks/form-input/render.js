import React, { useEffect } from 'react';
import RenderChildContainer from '@Components/block-container/childRender';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { getRenderDomElement } from '@Utils/helper';
import metadata from './block.json';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, Toolbar } from '@wordpress/components';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';
import { __ } from '@wordpress/i18n';
import ablocksInput from './input';
import { getStandardAutocomplete } from './helper';
import GetDeviceType from '@Utils/get-device-type';
export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		block_id,
		placeholder,
		isRequired,
		name,
		inputType,
		label,
		showIcon,
		helperText,
		errorMsg,
		inputWidth,
	} = attributes;
	const deviceType = GetDeviceType();
	const isDesktop = deviceType === 'Desktop';
	const isTablet = deviceType === 'Tablet';
	const isMobile = deviceType === 'Mobile';

	const { isDynamicEnabled: isDynamicNameEnabled, data: dynamicName } =
		useDynamicData( {
			attributeValue: name,
		} );
	const {
		isDynamicEnabled: isDynamicPlaceholderEnabled,
		data: dynamicPlaceholder,
	} = useDynamicData( {
		attributeValue: placeholder,
	} );
	const { isDynamicEnabled: isDynamicLabelEnabled, data: dynamicLabel } =
		useDynamicData( {
			attributeValue: label,
		} );
	const {
		isDynamicEnabled: isDynamicHelperTextEnabled,
		data: dynamicHelperText,
	} = useDynamicData( {
		attributeValue: helperText,
	} );
	const {
		isDynamicEnabled: isDynamicErrorMsgEnabled,
		data: dynamicErrorMsg,
	} = useDynamicData( {
		attributeValue: errorMsg,
	} );

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

	useEffect( () => {
		ablocksInput( getRenderDomElement( `.ablocks-block-${ block_id }` ) );
	}, [ block_id ] );

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
					{ /* {label} */ }
					{ isDynamicLabelEnabled ? dynamicLabel : label }
				</label>
				{ ( helperText !== '' || dynamicHelperText !== '' ) && (
					<label
						className={ `ablocks-form-builder__helper-text` }
						htmlFor={ block_id }
					>
						{ isDynamicHelperTextEnabled
							? dynamicHelperText
							: helperText }
					</label>
				) }
				{ showIcon && (
					<span className="ablocks-form-builder__input-icon">
						<RenderIcon attributes={ attributes } />
					</span>
				) }
				<input
					className={ `ablocks-form-builder__input ${
						showIcon && 'ablocks-form-builder__input-show-icon'
					}` }
					placeholder={
						isDynamicPlaceholderEnabled
							? dynamicPlaceholder
							: placeholder
					}
					name={ isDynamicNameEnabled ? dynamicName : name }
					id={ block_id }
					type={
						inputType.toLowerCase() === 'username'
							? 'text'
							: inputType.toLowerCase() === 'url'
							? 'url'
							: inputType.toLowerCase()
					}
					autoComplete={ getStandardAutocomplete(
						isDynamicNameEnabled ? dynamicName : name
					) }
				/>
				{ isRequired && (
					<div className="ablocks-block-error-msg">
						{ /* {errorMsg} */ }
						{ isDynamicErrorMsgEnabled
							? dynamicErrorMsg
							: errorMsg }
					</div>
				) }
			</RenderChildContainer>
		</>
	);
}
