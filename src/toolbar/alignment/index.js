import { AlignmentControl } from '@wordpress/block-editor';
import PropTypes from 'prop-types';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import getDeviceType from '@Utils/get-device-type';

const propsTypes = {
	attributeValue: PropTypes.object,
	setAttributes: PropTypes.func,
	options: PropTypes.array,
};

const alignmentOptions = [
	{
		icon: alignLeft,
		title: __( 'Align left' ),
		align: 'left',
	},
	{
		icon: alignCenter,
		title: __( 'Align center' ),
		align: 'center',
	},
	{
		icon: alignRight,
		title: __( 'Align right' ),
		align: 'right',
	},
];
const ABlocksToolbarAlignment = ( props ) => {
	const deviceType = getDeviceType();
	const {
		attributeValue = {},
		setAttributes = () => {},
		options = alignmentOptions,
	} = props;
	const currentAlignment = attributeValue[ `value${ deviceType }` ] || 'none';
	return (
		<>
			<AlignmentControl
				value={ currentAlignment }
				alignmentControls={ options }
				onChange={ ( nextAlign ) => {
					setAttributes( {
						alignment: {
							...attributeValue,
							[ `value${ deviceType }` ]: nextAlign,
						},
					} );
				} }
			/>
		</>
	);
};
ABlocksToolbarAlignment.propTypes = propsTypes;

export default ABlocksToolbarAlignment;
