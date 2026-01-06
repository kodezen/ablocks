import square from '../../../assets/images/divider-shapes/square.svg';
import slashes from '../../../assets/images/divider-shapes/slashes.svg';
import arrows from '../../../assets/images/divider-shapes/arrow.svg';
import pluses from '../../../assets/images/divider-shapes/plus.svg';

import dots from '../../../assets/images/divider-shapes/dots.svg';
import firTree from '../../../assets/images/divider-shapes/firTree.svg';
import halfRound from '../../../assets/images/divider-shapes/halfRound.svg';

import leaves from '../../../assets/images/divider-shapes/leaves.svg';
import stripes from '../../../assets/images/divider-shapes/stripes.svg';
import tress from '../../../assets/images/divider-shapes/trees.svg';
import tribal from '../../../assets/images/divider-shapes/tribal.svg';
import x from '../../../assets/images/divider-shapes/x.svg';
export const dividerPatternUrlOptions = [
	{
		label: 'solid',
		type: 'css-style',
		value: 'solid',
		optionalStyleControls: [ 'weight', 'gap' ],
	},
	{
		label: 'dotted',
		type: 'css-style',
		value: 'dotted',
		optionalStyleControls: [ 'weight', 'gap' ],
	},
	{
		label: 'dashed',
		type: 'css-style',
		value: 'dashed',
		optionalStyleControls: [ 'weight', 'gap' ],
	},
	{
		label: 'square',
		value: square,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
	{
		label: 'slashes',
		value: slashes,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
	{
		label: 'arrows',
		value: arrows,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
	{
		label: 'pluses',
		value: pluses,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
	{
		label: 'dots',
		value: dots,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
	{
		label: 'firTree',
		value: firTree,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
	{
		label: 'halfRound',
		value: halfRound,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
	{
		label: 'leaves',
		value: leaves,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
	{
		label: 'stripes',
		value: stripes,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
	{
		label: 'tress',
		value: tress,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
	{
		label: 'tribal',
		value: tribal,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
	{
		label: 'x',
		value: x,
		type: 'mask-style',
		optionalStyleControls: [ 'size', 'gap' ],
	},
];

export const dividerElementOptions = [
	{ label: 'None', value: 'none' },
	{ label: 'Text', value: 'text' },
	{ label: 'Icon', value: 'icon' },
];

export const iconTypeOption = [
	{ value: 'default', label: 'Default' },
	{ value: 'stacked', label: 'Stacked' },
	{ value: 'framed', label: 'Framed' },
];
