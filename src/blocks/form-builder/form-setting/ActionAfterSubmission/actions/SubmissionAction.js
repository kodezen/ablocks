import { submissionDataOption } from '../../../helper';
import Select from 'react-select';
import { __ } from '@wordpress/i18n';
export default function SubmitonAction( { attributes, setAttributes } ) {
	const { formType, submissionMetaData } = attributes;
	return (
		<div className="ablock-form-builder-actions-wrapper">
			<div className="ablocks-form-builder-form-group">
				<label className="ablocks-form-builder-form-label">
					{ __( 'Meta Data', 'ablocks' ) }
				</label>

				<Select
					className="submission-meta-select"
					isMulti
					options={ submissionDataOption }
					value={ submissionDataOption.filter( ( opt ) =>
						submissionMetaData.includes( opt.value )
					) }
					onChange={ ( selected ) =>
						setAttributes( {
							submissionMetaData: selected
								? selected.map( ( opt ) => opt.value )
								: [],
						} )
					}
				/>
			</div>
			{ formType === 'subscription' && (
				<div className="ablocks-form-builder-form-group">
					<label className="form-toggle-label">
						<input
							className="form-toggle"
							type="checkbox"
							checked={ attributes?.emailVerification || false }
							onChange={ ( e ) =>
								setAttributes( {
									emailVerification: e.target.checked,
								} )
							}
						/>
						{ __( 'Email Verification', 'ablocks' ) }
					</label>
				</div>
			) }
		</div>
	);
}
