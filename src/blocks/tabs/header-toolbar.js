import { Tooltip, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const TabHeaderToolbar = ( {
	index,
	onRemove,
	onMoveUp,
	onMoveDown,
	tabHeaders,
} ) => (
	<ToolbarGroup>
		{ index !== 0 && (
			<Tooltip text={ __( 'Move tab up', 'ablocks' ) }>
				<span
					role="presentation"
					className="ablocks-icon ablocks-icon--direction-row-reversed"
					onClick={ () => onMoveUp( index, tabHeaders.length ) }
					disabled={ index === 0 }
				/>
			</Tooltip>
		) }
		{ index !== tabHeaders.length - 1 && (
			<Tooltip text={ __( 'Move tab down', 'ablocks' ) }>
				<span
					role="presentation"
					className="ablocks-icon ablocks-icon--direction-row-horizontal"
					onClick={ () => onMoveDown( index, tabHeaders.length ) }
					disabled={ index === tabHeaders.length - 1 }
				/>
			</Tooltip>
		) }

		<Tooltip text={ __( 'Remove tab', 'ablocks' ) }>
			<span
				role="presentation"
				className="ablocks-icon ablocks-icon--close"
				onClick={ () => onRemove( index ) }
			/>
		</Tooltip>
	</ToolbarGroup>
);

export default TabHeaderToolbar;
