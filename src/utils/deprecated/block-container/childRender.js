import classNames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import PropTypes from 'prop-types';
import QuickEdit from './quickEdit';
import Toolbar from './toolbar';
import { getClassNames } from './helper';
import './styles.scss';

const propTypes = {
	name: PropTypes.string,
	blockId: PropTypes.string,
	typography: PropTypes.array,
	innerBlocksProps: PropTypes.object,
	tagName: PropTypes.string,
	setTagInTop: PropTypes.bool,
	className: PropTypes.string,
	allowQuickEdit: PropTypes.bool,
	blockProps: PropTypes.object,
};

export default function RenderChildContainer( {
	blockId = '',
	children,
	attributes = {},
	tagName: Tag = 'div',
	className = '',
	name = '',
	allowQuickEdit = false,
	blockProps = {},
} ) {
	const { overflow } = attributes;
	const blockPropsArgs = {
		className: getClassNames( {
			name,
			blockId,
			className: classNames(
				className,
				`ablocks-block--child-${ blockId } ablocks-block--child`,
				attributes?.className
			),
		} ),
		...blockProps,
	};
	const allProps = useBlockProps( blockPropsArgs );
	const ParentTag = Tag || 'div';
	return (
		<>
			<Toolbar />
			<ParentTag { ...allProps }>
				{ allowQuickEdit && (
					<QuickEdit
						blockId={ blockId }
						name={ name }
						overflow={ overflow }
					/>
				) }
				{ children }
			</ParentTag>
		</>
	);
}

RenderChildContainer.propTypes = propTypes;
