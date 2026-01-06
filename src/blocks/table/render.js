import React, { useState } from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';
import CustomToolbar from './toolbar';
import { TableInputForm } from './helper';
const Render = ( props ) => {
	const { attributes, setAttributes, clientId } = props;
	const { block_id, tableCreated } = attributes;

	const [ numRows, setNumRows ] = useState( 3 );
	const [ numTds, setNumTds ] = useState( 3 );

	// New states for header and footer
	const [ includeHeader, setIncludeHeader ] = useState( true );
	const [ includeFooter, setIncludeFooter ] = useState( false );

	const createTable = () => {
		const newBlocks = [];

		// Conditionally generate the table header
		if ( includeHeader ) {
			setAttributes( { isHeader: true } );
			const headerRowBlocks = [];
			for ( let j = 0; j < numTds; j++ ) {
				const thBlock = createBlock( 'ablocks/table-cell', {
					tagName: 'th',
				} );
				headerRowBlocks.push( thBlock );
			}
			const theadBlock = createBlock( 'ablocks/table-header', {}, [
				createBlock( 'ablocks/table-row', {}, headerRowBlocks ),
			] );
			newBlocks.push( theadBlock );
		}

		// Generate table body rows and cells
		const bodyRowBlocks = [];
		for ( let i = 0; i < numRows; i++ ) {
			const rowBlocks = [];
			for ( let j = 0; j < numTds; j++ ) {
				const tdBlock = createBlock( 'ablocks/table-cell' );
				rowBlocks.push( tdBlock );
			}
			const rowBlock = createBlock( 'ablocks/table-row', {}, rowBlocks );
			bodyRowBlocks.push( rowBlock );
		}
		const tbodyBlock = createBlock(
			'ablocks/table-body',
			{},
			bodyRowBlocks
		);
		newBlocks.push( tbodyBlock );

		// Conditionally generate the table footer
		if ( includeFooter ) {
			setAttributes( { isFooter: true } );
			const footerRowBlocks = [];
			for ( let j = 0; j < numTds; j++ ) {
				const tfBlock = createBlock( 'ablocks/table-cell' );
				footerRowBlocks.push( tfBlock );
			}
			const tfootBlock = createBlock( 'ablocks/table-footer', {}, [
				createBlock( 'ablocks/table-row', {}, footerRowBlocks ),
			] );
			newBlocks.push( tfootBlock );
		}

		// Replace inner blocks with the new table structure
		dispatch( 'core/block-editor' ).replaceInnerBlocks(
			clientId,
			newBlocks,
			false
		);
		setAttributes( { tableCreated: true } );
	};

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: [
				'ablocks/table-header',
				'ablocks/table-body',
				'ablocks/table-footer',
			],
			renderAppender: false,
		}
	);

	// ----insert Top Row Table Body---
	const insertTopRow = () => {
		const innerBlocks = select( 'core/block-editor' ).getBlocks( clientId );
		const tableBodyBlock = innerBlocks.find(
			( block ) => block.name === 'ablocks/table-body'
		);
		const firstRowBlock = tableBodyBlock.innerBlocks[ 0 ];
		const clonedInnerBlocks = firstRowBlock
			? firstRowBlock.innerBlocks.map( ( innerBlock ) =>
					createBlock( innerBlock.name, innerBlock.attributes )
			  )
			: [];

		const newRowBlock = createBlock(
			'ablocks/table-row',
			{},
			clonedInnerBlocks
		);
		dispatch( 'core/block-editor' ).insertBlock(
			newRowBlock,
			0,
			tableBodyBlock.clientId
		);
	};
	// -----insert button row----
	const insertButtonRow = () => {
		const innerBlocks = select( 'core/block-editor' ).getBlocks( clientId );
		const tableBodyBlock = innerBlocks.find(
			( block ) => block.name === 'ablocks/table-body'
		);
		const lastRowBlock =
			tableBodyBlock.innerBlocks[ tableBodyBlock.innerBlocks.length - 1 ];
		const clonedInnerBlocks = lastRowBlock
			? lastRowBlock.innerBlocks.map( ( innerBlock ) =>
					createBlock( innerBlock.name, innerBlock.attributes )
			  )
			: [];

		const newRowBlock = createBlock(
			'ablocks/table-row',
			{},
			clonedInnerBlocks
		);
		dispatch( 'core/block-editor' ).insertBlock(
			newRowBlock,
			tableBodyBlock.innerBlocks.length,
			tableBodyBlock.clientId
		);
	};
	// -----add left cell to all row -----
	const addLeftCellsToRows = ( rowBlocks, isHeader = false ) => {
		rowBlocks.forEach( ( rowBlock ) => {
			const newCellBlock = createBlock( 'ablocks/table-cell', {
				tagName: isHeader ? 'th' : 'td',
			} );
			dispatch( 'core/block-editor' ).insertBlock(
				newCellBlock,
				0,
				rowBlock.clientId
			);
		} );
	};
	const insertLeftCell = () => {
		const tableBlockId =
			select( 'core/block-editor' ).getSelectedBlockClientId();
		const tableBlock =
			select( 'core/block-editor' ).getBlocksByClientId(
				tableBlockId
			)[ 0 ];

		if ( ! tableBlock ) {
			return;
		}

		const theadBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-header'
		);
		const tbodyBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-body'
		);
		const tfootBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-footer'
		);

		if ( theadBlock ) {
			const headRows = theadBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addLeftCellsToRows( headRows, true );
		}
		if ( tbodyBlock ) {
			const bodyRows = tbodyBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addLeftCellsToRows( bodyRows, false );
		}
		if ( tfootBlock ) {
			const footRows = tfootBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addLeftCellsToRows( footRows, false );
		}
	};
	// ---add right cell add all row ---
	const addRightCellToRow = ( rowBlocks, isHeader = false ) => {
		rowBlocks.forEach( ( rowBlock ) => {
			const newCellBlock = createBlock( 'ablocks/table-cell', {
				tagName: isHeader ? 'th' : 'td',
			} );
			dispatch( 'core/block-editor' ).insertBlock(
				newCellBlock,
				rowBlock.innerBlocks.length,
				rowBlock.clientId
			);
		} );
	};
	const addRightCell = () => {
		const tableBlockId =
			select( 'core/block-editor' ).getSelectedBlockClientId();
		const tableBlock =
			select( 'core/block-editor' ).getBlocksByClientId(
				tableBlockId
			)[ 0 ];

		if ( ! tableBlock ) {
			return;
		}

		const theadBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-header'
		);
		const tbodyBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-body'
		);
		const tfootBlock = tableBlock.innerBlocks.find(
			( block ) => block.name === 'ablocks/table-footer'
		);

		if ( theadBlock ) {
			const headRows = theadBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addRightCellToRow( headRows, true );
		}
		if ( tbodyBlock ) {
			const bodyRows = tbodyBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addRightCellToRow( bodyRows, false );
		}
		if ( tfootBlock ) {
			const footRows = tfootBlock.innerBlocks.filter(
				( block ) => block.name === 'ablocks/table-row'
			);
			addRightCellToRow( footRows, false );
		}
	};

	return (
		<React.Fragment>
			<CustomToolbar
				insertButtonRow={ insertButtonRow }
				addRightCell={ addRightCell }
				insertTopRow={ insertTopRow }
				insertLeftCell={ insertLeftCell }
			/>

			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ ! tableCreated ? (
					<TableInputForm
						numRows={ numRows }
						setNumRows={ setNumRows }
						numTds={ numTds }
						setNumTds={ setNumTds }
						includeHeader={ includeHeader }
						setIncludeHeader={ setIncludeHeader }
						includeFooter={ includeFooter }
						setIncludeFooter={ setIncludeFooter }
						createTable={ createTable }
					/>
				) : (
					<>
						<table { ...innerBlocksProps }></table>
					</>
				) }
			</RenderContainer>
		</React.Fragment>
	);
};

export default Render;
