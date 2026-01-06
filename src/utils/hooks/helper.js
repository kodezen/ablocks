import { select, dispatch } from '@wordpress/data';
import { makeRequest } from '@Utils/helper';

export const setDynamicData = (
	setter,
	{ value, before = '', after = '', fallback = '' }
) => {
	setter( value ? `${ before }${ value }${ after }` : fallback );
};

export const fetchAndStore = async ( {
	setLoading,
	request,
	onSuccess,
	onError = console.error,
} ) => {
	try {
		setLoading?.( true );
		const res = await makeRequest( request );
		const data = res?.data?.data || '';
		onSuccess?.( data );
	} catch ( e ) {
		onError( e );
	} finally {
		setLoading?.( false );
	}
};

export const getMetaValueFromStore = ( entityId, metaKey ) => {
	const metaStore = select(
		'ablocks/dynamic-content-store'
	)?.getPostMetaRelations();
	return metaStore?.[ entityId ]?.[ metaKey ]?.value;
};

export const getAuthorMetaFromStore = ( authorId, key ) => {
	const store = select( 'ablocks/dynamic-content-store' )?.getAuthorsMeta();
	return store?.[ authorId ]?.[ key ];
};

export const getTermsFromStore = ( postId, taxonomy ) => {
	const store = select(
		'ablocks/dynamic-content-store'
	)?.getPostTermsRelations();
	return store?.[ postId ]?.[ taxonomy ];
};
