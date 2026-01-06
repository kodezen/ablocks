import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import PropTypes from 'prop-types';
import { applyFilters } from '@wordpress/hooks';
import { loadGoogleFontsInEditor } from '@Controls/typography/helper';
import QuickEdit from './quickEdit';
import { getRenderDomElement } from '@Utils/helper';
import ABlocksAnimation from './../../blocks-common/animation';
import { getClassNames } from './helper';
import './styles.scss';
import Toolbar from './toolbar';

const propTypes = {
	name: PropTypes.string,
	blockId: PropTypes.string,
	typography: PropTypes.array,
	blockProps: PropTypes.object,
};

const allFonts = {};
const insertFontsData = ( fontData ) => {
	const fontFamily = fontData?.fontFamily;
	const fontWeight = fontData?.weight || '400';
	const existingWeights = allFonts[ fontFamily ];
	if ( ! fontFamily || existingWeights?.includes( fontWeight ) ) {
		return;
	}
	if ( existingWeights ) {
		if ( fontWeight ) {
			existingWeights.push( fontWeight );
		}
	} else {
		allFonts[ fontFamily ] = fontWeight ? [ fontWeight ] : [];
	}
};

export default function RenderContainer( {
	name,
	blockId,
	children,
	attributes = {},
	typography,
	className = '',
	blockProps = {},
} ) {
	const editorContainerRef = useRef( null );
	const editorContainerEl = editorContainerRef?.current;
	const {
		_hide_on_desktop,
		_hide_on_tablet,
		_hide_on_mobile,
		_animation,
		overflow,
	} = attributes;

	// eslint-disable-next-line
	let renderContainerClasses = applyFilters(
		`ablocks.global.render_container_classes`,
		{},
		attributes
	);

	// eslint-disable-next-line
	let renderContainerAttributes = applyFilters(
		`ablocks.global.render_container_attributes`,
		{},
		attributes
	);

	const isEnabledAnimation =
		( _animation?.animationType && _animation?.animationType !== 'none' ) ||
		( _animation?.animationTypeTablet &&
			_animation?.animationTypeTablet !== 'none' ) ||
		( _animation?.animationTypeMobile &&
			_animation?.animationTypeMobile !== 'none' );

	const blockPropsArgs = {
		className: getClassNames( {
			name,
			blockId,
			className: classNames( className, attributes?.className, {
				'ablocks-invisible': isEnabledAnimation,
				...renderContainerClasses,
			} ),
			_hide_on_desktop,
			_hide_on_tablet,
			_hide_on_mobile,
		} ),
		...blockProps,
	};

	const dataSettings = {
		...( isEnabledAnimation ? _animation : {} ),
		...renderContainerAttributes,
	};
	// eslint-disable-next-line
	if (!_.isEmpty(dataSettings)) {
		blockPropsArgs[ 'data-settings' ] = JSON.stringify( dataSettings );
	}

	const allBlockProps = useBlockProps( blockPropsArgs );

	if ( Array.isArray( typography ) ) {
		for ( const item of typography ) {
			insertFontsData( item );
		}
	} else {
		for ( const key in attributes ) {
			if ( ! /typography/i.test( key ) ) {
				continue;
			}
			insertFontsData( attributes[ key ] );
		}
	}

	useEffect(
		() => {
			if ( Object.keys( allFonts ).length > 0 ) {
				loadGoogleFontsInEditor( allFonts, editorContainerEl );
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		Object.keys( allFonts )
			.concat(
				Object.values( allFonts ).reduce(
					( accumulator, currentValue ) =>
						accumulator.concat( currentValue ),
					[]
				)
			)
			.concat( editorContainerEl )
	);

	useEffect( () => {
		new ABlocksAnimation(
			getRenderDomElement( `.ablocks-block-${ blockId }` )
		);
	}, [
		_animation?.animationType,
		_animation?.animationTypeTablet,
		_animation?.animationTypeMobile,
	] );

	return (
		<>
			<Toolbar />
			<div { ...allBlockProps }>
				<QuickEdit
					blockId={ blockId }
					name={ name }
					overflow={ overflow }
				/>
				<div
					className="ablocks-block-container"
					ref={ editorContainerRef }
				>
					{ children }
				</div>
			</div>
		</>
	);
}

RenderContainer.propTypes = propTypes;
