import React from 'react';
import { regular, solid, brands } from '../helper';

const iconTypes = [
	{ prefix: 'far fa', type: 'regular', icons: regular?.icons },
	{ prefix: 'fas fa', type: 'solid', icons: solid?.icons },
	{ prefix: 'fab fa', type: 'brands', icons: brands?.icons },
];

function Icon( { iconType, iconName, changeHandler } ) {
	const iconClass = iconType.prefix;

	return (
		<>
			<div
				role="presentation"
				className="__icon"
				onClick={ () =>
					changeHandler( `${ iconClass }-${ iconName }`, 'icon' )
				}
				onKeyDown={ () => {} }
			>
				<i className={ `${ iconClass }-${ iconName }` } />
			</div>
			<span className="__icon-name">
				{ iconName.replace( /-/g, ' ' ) }
			</span>
		</>
	);
}

function RenderIconLists( { changeHandler, searchIconQuery, modalIconType } ) {
	const searchWords = searchIconQuery?.toLowerCase().trim();

	return (
		<div className="ablocks-icon-library--icon-container">
			{ iconTypes.map( ( type ) => {
				if ( modalIconType === 'all' || modalIconType === type.type ) {
					return type.icons
						.filter( ( iconName ) =>
							iconName
								?.split( '-' )
								.join( ' ' )
								.includes( searchWords )
						)
						.map( ( iconName, index ) => (
							<div key={ index } className="__icon-wrapper">
								<Icon
									iconType={ type }
									iconName={ iconName }
									changeHandler={ changeHandler }
								/>
							</div>
						) );
				}
				return null;
			} ) }
		</div>
	);
}

export default RenderIconLists;
