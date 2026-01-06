import RenderContainer from '@Components/block-container/render2';
import { ResizableBox } from '@wordpress/components';
import metadata from './block.json';
import GetDeviceType from '@Utils/get-device-type';
import { objectUniqueCheck, getResponsiveValue } from '@Utils/helper';
import { spacerHeight as spacerHeightDefaultData } from './attributes';

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const { block_id, spacerHeight } = attributes;
	const deviceType = GetDeviceType();

	const heightValue =
		getResponsiveValue( spacerHeight, 'value', deviceType ) || 0;
	const constrainHeight = ( value ) => Math.max( 1, Math.min( value, 1000 ) );

	const finalHeightValue = `${ constrainHeight( heightValue ) }px`;

	const handleResizeStop = ( event, direction, elt ) => {
		const newHeightInPx = elt.clientHeight;
		setAttributes( {
			spacerHeight: objectUniqueCheck(
				spacerHeightDefaultData.spacerHeight.default,
				{
					...spacerHeight,
					[ `value${ deviceType }` ]: newHeightInPx,
				}
			),
		} );
	};

	return (
		<RenderContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<ResizableBox
				size={ {
					height: finalHeightValue,
					width: '100%',
				} }
				minHeight={ 1 }
				enable={ { bottom: true } }
				className="ablocks-spacer__box"
				onResizeStop={ handleResizeStop }
			/>
		</RenderContainer>
	);
}
