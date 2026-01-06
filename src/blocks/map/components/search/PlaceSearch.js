import React from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { __ } from '@wordpress/i18n';
import { debounce } from './../../helper';

const propTypes = {};

export default class PlaceSearch extends React.Component {
	state = {
		q: '',
		isOpenResults: false,
		places: [],
	};
	fetchPlaces( q ) {
		this.provider.search( { query: q } ).then( ( results ) => {
			this.setState( {
				places: results.slice( 0, 5 ),
				isOpenResults: true,
			} );
		} );
	}
	constructor( props ) {
		super( props );
		this.provider = new OpenStreetMapProvider();
		this.fetchPlaces = debounce( this.fetchPlaces, 500 );
	}
	onSearchChange( ev ) {
		const q = ev.target.value;
		this.setState( { q } );
		this.fetchPlaces( q );
	}

	render() {
		return (
			<React.Fragment>
				<div className="ablocks-block-map-modal-place-search">
					<input
						className="ablocks-block-map-modal-place-search__input"
						type="text"
						value={ this.state.q }
						onChange={ this.onSearchChange.bind( this ) }
						placeholder={ __( 'Location Search…', 'ablocks' ) }
					/>
					{ this.state.isOpenResults && (
						<ul className="ablocks-block-map-modal-place-search__results">
							{ this.state.places.map(
								( searchItem, searchIndex ) => (
									<li
										role="presentation"
										key={ searchIndex }
										onClick={ () => {
											this.setState( {
												q: searchItem.label,
												isOpenResults: false,
											} );
											this.props.setLatLngHandler(
												searchItem.raw.lat,
												searchItem.raw.lon
											);
										} }
									>
										{ searchItem.label }
									</li>
								)
							) }
						</ul>
					) }
				</div>
			</React.Fragment>
		);
	}
}

PlaceSearch.propTypes = propTypes;
