import React from 'react';
import SaveContainer from '@Components/block-container/save';
import metadata from './block.json';
import SaveContent from '../SaveContent';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, lists, divider } = attributes;

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div className="ablocks-list">
					{ lists?.map( ( list, index ) => (
						<>
							<SaveContent
								key={ index }
								index={ index }
								attributes={ attributes }
								list={ list }
							/>
							{ divider && (
								<div className="ablocks-list_item-content-divider"></div>
							) }
						</>
					) ) }
				</div>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
