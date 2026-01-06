import { searchDownIcon } from '../helper';
export default function FilterLists( { filterLists, layout, placeHolder } ) {
	const activeItem = filterLists.find( ( item ) => item.isActive === true );
	function lists( filterList ) {
		return filterList.map( ( filter, index ) => (
			<li
				data-category={ filter.text }
				key={ index }
				className={ `filterable-filter-button ${
					filter.isActive ? 'filterable-filter-button-active' : ''
				}` }
			>
				{ filter.text }
			</li>
		) );
	}

	return (
		<>
			{ layout === 'filter' ? (
				<ul className="filterable-cards_filter">
					{ lists( filterLists ) }
				</ul>
			) : (
				<div className="filterable-cards-filter-wrap">
					<ul className="filterable-cards_filter">
						<li>
							<button className="filterable-search-toggle-btn">
								<span className="filterable-search-select">
									{ activeItem?.text || 'Select Filter' }
								</span>
								<span>{ searchDownIcon }</span>
							</button>
						</li>

						<div className="filterable-cards_filter-list-dropdown">
							{ lists( filterLists ) }
						</div>
					</ul>

					<input
						type="text"
						className="filterable-searchInput"
						placeholder={ placeHolder }
					/>
				</div>
			) }
		</>
	);
}
