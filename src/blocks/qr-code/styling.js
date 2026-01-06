import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
export const getWrapperCSS = ( attributes, device = '' ) => {
	return `width: 100%;`;
};
export const getQRCodeCSS = ( attributes, device = '' ) => {
	const { alignment } = attributes;

	const qrCodeCSS = {};
	if ( alignment[ `value${ device }` ] ) {
		qrCodeCSS[ 'justify-content' ] = alignment[ `value${ device }` ];
	}
	return {
		...qrCodeCSS,
	};
};
