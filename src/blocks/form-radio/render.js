import React, { useEffect } from 'react';
import RenderChildContainer from '@Components/block-container/childRender';
import metadata from './block.json';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, Toolbar } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import GetDeviceType from '@Utils/get-device-type';
import { RenderMarker } from './helper';

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		block_id,
		label,
		isRequired,
		name,
		radioArr,
		helperText,
		inputType,
		markerType,
		listIcons,
		inputWidth,
	} = attributes;
	useEffect( () => {
		if ( inputType === '' ) {
			setAttributes( { inputType: 'checkbox' } );
		}
	}, [] );

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
				className="ablocks-form-builder__radio-field ablocks-form-builder__field"
			>
				<p
					className={ `ablocks-form-builder__label ${
						isRequired
							? 'ablocks-form-builder__label--required'
							: ''
					} ` }
					htmlFor={ block_id }
				>
					{ label }
				</p>
				{ helperText !== '' && (
					// eslint-disable-next-line
					<label className={`ablocks-form-builder__helper-text`}>
						{ helperText }
					</label>
				) }
				<div className="ablocks-form-builder__radio-all-options">
					{ radioArr?.map( ( radio, index ) => (
						<div
							className="ablocks-form-builder__radio-option"
							key={ index }
						>
							<div className="ablocks-form-builder__radio-content">
								<RenderMarker
									markerType={ markerType }
									index={ index }
									iconAttributes={ listIcons }
									listProperties={ radio }
								/>
								<label htmlFor={ block_id }>
									{ ' ' }
									{ radio.value }{ ' ' }
								</label>
							</div>
							<input
								type={ inputType }
								name={ name }
								value={ radio.value }
								htmlFor={ block_id }
							/>
						</div>
					) ) }
				</div>
			</RenderChildContainer>
		</>
	);
}
