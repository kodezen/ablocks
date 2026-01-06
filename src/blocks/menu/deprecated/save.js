import React from 'react';
import SaveContainer from '@Components/block-container/save';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import metadata from './block.json';
const propTypes = {};
export default function Save( props ) {
	const { attributes } = props;
	const { block_id, sideBarMenuDevice } = attributes;
	const { innerBlocksProps, children } = useInnerBlocksProps.save();
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				blockProps={ {
					'data-menu-device': sideBarMenuDevice,
				} }
			>
				<div className="ablocks-menu__trigger-wrapper">
					<div
						className={ ` ablocks-menu__trigger ablocks-menu-${ sideBarMenuDevice }__trigger` }
					>
						<input
							type="checkbox"
							className="ablocks-menu__trigger-toggle"
						/>
						<span className="ablocks-menu__trigger-item"></span>
						<span className="ablocks-menu__trigger-item"></span>
						<span className="ablocks-menu__trigger-item"></span>
					</div>
				</div>
				<nav
					className={ ` ablocks-block-${ block_id } ablocks-menu ablocks-menu-${ sideBarMenuDevice }` }
				>
					<ul className="ablocks-main-menu" { ...innerBlocksProps }>
						{ children }
					</ul>
				</nav>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
