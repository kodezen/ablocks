import React, { useEffect, useState } from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { Tooltip } from '@wordpress/components';
import './style.css';
import { getRenderDomElement } from '@Utils/helper';
import GetDeviceType from '@Utils/get-device-type';
import {
	useDispatch,
	useSelect,
	select as dataSelect,
	dispatch,
} from '@wordpress/data';
import ABlocksTabs from './tabs';
import TabHeaderToolbar from './header-toolbar';
import {
	updateTabsTitle,
	updateTabsSubtitle,
	addTab,
	removeTab,
	onMove,
} from './helper';
const Render = ( props ) => {
	const { attributes, setAttributes, clientId } = props;
	const { insertBlock, removeBlock } = ! wp.blockEditor
		? dispatch( 'core/editor' )
		: dispatch( 'core/block-editor' );
	const { getBlockOrder } = ! wp.blockEditor
		? dataSelect( 'core/editor' )
		: dataSelect( 'core/block-editor' );

	const {
		block_id,
		tabHeaders,
		tabSubTitles,
		tabActive,
		previousTotalBlock,
		initialOpen,
		showTitle,
		showSubTitle,
		showIcon,
		iconPosition,
		tabPositionChange,
		enableAutoChange,
		tabIcons,
		clickedTabIndex,
		enableHoverSwitch,
	} = attributes;
	const [ hoveredTab, setHoveredTab ] = useState( null );
	const device = GetDeviceType();
	const innerBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks( clientId ),
		[ clientId ]
	);
	const { moveBlockToPosition } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		if ( innerBlocks.length > 0 ) {
			const element = getRenderDomElement(
				`.ablocks-block-${ block_id } .ablocks-block-tabs`
			);
			if ( element !== null ) {
				const tabs = new ABlocksTabs( element );
				if ( previousTotalBlock !== innerBlocks.length ) {
					setAttributes( {
						previousTotalBlock: innerBlocks.length,
					} );
					tabs.changeActiveTab( tabActive.toString() );
				}
				return () => {
					tabs.removeListeners();
				};
			}
		}
	}, [ innerBlocks, tabActive, block_id, enableHoverSwitch ] );

	useEffect( () => {
		if ( tabPositionChange === true ) {
			const element = getRenderDomElement(
				`.ablocks-block-${ block_id } .ablocks-block-tabs`
			);
			if ( element !== null ) {
				const tabs = new ABlocksTabs( element );
				setAttributes( {
					tabPositionChange: false,
				} );
				tabs.changeActiveTab( tabActive.toString() );
				return () => {
					tabs.removeListeners();
				};
			}
		}
	}, [ tabPositionChange ] );
	const handleUpdateTabsTitle = ( value, index ) => {
		updateTabsTitle( setAttributes, tabHeaders, value, index );
	};

	const handleUpdateTabsSubtitle = ( value, index ) => {
		updateTabsSubtitle( setAttributes, tabSubTitles, value, index );
	};
	const handleAddTab = () => {
		addTab(
			insertBlock,
			setAttributes,
			tabHeaders,
			tabSubTitles,
			clientId
		);
	};
	const handleRemoveTab = ( index ) => {
		removeTab(
			removeBlock,
			setAttributes,
			getBlockOrder,
			clientId,
			index,
			tabHeaders,
			tabSubTitles
		);
	};
	const onMoveForward = ( oldIndex, realTabs ) => {
		if ( oldIndex === realTabs - 1 ) {
			return;
		}
		handleOnMove( oldIndex, oldIndex + 1 );
	};

	const onMoveBack = ( oldIndex ) => {
		if ( oldIndex < 0 ) {
			return;
		}
		handleOnMove( oldIndex, oldIndex - 1 );
	};

	const moveTab = ( tabId, newIndex ) => {
		moveBlockToPosition( tabId, clientId, clientId, parseInt( newIndex ) );
	};
	const handleOnMove = async ( oldIndex, newIndex ) => {
		await onMove(
			oldIndex,
			newIndex,
			tabHeaders,
			tabSubTitles,
			setAttributes,
			moveTab,
			clientId
		);
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
				<div
					className="ablocks-block-tabs"
					data-initial-open={ initialOpen }
					data-enable-hover-switch={ enableHoverSwitch }
				>
					<ul className="ablocks-block-tabs__tab-panel">
						{ tabHeaders.map( ( header, index ) => (
							<li
								className={ `ablocks-block-tabs__tab ablocks-block-tabs__tab-menu ${
									showIcon &&
									`ablocks-block-tabs__tab-menu-${
										iconPosition[ 'value' + device ]
									}`
								}` }
								data-tab={ index }
								onClick={ () =>
									setAttributes( { clickedTabIndex: index } )
								}
								key={ index }
								onMouseEnter={ () => setHoveredTab( index ) }
								onMouseLeave={ () => setHoveredTab( null ) }
							>
								<div className="ablocks-block-tabs__tab-controls">
									{ hoveredTab === index && (
										<TabHeaderToolbar
											index={ index }
											onRemove={ handleRemoveTab }
											onMoveUp={ onMoveBack }
											onMoveDown={ onMoveForward }
											tabHeaders={ tabHeaders }
										/>
									) }
								</div>

								{ showIcon && (
									<div className="ablocks-block-tabs__icon">
										<RenderIcon
											customIconData={
												tabIcons?.[ index ]
											}
										/>
									</div>
								) }
								<div
									className={ `ablocks-block-tabs__tab-menu-content` }
								>
									{ showTitle && (
										<RichText
											tagName="h2"
											value={ header }
											onChange={ ( value ) =>
												handleUpdateTabsTitle(
													value,
													index
												)
											}
											placeholder={ __(
												'Title…',
												'ablocks'
											) }
											allowedFormats={ [
												'core/bold',
												'core/italic',
											] }
											className={ `ablocks-block-tabs__tab-menu-title` }
										/>
									) }
									{ showSubTitle && (
										<RichText
											tagName="p"
											value={ tabSubTitles[ index ] } // Render subtitle
											onChange={ ( value ) =>
												handleUpdateTabsSubtitle(
													value,
													index
												)
											}
											placeholder={ __(
												'Subtitle…',
												'ablocks'
											) }
											allowedFormats={ [
												'core/bold',
												'core/italic',
											] }
											className="ablocks-block-tabs__tab-menu-subtitle" // Added class
										/>
									) }
								</div>
								{ enableAutoChange && (
									<div className="ablocks-block-tabs__progressbar ablocks-block-tabs__progressbar-editor"></div>
								) }
							</li>
						) ) }
						<li
							className="ablocks-block-tabs__tab ablocks-block-tabs__add-tab"
							role="presentation"
							tabIndex="0"
							onClick={ () => handleAddTab() }
						>
							<Tooltip text={ __( 'Add tab', 'ablocks' ) }>
								<span className="ablocks-icon ablocks-icon--plus"></span>
							</Tooltip>
						</li>
					</ul>
					<div className="ablocks-block-tabs__body">
						<InnerBlocks
							template={ [
								[ 'ablocks/tabs-child' ],
								[ 'ablocks/tabs-child' ],
								[ 'ablocks/tabs-child' ],
							] }
							templateLock={ false }
							allowedBlocks={ [ 'ablocks/tabs-child' ] }
							renderAppender={ false }
						/>
					</div>
				</div>
			</RenderContainer>
		</React.Fragment>
	);
};

export default Render;
