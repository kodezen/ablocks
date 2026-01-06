import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { select as dataSelect } from '@wordpress/data';
export const updateTabsTitle = ( setAttributes, tabHeaders, value, index ) => {
	const newHeaders = [ ...tabHeaders ];
	newHeaders[ index ] = value;
	setAttributes( { tabHeaders: newHeaders } );
};
export const updateTabsSubtitle = (
	setAttributes,
	tabSubTitles,
	value,
	index
) => {
	const newSubTitles = [ ...tabSubTitles ];
	newSubTitles[ index ] = value;
	setAttributes( { tabSubTitles: newSubTitles } );
};
export const addTab = (
	insertBlock,
	setAttributes,
	tabHeaders,
	tabSubTitles,
	clientId
) => {
	const tabItemBlock = createBlock( 'ablocks/tabs-child' );
	insertBlock( tabItemBlock, tabHeaders.length, clientId );

	setAttributes( {
		tabHeaders: [ ...tabHeaders, `New Tab` ],
		tabSubTitles: [
			...tabSubTitles,
			`New Subtitle Content: This tab provides general information about our company`,
		],
		tabActive: tabHeaders.length,
	} );
};
export const removeTab = (
	removeBlock,
	setAttributes,
	getBlockOrder,
	clientId,
	index,
	tabHeaders,
	tabSubTitles
) => {
	if ( index < 0 || index >= tabHeaders.length ) {
		return;
	}

	const childBlocks = getBlockOrder( clientId );
	removeBlock( childBlocks[ index ], false );

	const newHeaders = [ ...tabHeaders ];
	const newSubTitles = [ ...tabSubTitles ];

	newHeaders.splice( index, 1 );
	newSubTitles.splice( index, 1 );

	setAttributes( {
		tabHeaders: newHeaders,
		tabSubTitles: newSubTitles,
		tabActive: 0,
	} );
};
export const onMove = async (
	oldIndex,
	newIndex,
	tabHeaders,
	tabSubTitles,
	setAttributes,
	moveTab,
	clientId
) => {
	if (
		oldIndex === newIndex ||
		newIndex < 0 ||
		newIndex >= tabHeaders.length
	) {
		return;
	}

	const { getBlock } = ! wp.blockEditor
		? dataSelect( 'core/editor' )
		: dataSelect( 'core/block-editor' );
	const tabsBlock = getBlock( clientId );

	const updatedHeaders = [ ...tabHeaders ];
	const tempHeader = updatedHeaders[ oldIndex ];
	updatedHeaders[ oldIndex ] = updatedHeaders[ newIndex ];
	updatedHeaders[ newIndex ] = tempHeader;

	const updatedSubTitles = [ ...tabSubTitles ];
	const tempSubtitle = updatedSubTitles[ oldIndex ];
	updatedSubTitles[ oldIndex ] = updatedSubTitles[ newIndex ];
	updatedSubTitles[ newIndex ] = tempSubtitle;

	moveTab( tabsBlock.innerBlocks[ oldIndex ].clientId, newIndex );

	setAttributes( {
		tabHeaders: updatedHeaders,
		tabSubTitles: updatedSubTitles,
		tabActive: newIndex,
		tabPositionChange: true,
	} );
};
export const menuPositionOptions = [
	{
		label: __( 'Top', 'ablocks' ),
		value: 'top',
	},
	{
		label: __( 'Bottom', 'ablocks' ),
		value: 'bottom',
	},
	{
		label: __( 'Left', 'ablocks' ),
		value: 'left',
	},
	{
		label: __( 'Right', 'ablocks' ),
		value: 'right',
	},
];

export const menuAlignmentOptions = [
	{
		label: __( 'Start', 'ablocks' ),
		value: 'flex-start',
		icon: <span className="ablocks-icon ablocks-icon--align-start" />,
	},
	{
		label: __( 'Center', 'ablocks' ),
		value: 'center',
		icon: <span className="ablocks-icon ablocks-icon--align-center-two" />,
	},
	{
		label: __( 'End', 'ablocks' ),
		value: 'flex-end',
		icon: <span className="ablocks-icon ablocks-icon--align-end" />,
	},
];

export const menuContentAlignmentOptions = [
	{
		label: __( 'Start', 'ablocks' ),
		value: 'start',
		icon: <span className="ablocks-icon ablocks-icon--align-start" />,
	},
	{
		label: __( 'Center', 'ablocks' ),
		value: 'center',
		icon: <span className="ablocks-icon ablocks-icon--align-center-two" />,
	},
	{
		label: __( 'End', 'ablocks' ),
		value: 'end',
		icon: <span className="ablocks-icon ablocks-icon--align-end" />,
	},
];

export const iconShapeOptions = [
	{
		label: __( 'Circle', 'ablocks' ),
		value: 'circle',
	},
	{
		label: __( 'Square', 'ablocks' ),
		value: 'square',
	},
];
export const iconTypeOption = [
	{
		value: 'default',
		label: __( 'Default', 'ablocks' ),
	},
	{
		value: 'stacked',
		label: __( 'Stacked', 'ablocks' ),
	},
	{
		value: 'framed',
		label: __( 'Framed', 'ablocks' ),
	},
];

export const iconPositionOptions = [
	{
		label: __( 'Left', 'ablocks' ),
		value: 'left',
	},
	{
		label: __( 'Right', 'ablocks' ),
		value: 'right',
	},
	{
		label: __( 'Top', 'ablocks' ),
		value: 'top',
	},
	{
		label: __( 'Bottom', 'ablocks' ),
		value: 'bottom',
	},
];
