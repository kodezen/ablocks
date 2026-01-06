import React, { useEffect } from 'react';
import metadata from './block.json';
import Content from './Content';
import CustomToolbar from './toolbar';
import {
	regularIcons,
	brandsIcons,
	solidIcons,
} from '@Controls/icon-upload/icons-svg-data';
import RenderContainer from '@Components/block-container/render2';
const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		block_id,
		lists,
		listIconsClasses,
		markerType,
		listIcons,
		divider,
	} = attributes;

	let uniqueIdCounter =
		Array.isArray( lists ) && lists.length
			? lists[ lists.length - 1 ].id + 1
			: 0;
	const addNewListItem = () => {
		const newItem = {
			id: uniqueIdCounter++,
			text: '',
			link: {
				linkDestination: '',
				href: '',
				lightbox: '',
				linkTarget: '',
				rel: '',
				noFollow: '',
				keyValue: '',
				linkClass: '',
			},
			iconColor: '',
			textColor: '',
			markerColor: '',
			isOpen: false,
		};
		const updatedList = lists.map( ( item ) => {
			if ( item.isOpen ) {
				return { ...item, isOpen: ! item.isOpen };
			}
			return item;
		} );
		setAttributes( {
			lists: [ ...updatedList, newItem ],
			listIconsClasses: [ ...( listIconsClasses || [] ) ],
		} );
	};

	useEffect( () => {
		if ( markerType === 'icon' ) {
			if ( listIcons?.length !== listIconsClasses?.length ) {
				const newListIcons = [];
				for ( const iconClassName of listIconsClasses || [] ) {
					const iconsList = {};
					let viewBox = '';
					let path = '';
					if ( ! iconClassName ) {
						newListIcons.push( {
							viewBox,
							path,
						} );
						continue;
					}

					const iconType = iconClassName.substring( 2, 3 );
					switch ( iconType ) {
						case 'r':
							iconsList.data = regularIcons.icons;
							break;

						case 's':
							iconsList.data = solidIcons.icons;
							break;

						case 'b':
							iconsList.data = brandsIcons.icons;
							break;
					}

					const iconKey = iconClassName.substring( 7 );
					const iconData = iconsList.data[ iconKey ];
					viewBox = `0 0 ${ iconData[ 0 ] } ${ iconData[ 1 ] }`;
					path = iconData[ 4 ];
					newListIcons.push( {
						viewBox,
						path,
					} );
				}
				setAttributes( {
					listIcons: newListIcons,
				} );
			}
		} else {
			setAttributes( {
				listIcons: [],
			} );
		}
	}, [ markerType, listIconsClasses?.length, listIcons?.length ] );

	return (
		<React.Fragment>
			<CustomToolbar addNewListItem={ addNewListItem } />
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
				<div className="ablocks-list">
					{ lists?.map( ( list, index ) => (
						<>
							<Content
								key={ index }
								index={ index }
								attributes={ attributes }
								list={ list }
								setAttributes={ setAttributes }
							/>
							{ divider && (
								<div className="ablocks-list_item-content-divider"></div>
							) }
						</>
					) ) }
				</div>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
