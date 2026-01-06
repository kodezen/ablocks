import { useSelect } from '@wordpress/data';

const GetDeviceType = () => {
	const { deviceType } = useSelect( ( select ) => {
		return {
			deviceType:
				select(
					'core/edit-post'
				)?.__experimentalGetPreviewDeviceType() || '',
		};
	}, [] );

	return deviceType !== 'Desktop' ? deviceType : '';
};
export default GetDeviceType;
