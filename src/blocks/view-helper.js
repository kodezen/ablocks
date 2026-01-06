export const {
	ajax_url,
	namespace,
	plugin_root_path,
	plugin_root_url,
	is_pro,
	route_path,
	menu,
	nonce,
	addons,
	ablocks_nonce,
	rest_url,
	toplevel_menu_icon_url,
	third_party_plugin_status,
	settings,
	site_url,
	blocks_status,
	theme_builder,
	admin_url,
	is_fse_theme,
	post_types,
} = window.ABlocksGlobal ?? {};

export async function makeRequest( payload = {}, isRaw = false ) {
	const isFormData = payload instanceof FormData;
	const form_data = isFormData ? payload : new FormData();
	form_data.append( 'security', ablocks_nonce );
	if ( ! isFormData ) {
		Object.entries( payload ).forEach( ( [ key, value ] ) => {
			if ( value instanceof File || value instanceof Blob ) {
				form_data.append( key, value );
			} else if (
				! isRaw &&
				typeof value === 'object' &&
				value !== null
			) {
				form_data.append( key, JSON.stringify( value ) );
			} else {
				form_data.append( key, value );
			}
		} );
	}
	try {
		const response = await fetch( ajax_url, {
			method: 'POST',
			body: form_data,
		} );

		const contentType = response.headers.get( 'Content-Type' ) || '';
		if ( contentType.includes( 'application/json' ) ) {
			const data = await response.json();
			return { status: response.status, data };
		}
		const text = await response.text();
		return { status: response.status, data: text };
	} catch ( error ) {
		return { status: 0, error: error.message };
	}
}
