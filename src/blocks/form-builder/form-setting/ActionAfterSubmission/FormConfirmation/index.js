import FormFieldWithAction from '../../Components/FormFieldWithAction';
import { getAllFieldNames, subjectGenericTags } from '../../helper';
import { __ } from '@wordpress/i18n';
import Tooltip from '@Components/tooltip';
import { is_pro } from '@Utils/helper';
const FormConfirmation = ( {
	attributes,
	setAttributes,
	childAttributes,
	innerBlockDetails = [],
} ) => {
	const { link, confirmationType } = attributes;
	const handleTargetToggle = ( e ) => {
		const isChecked = e.target.checked;
		setAttributes( {
			link: { ...link, linkTarget: isChecked },
		} );
	};
	const redirectLabel = (
		<label
			className={ `ablocks-form-builder__confirmation__radio-option ${
				confirmationType === 'redirect' && 'is-active'
			}` }
		>
			<input
				type="radio"
				name="confirmationType"
				disabled={ ! is_pro }
				checked={ confirmationType === 'redirect' }
				onChange={ () =>
					setAttributes( { confirmationType: 'redirect' } )
				}
			/>
			{ __( 'Redirect', 'ablocks' ) }
		</label>
	);
	return (
		<div className="ablocks-form-builder__confirmation">
			<div className="ablocks-form-builder__confirmation__section">
				<h4 className="ablocks-form-builder__confirmation__section-title">
					{ __( 'Confirmation Type', 'ablocks' ) }
				</h4>

				<div className="ablocks-form-builder__confirmation__radio-group">
					<label
						className={ `ablocks-form-builder__confirmation__radio-option ${
							confirmationType === 'success' && 'is-active'
						}` }
					>
						<input
							type="radio"
							name="confirmationType"
							checked={ confirmationType === 'success' }
							onChange={ () =>
								setAttributes( { confirmationType: 'success' } )
							}
						/>
						{ __( 'Success Message', 'ablocks' ) }
					</label>
					{ ! is_pro ? (
						<Tooltip
							tooltipText={ __(
								'This feature requires Pro activation.',
								'ablocks'
							) }
							position="top"
						>
							{ redirectLabel }
						</Tooltip>
					) : (
						redirectLabel
					) }
				</div>
			</div>

			{ confirmationType === 'redirect' && (
				<div className="ablocks-form-builder__confirmation__section ablocks-form-builder__confirmation__section--redirect">
					<h4 className="ablocks-form-builder__confirmation__section-title">
						{ __( 'Form Confirmation', 'ablocks' ) }
					</h4>
					<FormFieldWithAction
						label="Custom URL"
						type="url"
						value={ link?.href || '' }
						onChange={ ( e ) =>
							setAttributes( {
								link: { ...link, href: e.target.value },
							} )
						}
						placeholder="https://example.com"
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					<div className="ablocks-form-builder-form-group">
						<label className="ablocks-form-builder-form-label">
							<input
								type="checkbox"
								checked={ !! link?.linkTarget }
								onChange={ handleTargetToggle }
							/>
							<span style={ { marginLeft: '8px' } }>
								{ __( 'Open in new window', 'ablocks' ) }
							</span>
						</label>
					</div>
				</div>
			) }

			{ ( confirmationType === 'success' ||
				link?.linkTarget == true ) && (
				<>
					<FormFieldWithAction
						label="Confirmation Message"
						type="textarea"
						value={ attributes?.confirmationNotice }
						onChange={ ( e ) =>
							setAttributes( {
								confirmationNotice: e.target.value,
							} )
						}
						showAction={ true }
						genericTags={ subjectGenericTags }
						formTags={ getAllFieldNames(
							childAttributes,
							innerBlockDetails
						) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						targetKey="confirmationNotice"
					/>
					<div className="ablocks-form-builder__confirmation__section">
						<h4 className="ablocks-form-builder__confirmation__section-title">
							{ __( 'After Form Submission', 'ablocks' ) }
						</h4>

						<div className="ablocks-form-builder__confirmation__radio-group">
							<label
								className={ `ablocks-form-builder__confirmation__radio-option ${
									attributes?.afterFormSubmission ===
										'hide' && 'is-active'
								}` }
							>
								<input
									checked={
										attributes.afterFormSubmission ===
										'hide'
									}
									onChange={ () =>
										setAttributes( {
											afterFormSubmission: 'hide',
										} )
									}
									type="radio"
									name="afterFormSubmission"
									defaultChecked
								/>
								{ __( 'Hide Form', 'ablocks' ) }
							</label>
							<label
								className={ `ablocks-form-builder__confirmation__radio-option ${
									attributes?.afterFormSubmission ===
										'reset' && 'is-active'
								}` }
							>
								<input
									checked={
										attributes.afterFormSubmission ===
										'reset'
									}
									onChange={ () =>
										setAttributes( {
											afterFormSubmission: 'reset',
										} )
									}
									type="radio"
									name="afterFormSubmission"
								/>
								{ __( 'Reset Form', 'ablocks' ) }
							</label>
						</div>
					</div>
				</>
			) }
		</div>
	);
};

export default FormConfirmation;
