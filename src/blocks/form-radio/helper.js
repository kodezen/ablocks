import { __ } from '@wordpress/i18n';
import RenderIcon from '@Controls/icon-upload/render-icon';
export const widthList = [
	{
		label: __( 'Full Width', 'ablocks' ),
		value: 100,
	},
	{
		label: __( 'Two Columns', 'ablocks' ),
		value: 50,
	},
	{
		label: __( 'Three Columns', 'ablocks' ),
		value: 33,
	},
	{
		label: __( 'Four Columns', 'ablocks' ),
		value: 25,
	},
];
export const RenderMarker = ( props ) => {
	const { markerType, iconAttributes, index, listProperties } = props;

	let marker;
	if ( markerType === 'icon' ) {
		const iconData = iconAttributes?.[ index ];
		marker = (
			<RenderIcon
				customIconData={ iconData }
				style={ {
					color: listProperties?.[ 'iconColor' + index ]
						? listProperties?.[ 'iconColor' + index ]
						: '',
					fill: listProperties?.[ 'iconColor' + index ]
						? listProperties?.[ 'iconColor' + index ]
						: '',
				} }
			/>
		);
	}
	return marker;
};
