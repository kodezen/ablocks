import React from 'react';
import metadata from './block.json';
import RenderChildContainer from '@Components/block-container/childRender';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { getBlockTypes, createBlock } from '@wordpress/blocks';
import { useSelect, select, dispatch } from '@wordpress/data';
import CustomToolbar from './toolbar';

const propTypes = {};
const defaultProps = {};

export default function Render( props ) {
	const { attributes, clientId } = props;
	const { tagName, block_id, rowSpan, colSpan } = attributes;

	// Inner blocks configuration
	const TEMPLATE = [ [ 'core/paragraph', {} ] ];
	const { innerBlocksProps, children } = useInnerBlocksProps(
		{ className: 'ablocks-table-cell' },
		{
			template: TEMPLATE,
			templateLock: false,
			allowedBlocks: getBlockTypes()
				.filter( ( item ) => ! item.parent )
				.map( ( block ) => block.name ),
		}
	);

	// Delete cell function
	const handleDeleteCell = () => {
		dispatch( 'core/block-editor' ).removeBlock( clientId );
	};
	const handleFindCell = () => {
		dispatch( 'core/edit-post' ).openGeneralSidebar();
		dispatch( 'core/block-editor' ).selectBlock( clientId );
	};
	// ---added after row-----
	const addAfterRow = () => {
		const rowClientId =
			select( 'core/block-editor' ).getBlockRootClientId( clientId );
		const bodyClientId =
			select( 'core/block-editor' ).getBlockRootClientId( rowClientId );
		const tableBodyBlock =
			select( 'core/block-editor' ).getBlock( bodyClientId );
		const clickedRowIndex = tableBodyBlock.innerBlocks.findIndex(
			( block ) => block.clientId === rowClientId
		);
		const clonedInnerBlocks = tableBodyBlock.innerBlocks[
			clickedRowIndex
		].innerBlocks.map( ( innerBlock ) =>
			createBlock( innerBlock.name, innerBlock.attributes )
		);
		const newRowBlock = createBlock(
			'ablocks/table-row',
			{},
			clonedInnerBlocks
		);
		dispatch( 'core/block-editor' ).insertBlock(
			newRowBlock,
			clickedRowIndex + 1,
			bodyClientId
		);
	};
	// -----add before row----
	const addBeforeRow = () => {
		const rowClientId =
			select( 'core/block-editor' ).getBlockRootClientId( clientId );
		const bodyClientId =
			select( 'core/block-editor' ).getBlockRootClientId( rowClientId );
		const tableBodyBlock =
			select( 'core/block-editor' ).getBlock( bodyClientId );
		const clickedRowIndex = tableBodyBlock.innerBlocks.findIndex(
			( block ) => block.clientId === rowClientId
		);
		const clonedInnerBlocks = tableBodyBlock.innerBlocks[
			clickedRowIndex
		].innerBlocks.map( ( innerBlock ) =>
			createBlock( innerBlock.name, innerBlock.attributes )
		);
		const newRowBlock = createBlock(
			'ablocks/table-row',
			{},
			clonedInnerBlocks
		);
		dispatch( 'core/block-editor' ).insertBlock(
			newRowBlock,
			clickedRowIndex,
			bodyClientId
		);
	};

	// --after all  cell add --
	const addCellAtSameIndex = ( rowBlocks, cellIndex, isHeader = false ) => {
		rowBlocks.forEach( ( rowBlock ) => {
			const newCellBlock = createBlock( 'ablocks/table-cell', {
				tagName: isHeader ? 'th' : 'td',
			} );
			dispatch( 'core/block-editor' ).insertBlock(
				newCellBlock,
				cellIndex + 1,
				rowBlock.clientId
			);
		} );
	};
	const addColumnAfter = () => {
		const selectedCellClientId =
			select( 'core/block-editor' ).getSelectedBlockClientId();
		const tableBlock = select( 'core/block-editor' )
			.getBlockParents( selectedCellClientId, true )
			.map(
				( index ) =>
					select( 'core/block-editor' ).getBlocksByClientId(
						index
					)[ 0 ]
			)
			.find( ( block ) => block && block.name === 'ablocks/table' );

		const theadBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-header'
		);
		const tbodyBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-body'
		);
		const tfootBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-footer'
		);
		const selectedRowBlock = select( 'core/block-editor' )
			.getBlockParents( selectedCellClientId, true )
			.map(
				( index ) =>
					select( 'core/block-editor' ).getBlocksByClientId(
						index
					)[ 0 ]
			)
			.find( ( block ) => block.name === 'ablocks/table-row' );
		const currentCellIndex = selectedRowBlock.innerBlocks.findIndex(
			( block ) => block.clientId === selectedCellClientId
		);
		if ( theadBlock ) {
			const headRows = theadBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addCellAtSameIndex( headRows, currentCellIndex, true );
		}
		if ( tbodyBlock ) {
			const bodyRows = tbodyBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addCellAtSameIndex( bodyRows, currentCellIndex, false );
		}

		if ( tfootBlock ) {
			const footRows = tfootBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addCellAtSameIndex( footRows, currentCellIndex, true );
		}
	};

	// added cell before
	const addCellBeSameIndex = ( rowBlocks, cellIndex, isHeader = false ) => {
		rowBlocks.forEach( ( rowBlock ) => {
			const newCellBlock = createBlock( 'ablocks/table-cell', {
				tagName: isHeader ? 'th' : 'td',
			} );
			dispatch( 'core/block-editor' ).insertBlock(
				newCellBlock,
				cellIndex,
				rowBlock.clientId
			);
		} );
	};
	const addColumnBefore = () => {
		const selectedCellClientId =
			select( 'core/block-editor' ).getSelectedBlockClientId();
		const tableBlock = select( 'core/block-editor' )
			.getBlockParents( selectedCellClientId, true )
			.map(
				( id ) =>
					select( 'core/block-editor' ).getBlocksByClientId( id )[ 0 ]
			)
			.find( ( block ) => block && block.name === 'ablocks/table' );
		const theadBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-header'
		);
		const tbodyBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-body'
		);
		const tfootBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-footer'
		);
		const selectedRowBlock = select( 'core/block-editor' )
			.getBlockParents( selectedCellClientId, true )
			.map(
				( index ) =>
					select( 'core/block-editor' ).getBlocksByClientId(
						index
					)[ 0 ]
			)
			.find( ( block ) => block.name === 'ablocks/table-row' );

		const currentCellIndex = selectedRowBlock.innerBlocks.findIndex(
			( block ) => block.clientId === selectedCellClientId
		);
		if ( theadBlock ) {
			const headRows = theadBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addCellBeSameIndex( headRows, currentCellIndex, true );
		}
		if ( tbodyBlock ) {
			const bodyRows = tbodyBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addCellBeSameIndex( bodyRows, currentCellIndex, false );
		}

		if ( tfootBlock ) {
			const footRows = tfootBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addCellBeSameIndex( footRows, currentCellIndex, true );
		}
	};
	//  -----deleted cell ----
	const deleteCellAtSameIndex = ( rowBlocks, cellIndex ) => {
		rowBlocks.forEach( ( rowBlock ) => {
			const cellToDelete = rowBlock.innerBlocks[ cellIndex ];
			if ( cellToDelete ) {
				dispatch( 'core/block-editor' ).removeBlock(
					cellToDelete.clientId,
					false
				);
			}
		} );
	};
	const deleteColumn = () => {
		const selectedCellClientId =
			select( 'core/block-editor' ).getSelectedBlockClientId();
		const tableBlock = select( 'core/block-editor' )
			.getBlockParents( selectedCellClientId, true )
			.map(
				( index ) =>
					select( 'core/block-editor' ).getBlocksByClientId(
						index
					)[ 0 ]
			)
			.find( ( block ) => block && block.name === 'ablocks/table' );
		const theadBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-header'
		);
		const tbodyBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-body'
		);
		const tfootBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-footer'
		);

		const selectedRowBlock = select( 'core/block-editor' )
			.getBlockParents( selectedCellClientId, true )
			.map(
				( id ) =>
					select( 'core/block-editor' ).getBlocksByClientId( id )[ 0 ]
			)
			.find( ( block ) => block.name === 'ablocks/table-row' );
		const currentCellIndex = selectedRowBlock.innerBlocks.findIndex(
			( block ) => block.clientId === selectedCellClientId
		);
		if ( theadBlock ) {
			const headRows = theadBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			deleteCellAtSameIndex( headRows, currentCellIndex );
		}
		if ( tbodyBlock ) {
			const bodyRows = tbodyBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			deleteCellAtSameIndex( bodyRows, currentCellIndex );
		}
		if ( tfootBlock ) {
			const footRows = tfootBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			deleteCellAtSameIndex( footRows, currentCellIndex );
		}
	};

	const parentRowClientId = useSelect(
		( selects ) => {
			return selects( 'core/block-editor' ).getBlockRootClientId(
				clientId
			);
		},
		[ clientId ]
	);
	const rowEdit = () => {
		if ( parentRowClientId ) {
			dispatch( 'core/edit-post' ).openGeneralSidebar(
				'edit-post/block'
			);
			dispatch( 'core/block-editor' ).selectBlock( parentRowClientId );
		}
	};
	const deleteRow = () => {
		dispatch( 'core/block-editor' ).removeBlock( parentRowClientId );
	};

	return (
		<React.Fragment>
			<CustomToolbar
				addAfterRow={ addAfterRow }
				addBeforeRow={ addBeforeRow }
				addColumnAfter={ addColumnAfter }
				addColumnBefore={ addColumnBefore }
				deleteColumn={ deleteColumn }
				deleteRow={ deleteRow }
				rowEdit={ rowEdit }
				handleDeleteCel={ handleDeleteCell }
			/>
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				tagName={ tagName }
				blockProps={ {
					rowSpan,
					colSpan,
				} }
				className="ablocks-table-cell ablocks-table-td"
				{ ...innerBlocksProps }
			>
				<button
					className="ablocks-table-icon-td ablocks-icon ablocks-icon--edit"
					onClick={ handleFindCell }
				></button>
				{ children }
			</RenderChildContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
