import React from 'react';
const tableInputFormIcon = (
	<>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				d="M21.1204 2.8799C20.7604 2.5199 20.4004 2.3999 19.9204 2.3999H4.08039C3.60039 2.3999 3.24039 2.5199 2.88039 2.8799C2.52039 3.2399 2.40039 3.5999 2.40039 4.0799V20.0399C2.40039 20.5199 2.52039 20.8799 2.88039 21.2399C3.24039 21.4799 3.60039 21.5999 4.08039 21.5999H20.0404C20.5204 21.5999 20.8804 21.4799 21.2404 21.1199C21.6004 20.7599 21.7204 20.3999 21.7204 19.9199V4.0799C21.6004 3.5999 21.4804 3.2399 21.1204 2.8799ZM8.40039 20.2799H4.08039C3.96039 20.2799 3.84039 20.2799 3.84039 20.1599C3.72039 20.1599 3.72039 20.0399 3.72039 19.9199V15.5999H8.40039V20.2799ZM8.40039 14.2799H3.72039V9.5999H8.40039V14.2799ZM20.2804 19.9199C20.2804 20.0399 20.2804 20.1599 20.1604 20.1599C20.1604 20.2799 20.0404 20.2799 19.9204 20.2799H9.60039V15.5999H20.2804V19.9199ZM20.2804 14.2799H9.60039V9.5999H20.2804V14.2799ZM3.72039 8.2799V4.0799C3.72039 3.9599 3.72039 3.8399 3.84039 3.8399C3.84039 3.7199 3.96039 3.7199 4.08039 3.7199H20.0404C20.1604 3.7199 20.2804 3.7199 20.2804 3.8399C20.4004 3.8399 20.4004 3.9599 20.4004 4.0799V8.2799H3.72039Z"
				fill="#13191B"
			/>
			<path
				d="M10.8004 11.7599C10.8004 11.6399 10.9204 11.5199 11.0404 11.5199H18.9604C19.0804 11.5199 19.2004 11.6399 19.2004 11.7599V12.4799C19.2004 12.5999 19.0804 12.7199 18.9604 12.7199H11.0404C10.9204 12.7199 10.8004 12.5999 10.8004 12.4799V11.7599Z"
				fill="#13191B"
			/>
			<path
				d="M4.80039 11.7599C4.80039 11.6399 4.92039 11.5199 5.04039 11.5199H6.96039C7.08039 11.5199 7.20039 11.6399 7.20039 11.7599V12.4799C7.20039 12.5999 7.08039 12.7199 6.96039 12.7199H5.04039C4.92039 12.7199 4.80039 12.5999 4.80039 12.4799V11.7599Z"
				fill="#13191B"
			/>
			<path
				d="M4.80039 17.7599C4.80039 17.6399 4.92039 17.5199 5.04039 17.5199H6.96039C7.08039 17.5199 7.20039 17.6399 7.20039 17.7599V18.4799C7.20039 18.5999 7.08039 18.7199 6.96039 18.7199H5.04039C4.92039 18.7199 4.80039 18.5999 4.80039 18.4799V17.7599Z"
				fill="#13191B"
			/>
			<path
				d="M10.8004 17.7599C10.8004 17.6399 10.9204 17.5199 11.0404 17.5199H18.9604C19.0804 17.5199 19.2004 17.6399 19.2004 17.7599V18.4799C19.2004 18.5999 19.0804 18.7199 18.9604 18.7199H11.0404C10.9204 18.7199 10.8004 18.5999 10.8004 18.4799V17.7599Z"
				fill="#13191B"
			/>
		</svg>
	</>
);
export const TableInputForm = ( {
	numRows,
	setNumRows,
	numTds,
	setNumTds,
	includeHeader,
	setIncludeHeader,
	includeFooter,
	setIncludeFooter,
	createTable,
} ) => {
	return (
		<div className="ablocks-table-input-form">
			<div className="ablocks-table-input-form--iconText">
				<span className="ablocks-table-input-form--icon">
					{ tableInputFormIcon }
				</span>
				<span className="ablocks-table-input-form--text">Table</span>
			</div>

			<p className="ablocks-table-input-form--title">
				Start creating a custom table for your content
			</p>
			<div className="ablocks-table-input-from--input-container">
				<div className="ablocks-table-input">
					<label htmlFor="numRows">Rows</label>
					<input
						id="numRows"
						type="number"
						value={ numRows }
						min={ 1 }
						max={ 30 }
						onChange={ ( e ) =>
							setNumRows( parseInt( e.target.value ) )
						}
					/>
				</div>
				<div className="ablocks-table-input">
					<label htmlFor="numTds">Columns</label>
					<input
						id="numTds"
						type="number"
						value={ numTds }
						min={ 1 }
						max={ 30 }
						onChange={ ( e ) =>
							setNumTds( parseInt( e.target.value ) )
						}
					/>
				</div>
			</div>
			<div className="ablocks-table-input-from--check-box">
				<div>
					<input
						id="includeHeader"
						type="checkbox"
						checked={ includeHeader }
						onChange={ ( e ) =>
							setIncludeHeader( e.target.checked )
						}
					/>
					<label htmlFor="includeHeader">Include Header</label>
				</div>
				<div>
					<input
						id="includeFooter"
						type="checkbox"
						checked={ includeFooter }
						onChange={ ( e ) =>
							setIncludeFooter( e.target.checked )
						}
					/>
					<label htmlFor="includeFooter">Include Footer</label>
				</div>
			</div>
			<button
				onClick={ createTable }
				className="ablocks-table-input-form-button"
			>
				Generate Table
			</button>
		</div>
	);
};
