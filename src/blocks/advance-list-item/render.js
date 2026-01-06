import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import RenderContainer from '@Components/block-container/render';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { TOOLBAR_ALIGNMENT_OPTIONS } from './helper';
import RenderIcon from '@Controls/icon-upload/render-icon';
import GetDeviceType from '@Utils/get-device-type';
import { useSelect } from '@wordpress/data';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import metadata from './block.json';
import AblocksRichText from '@Components/rich-text';
const propTypes = {};

const DividerComp = ( {
	allowDivider,
	dividerType,
	listsDirection,
	deviceType,
} ) => {
	if ( allowDivider && listsDirection[ 'value' + deviceType ] === 'column' ) {
		if ( dividerType === 'mask-style' ) {
			return (
				<div className=" ablocks-divider ablocks-advance-list-item-divider__pattern-mask "></div>
			);
		}
		return (
			<div className=" ablocks-divider ablocks-advance-list-item-divider__pattern-css "></div>
		);
	}
};

export default function Render( props ) {
	const { attributes, setAttributes, clientId } = props;
	const {
		block_id,
		listsDirection,
		alignment,
		iconAlignment,
		emoji,
		shapeType,
		shapeColor,
		shapeSize,
		advanceListItemText,
		markerType,
		isLastChild,
		allowDivider,
		advanceListItemTextTag,
		dropCaps,
		advanceListItemTextSize,
		dividerType,
		dividerPatternUrl,
		color,
		size,
		weight,
	} = attributes;
	const newDevice = GetDeviceType();
	useEffect( () => {
		setAttributes( { device: newDevice } );
	}, [ newDevice ] );

	const renderContent = () => {
		if ( markerType === 'Icon' ) {
			return <RenderIcon attributes={ attributes } />;
		} else if ( markerType === 'Emoji' ) {
			return (
				<RichText
					tagName={ 'span' }
					value={ emoji }
					className={ 'emoji advance-list-item-marker' }
				/>
			);
		} else if ( markerType === 'none' ) {
		} else {
			return (
				<span
					className={ `advance-list-item-${ shapeType } advance-list-item-marker` }
				></span>
			);
		}
	};

	const isLastInnerChild = useSelect(
		( select ) => {
			const { getBlockIndex, getBlockCount, getBlockRootClientId } =
				select( 'core/block-editor' );
			const parentClientId = getBlockRootClientId( clientId );
			const blockIndex = getBlockIndex( clientId, parentClientId );
			const totalBlocks = getBlockCount( parentClientId );
			return blockIndex === totalBlocks - 1;
		},
		[ clientId ] // Dependencies
	);
	useEffect( () => {
		setAttributes( { isLastChild: isLastInnerChild } );
	}, [ isLastInnerChild ] );

	const parentAttributes = useSelect(
		( select ) => {
			const { getBlockParents } = select( 'core/block-editor' );
			const parentsCount = getBlockParents( clientId ).length;
			if ( parentsCount > 1 ) {
				const parentId =
					getBlockParents( clientId )?.[ parentsCount - 1 ];
				return select( 'core/block-editor' ).getBlockAttributes(
					parentId
				);
			}
			const parentId = getBlockParents( clientId )?.[ 0 ];
			return select( 'core/block-editor' ).getBlockAttributes( parentId );
		},
		[ clientId ]
	);

	useEffect( () => {
		const storedAttributes = [ 'emoji', 'shapeType', 'shapeColor' ];
		const tempArray = Array.isArray( attributes.changedAttributes )
			? [ ...attributes.changedAttributes ]
			: [];

		storedAttributes.forEach( ( item ) => {
			if (
				attributes[ item ] !== '' &&
				attributes[ item ] !== parentAttributes?.[ item ]
			) {
				if ( ! tempArray.includes( item ) ) {
					tempArray.push( item );
				}
			}
		} );

		setAttributes( { changedAttributes: tempArray } );
	}, [ emoji, shapeType, shapeColor ] );

	useEffect( () => {
		const storedAttributes = [ 'shapeSize', 'iconAlignment' ];
		const tempArray = Array.isArray( attributes.changedAttributes )
			? [ ...attributes.changedAttributes ]
			: [];
		const subAttributes = [ 'value', 'valueMobile', 'valueTablet' ];

		storedAttributes.forEach( ( item ) => {
			subAttributes.forEach( ( item2 ) => {
				if (
					attributes[ item ]?.[ item2 ] &&
					parentAttributes?.[ item ]?.[ item2 ] &&
					attributes[ item ][ item2 ] !==
						parentAttributes[ item ][ item2 ] &&
					! tempArray.includes( item )
				) {
					tempArray.push( item );
				}
			} );
		} );

		setAttributes( { changedAttributes: tempArray } );
	}, [ shapeSize, iconAlignment ] );

	useEffect( () => {
		if ( dividerPatternUrl && color === '' ) {
			setAttributes( { color: parentAttributes.color } );
		}
		if ( dividerType === 'mask-style' ) {
			if ( dividerPatternUrl && size === null ) {
				setAttributes( { size: parentAttributes.size } );
			}
		} else if ( dividerPatternUrl && weight === null ) {
			setAttributes( { weight: parentAttributes.weight } );
		}
	}, [ dividerPatternUrl ] );

	const deviceType = GetDeviceType();

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
				typography={ [
					{
						fontFamily: attributes.typography?.fontFamily,
						weight: attributes.typography?.weight,
					},
				] }
			>
				{ renderContent() }
				<AblocksRichText
					tagName={ advanceListItemTextTag }
					value={ advanceListItemText }
					className={ classNames(
						'ablocks-advance-list-item-text',
						`ablocks-advance-list-item-text-${ advanceListItemTextSize }`,
						{
							'ablocks-advance-list-item-text-drop-caps':
								dropCaps,
						}
					) }
					onChange={ ( changeAdvanceListItemText ) =>
						setAttributes( {
							advanceListItemText: changeAdvanceListItemText,
						} )
					}
					placeholder={ __( 'Add your paragraph text', 'ablocks' ) }
				/>
				{ ! isLastChild && (
					<DividerComp
						allowDivider={ allowDivider }
						dividerType={ dividerType }
						listsDirection={ listsDirection }
						deviceType={ deviceType }
					/>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
