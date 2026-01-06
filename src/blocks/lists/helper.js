import RenderIcon from '@Controls/icon-upload/render-icon';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const markerTypeOptions = [
	{
		label: 'None',
		value: 'none',
	},
	{
		label: 'Icon',
		value: 'icon',
	},
	{
		label: 'Disc',
		value: 'disc',
	},
	{
		label: 'Square',
		value: 'square',
	},
	{
		label: 'Emoji',
		value: 'emoji',
	},
];

export const stackOptions = [
	{
		label: 'vertical',
		value: 'vertical',
		icon: 'align-left',
	},
	{
		label: 'horizontal',
		value: 'horizontal',
		icon: 'align-top',
	},
];
export const borderOptions = [
	{
		label: 'Solid',
		value: 'solid',
	},
	{
		label: 'Double',
		value: 'double',
	},
	{
		label: 'Dotted',
		value: 'dotted',
	},
	{
		label: 'Dashed',
		value: 'dashed',
	},
];

export const horizontalOptions = [
	{
		label: 'Start',
		value: 'flex-start',
	},
	{
		label: 'End',
		value: 'flex-end',
	},
	{
		label: 'Center',
		value: 'center',
	},
	{
		label: 'Between',
		value: 'space-between',
	},
	{
		label: 'Around',
		value: 'space-around',
	},
];

export const iconTypeOption = [
	{ value: 'default', label: 'Default' },
	{ value: 'stacked', label: 'Stacked' },
	{ value: 'framed', label: 'Framed' },
];

export const iconShapeOption = [
	{
		label: 'Circle',
		value: 'circle',
	},
	{
		label: 'Square',
		value: 'square',
	},
];

export const RenderMarker = ( props ) => {
	const { markerType, emoji, iconAttributes, index, listProperties } = props;

	let marker;
	if ( markerType === 'disc' ) {
		marker = (
			<span
				className="ablocks-list__item-marker ablocks-list__item-disc"
				style={ {
					backgroundColor: getTextColorCSS(
						listProperties?.markerColor
					),
				} }
			></span>
		);
	} else if ( markerType === 'square' ) {
		marker = (
			<span
				className="ablocks-list__item-marker ablocks-list__item-square"
				style={ {
					backgroundColor: getTextColorCSS(
						listProperties?.markerColor
					),
				} }
			></span>
		);
	} else if ( markerType === 'emoji' ) {
		marker = <span className="emoji">{ emoji }</span>;
	} else if ( markerType === 'icon' ) {
		const iconData = iconAttributes?.[ index ];
		marker = (
			<RenderIcon
				customIconData={ iconData }
				style={ {
					color: listProperties?.iconColor
						? getTextColorCSS( listProperties?.iconColor )
						: '',
					fill: listProperties?.iconColor
						? getTextColorCSS( listProperties?.iconColor )
						: '',
				} }
			/>
		);
	}
	return marker;
};
