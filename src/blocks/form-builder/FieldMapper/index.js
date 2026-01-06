import React from 'react';
import Select from 'react-select';

const FieldSelectMapper = ( {
	name,
	value,
	selectValue,
	onChange,
	options,
} ) => {
	return (
		<div
			style={ {
				marginBottom: '1rem',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
			} }
		>
			<div>
				<label
					htmlFor={ `select-${ selectValue }` }
					style={ {
						marginBottom: '0.5rem',
						fontSize: '12px',
						fontWeight: '400',
					} }
				>
					{ name }
				</label>
			</div>
			<div>
				<Select
					id={ `select-${ selectValue }` }
					value={ options.find(
						( option ) => option.value === value
					) }
					onChange={ onChange }
					options={ options }
					placeholder={ name }
					styles={ {
						control: ( base ) => ( {
							...base,
							minHeight: '30px',
							border: '1px solid #ddd',
							width: '130px',
							borderRadius: '6px',
							boxShadow: 'none',
							'&:hover': {
								borderColor: '#aaa',
							},
						} ),
						placeholder: ( base ) => ( {
							...base,
							color: '#999',
						} ),
					} }
				/>
			</div>
		</div>
	);
};

export default FieldSelectMapper;
