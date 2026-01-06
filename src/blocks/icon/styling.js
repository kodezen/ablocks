export const getWrapperCSS = ( attributes = {}, device = '' ) => {
	const { alignment = {} } = attributes;
	const css = {};
	css.display = 'flex';
	if ( alignment[ 'value' + device ] ) {
		css[ 'justify-content' ] = alignment[ 'value' + device ];
	}
	return css;
};
