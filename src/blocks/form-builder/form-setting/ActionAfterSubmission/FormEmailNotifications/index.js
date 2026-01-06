import FormFieldWithAction from '../../Components/FormFieldWithAction';
import {
	getAllFieldNames,
	subjectGenericTags,
	emailGenericTags,
} from '../../helper';
import { makeRequest } from '@Utils/helper';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import BlockEditor from '@Components/block-editor';
import ActionButton from '../../Components/ActionButton';
import ABlocksToggleControl from '@Controls/toggleButton';

const FormConfirmation = ( {
	attributes,
	setAttributes,
	childAttributes,
	innerBlockDetails = [],
} ) => {
	const [ templates, setTemplates ] = useState( [] );
	const [ slugData, setSlugData ] = useState( [] );
	const [ editingTemplate, setEditingTemplate ] = useState( null );
	const [ isNewTemplate, setIsNewTemplate ] = useState( false );

	// Define slug constants
	const isSlugEmailOne = 'AttributeEmailOne';
	const isSlugEmailTwo = 'AttributeEmailTwo';
	const { email_template_id } = attributes;

	// API Functions
	const getTemplates = async () => {
		if ( ! email_template_id ) {
			console.error(
				'❌ GET TEMPLATES - No email_template_id provided!'
			);
			return;
		}

		try {
			const payload = {
				action: 'ablocks/get_templates',
				email_template_id,
			};
			const response = await makeRequest( payload );

			const apiResponse = response?.data;
			const valueCheck = Object.keys( templates );
			if ( apiResponse && apiResponse.success && apiResponse.data ) {
				const templatesArray = Object.keys( apiResponse.data ).map(
					( slug ) => {
						const template = {
							slug,
							...apiResponse.data[ slug ],
						};
						return template;
					}
				);
				setTemplates( templatesArray );
				// Extract slugs for checking
				const slugs = templatesArray.map(
					( template ) => template.slug
				);
				setSlugData( slugs );
			} else {
				setTemplates( [] );
				setSlugData( [] );
			}
		} catch ( error ) {
			setTemplates( [] );
		}
	};

	const saveTemplate = async ( templateData ) => {
		// Validate required fields
		if ( ! templateData.to || templateData.to.trim() === '' ) {
			alert(
				'Please enter a valid "To" email address before saving the template.'
			);
			return;
		}

		try {
			const payload = {
				action: 'ablocks/update_template',
				email_template_id,
				...templateData,
			};
			const response = await makeRequest( payload );

			if ( response?.data?.success ) {
				// Reset attributes to make defaults after template creation
				if ( templateData.slug === 'AttributeEmailOne' ) {
					setAttributes( {
						emailOneSubject: 'New message',
						emailOneTo: '',
						emailOneFormName: 'Local Name',
						emailOneFormEmail: '',
						emailOneMessage: '{all-fields}',
						emailOneReplyTo: '',
						emailOneCc: '',
						emailOneBcc: '',
						emailOneType: 'HTML',
						formActions: [ 'submission' ],
					} );
				}
				if ( templateData.slug === 'AttributeEmailTwo' ) {
					setAttributes( {
						emailTwoSubject: 'New message',
						emailTwoTo: '',
						emailTwoFormName: 'Local Name',
						emailTwoFormEmail: '',
						emailTwoMessage: '{all-fields}',
						emailTwoReplyTo: '',
						emailTwoCc: '',
						emailTwoBcc: '',
						emailTwoType: 'HTML',
						formActions: [ 'submission' ],
					} );
				}
				setEditingTemplate( null );
				setIsNewTemplate( false );
				getTemplates();
			} else {
				console.log( '❌ SAVE TEMPLATE - Failed:', response );
			}
		} catch ( error ) {
			console.error( '❌ SAVE TEMPLATE - Error:', error );
		}
	};

	const deleteTemplate = async ( slug ) => {
		if ( ! confirm( 'Are you sure you want to delete this template?' ) ) {
			return;
		}

		try {
			const payload = {
				action: 'ablocks/delete_template',
				email_template_id,
				slug,
			};

			const response = await makeRequest( payload );

			if ( response?.data?.success ) {
				if ( editingTemplate && editingTemplate.slug === slug ) {
					setEditingTemplate( null );
					setIsNewTemplate( false );
				}
				getTemplates();
			} else {
				console.log( 'DELETE TEMPLATE - Failed:', response );
			}
		} catch ( error ) {
			console.error( 'DELETE TEMPLATE - Error:', error );
		}
	};

	// UI Actions
	const addNewTemplate = () => {
		const newTemplate = {
			slug: 'template-' + Date.now(),
			subject: 'New Form Submission-{form_title}',
			from: window.ABlocksGlobal?.form_builder?.admin_email || '',
			from_name: window.ABlocksGlobal?.form_builder?.site_title || '',
			to: '',
			body: '{all-fields}',
			reply_to: window.ABlocksGlobal?.form_builder?.admin_email || '',
			cc: '',
			bcc: '',
			format: 'html',
			status: true,
		};
		setEditingTemplate( newTemplate );
		setIsNewTemplate( true );
	};

	const editTemplate = ( template ) => {
		setEditingTemplate( { ...template } );
		setIsNewTemplate( false );
	};

	const cancelEdit = () => {
		setEditingTemplate( null );
		setIsNewTemplate( false );
	};

	// Create templates from existing email attributes
	const createTemplatesFromAttributes = () => {
		const templates = [];
		{
		}

		// Check emailOne data
		if (
			( attributes.emailOneSubject !== 'New message' ||
				attributes.emailOneTo !== '' ||
				attributes.emailOneFormName !== 'Local Name' ||
				attributes.emailOneFormEmail !== '' ||
				attributes.emailOneMessage !== '{all-fields}' ||
				attributes.emailOneReplyTo !== '' ||
				attributes.emailOneCc !== '' ||
				attributes.emailOneBcc !== '' ||
				attributes.emailOneType !== 'HTML' ) &&
			! slugData.includes( isSlugEmailOne )
		) {
			templates.push( {
				slug: 'AttributeEmailOne',
				subject: attributes.emailOneSubject || 'New message',
				from: attributes.emailOneFormEmail || '',
				from_name: attributes.emailOneFormName || '',
				to: attributes.emailOneTo || 'info1@example.com',
				body: attributes.emailOneMessage || '{all-fields}',
				reply_to: attributes.emailOneReplyTo || '',
				cc: attributes.emailOneCc || '',
				bcc: attributes.emailOneBcc || '',
				format: attributes.emailOneType?.toLowerCase() || 'html',
				status: true,
			} );
		}

		// Check emailTwo data
		if (
			( attributes.emailTwoSubject !== 'New message' ||
				attributes.emailTwoTo !== '' ||
				attributes.emailTwoFormName !== 'Local Name' ||
				attributes.emailTwoFormEmail !== '' ||
				attributes.emailTwoMessage !== '{all-fields}' ||
				attributes.emailTwoReplyTo !== '' ||
				attributes.emailTwoCc !== '' ||
				attributes.emailTwoBcc !== '' ||
				attributes.emailTwoType !== 'HTML' ) &&
			! slugData.includes( isSlugEmailTwo )
		) {
			templates.push( {
				slug: 'AttributeEmailTwo',
				subject: attributes.emailTwoSubject || 'New message',
				from: attributes.emailTwoFormEmail || '',
				from_name: attributes.emailTwoFormName || '',
				to: attributes.emailTwoTo || 'info2@example.com',
				body: attributes.emailTwoMessage || '{all-fields}',
				reply_to: attributes.emailTwoReplyTo || '',
				cc: attributes.emailTwoCc || '',
				bcc: attributes.emailTwoBcc || '',
				format: attributes.emailTwoType?.toLowerCase() || 'html',
				status: true,
			} );
		}
		// Save templates if any exist
		if ( templates.length > 0 ) {
			{
			}
			templates.forEach( ( template ) => saveTemplate( template ) );
		}
	};

	// Load old attribute data
	useEffect( () => {
		if (
			slugData.length >= 0 &&
			( ! slugData.includes( isSlugEmailTwo ) ||
				! slugData.includes( isSlugEmailOne ) )
		) {
			createTemplatesFromAttributes();
		}
	}, [ slugData ] );
	// Load templates on mount
	useEffect( () => {
		getTemplates();
	}, [] );

	return (
		<div className="ablocks-form-builder__confirmation">
			<div className="ablocks-form-builder__confirmation__section">
				<div className="ablocks-form-builder__email__notification">
					<h4 className="ablocks-form-builder__email__section-title">
						{ __( 'Email Notifications', 'ablocks' ) }
					</h4>

					{ /* Template Editor */ }
					{ editingTemplate && (
						<div className="ablocks-form-builder__email-template-editor">
							<h4>
								{ isNewTemplate
									? 'Add New Template'
									: 'Edit Template' }
							</h4>
							<FormFieldWithAction
								label="From Name"
								type="text"
								value={ editingTemplate.from_name || '' }
								onChange={ ( e ) =>
									setEditingTemplate( {
										...editingTemplate,
										from_name: e.target.value,
									} )
								}
								showAction={ true }
								formTags={ getAllFieldNames(
									childAttributes,
									innerBlockDetails
								) }
								genericTags={ subjectGenericTags }
								attributes={ {
									...attributes,
									from_name: editingTemplate.from_name,
								} }
								setAttributes={ ( newAttrs ) =>
									setEditingTemplate( ( prev ) => ( {
										...prev,
										from_name: newAttrs.from_name,
									} ) )
								}
								targetKey="from_name"
							/>

							<FormFieldWithAction
								label="To"
								type="email"
								value={ editingTemplate.to || '' }
								onChange={ ( e ) =>
									setEditingTemplate( {
										...editingTemplate,
										to: e.target.value,
									} )
								}
								showAction={ true }
								formTags={ getAllFieldNames(
									childAttributes,
									innerBlockDetails,
									true
								) }
								genericTags={ emailGenericTags }
								attributes={ {
									...attributes,
									to: editingTemplate.to,
								} }
								setAttributes={ ( newAttrs ) =>
									setEditingTemplate( ( prev ) => ( {
										...prev,
										to: newAttrs.to,
									} ) )
								}
								targetKey="to"
								notice="Comma separated values are also accepted."
							/>
							<FormFieldWithAction
								label="Subject"
								type="text"
								value={ editingTemplate.subject || '' }
								onChange={ ( e ) =>
									setEditingTemplate( {
										...editingTemplate,
										subject: e.target.value,
									} )
								}
								showAction={ true }
								formTags={ getAllFieldNames(
									childAttributes,
									innerBlockDetails
								) }
								genericTags={ subjectGenericTags }
								attributes={ {
									...attributes,
									subject: editingTemplate.subject,
								} }
								setAttributes={ ( newAttrs ) =>
									setEditingTemplate( ( prev ) => ( {
										...prev,
										subject: newAttrs.subject,
									} ) )
								}
								targetKey="subject"
							/>

							<FormFieldWithAction
								label="From Email"
								type="email"
								value={ editingTemplate.from || '' }
								onChange={ ( e ) =>
									setEditingTemplate( {
										...editingTemplate,
										from: e.target.value,
									} )
								}
								showAction={ true }
								formTags={ getAllFieldNames(
									childAttributes,
									innerBlockDetails,
									true
								) }
								genericTags={ emailGenericTags }
								attributes={ {
									...attributes,
									from: editingTemplate.from,
								} }
								setAttributes={ ( newAttrs ) =>
									setEditingTemplate( ( prev ) => ( {
										...prev,
										from: newAttrs.from,
									} ) )
								}
								targetKey="from"
								notice="Notifications can use only one From Email so please enter a single address."
							/>

							<div className="ablocks-form-builder-form-group">
								{ /* <textarea
									className="ablocks-form-builder-form-input"
									value={editingTemplate.body || ''}
									onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
									rows="6"
									style={{ width: '100%', minHeight: '120px' }}
								/> */ }
								{ /* <BlockEditor
								key={`editor-message`}
								defaultValue={editingTemplate.body || ''}
                                onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
								suffix={`formbuilder-message`}
								/> */ }
								<div className="ablocks-form-builder-editor-label">
									<label className="ablocks-form-builder-form-label">
										Message
									</label>
									<ActionButton
										formTags={ getAllFieldNames(
											childAttributes,
											innerBlockDetails
										) }
										genericTags={ subjectGenericTags }
										attributes={ {
											...attributes,
											body: editingTemplate.body,
										} }
										setAttributes={ ( newAttrs ) =>
											setEditingTemplate( ( prev ) => ( {
												...prev,
												body: newAttrs.body,
											} ) )
										}
										targetKey="body"
										isQuillEditor={ true }
									/>
								</div>
								<BlockEditor
									key={ `editor-message-${ editingTemplate.slug }` }
									defaultValue={ editingTemplate.body || '' }
									saveValueHandler={ ( value ) => {
										setEditingTemplate( ( prev ) => ( {
											...prev,
											body: value,
										} ) );
									} }
									suffix={ `formbuilder-message-${ editingTemplate.slug }` }
								/>
							</div>

							<FormFieldWithAction
								label="Reply-To"
								type="email"
								value={ editingTemplate.reply_to || '' }
								onChange={ ( e ) =>
									setEditingTemplate( ( prev ) => ( {
										...prev,
										reply_to: e.target.value,
									} ) )
								}
								showAction={ true }
								formTags={ getAllFieldNames(
									childAttributes,
									innerBlockDetails,
									true
								) }
								genericTags={ emailGenericTags }
								attributes={ {
									...attributes,
									reply_to: editingTemplate.reply_to,
								} }
								setAttributes={ ( newAttrs ) =>
									setEditingTemplate( ( prev ) => ( {
										...prev,
										reply_to: newAttrs.reply_to,
									} ) )
								}
								targetKey="reply_to"
								notice="Notifications can use only one From Email so please enter a single address."
							/>

							<FormFieldWithAction
								label="CC"
								type="email"
								value={ editingTemplate.cc || '' }
								onChange={ ( e ) =>
									setEditingTemplate( ( prev ) => ( {
										...prev,
										cc: e.target.value,
									} ) )
								}
								showAction={ true }
								formTags={ getAllFieldNames(
									childAttributes,
									innerBlockDetails,
									true
								) }
								genericTags={ emailGenericTags }
								attributes={ {
									...attributes,
									cc: editingTemplate.cc,
								} }
								setAttributes={ ( newAttrs ) =>
									setEditingTemplate( ( prev ) => ( {
										...prev,
										cc: newAttrs.cc,
									} ) )
								}
								targetKey="cc"
								notice="Comma separated values are also accepted."
							/>

							<FormFieldWithAction
								label="BCC"
								type="email"
								value={ editingTemplate.bcc || '' }
								onChange={ ( e ) =>
									setEditingTemplate( ( prev ) => ( {
										...prev,
										bcc: e.target.value,
									} ) )
								}
								showAction={ true }
								formTags={ getAllFieldNames(
									childAttributes,
									innerBlockDetails,
									true
								) }
								genericTags={ emailGenericTags }
								attributes={ {
									...attributes,
									bcc: editingTemplate.bcc,
								} }
								setAttributes={ ( newAttrs ) =>
									setEditingTemplate( ( prev ) => ( {
										...prev,
										bcc: newAttrs.bcc,
									} ) )
								}
								targetKey="bcc"
								notice="Comma separated values are also accepted."
							/>

							<div className="ablocks-form-builder-form-group">
								<label className="ablocks-form-builder-form-label">
									Send as
								</label>
								<select
									className="ablocks-form-builder-form-select"
									value={ editingTemplate.format || 'html' }
									onChange={ ( e ) =>
										setEditingTemplate( {
											...editingTemplate,
											format: e.target.value,
										} )
									}
								>
									<option value="html">HTML</option>
									<option value="plain">Plain</option>
								</select>
							</div>

							<div style={ { marginTop: '20px' } }>
								<button
									className="tem-delete-create-update-button"
									onClick={ () =>
										saveTemplate( editingTemplate )
									}
									style={ { marginRight: '10px' } }
								>
									{ isNewTemplate
										? 'Create Template'
										: 'Update Template' }
								</button>
								<button
									className="tem-delete-create-update-button"
									onClick={ cancelEdit }
								>
									Cancel
								</button>
							</div>
						</div>
					) }

					{ /* Templates List */ }
					<div className="ablocks-form-builder__email-templates-list">
						<table>
							<thead>
								<tr>
									<th>Status</th>
									<th>Name</th>
									<th>Subject</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{ templates.length > 0 ? (
									templates.map( ( template ) => (
										<tr key={ template.slug }>
											<td>
												<ABlocksToggleControl
													attributeValue={
														template.status || false
													}
													onChangeHandler={ (
														isEnabled
													) => {
														const updatedTemplate =
															{
																...template,
																status: isEnabled,
															};
														saveTemplate(
															updatedTemplate
														);
													} }
													isResponsive={ false }
												/>
											</td>
											<td>
												{ template.from_name ||
													'No Name' }
											</td>
											<td>
												{ template.subject ||
													'No Subject' }
											</td>
											<td>
												<button
													className="button button-small"
													onClick={ () =>
														editTemplate( template )
													}
													style={ {
														marginRight: '5px',
													} }
													title="Edit template"
												>
													<span className="dashicons dashicons-edit"></span>
												</button>
												<button
													className="button button-small"
													onClick={ () => {
														if (
															confirm(
																'Are you sure you want to delete this template?'
															)
														) {
															deleteTemplate(
																template.slug
															);
														}
													} }
													style={ {
														color: '#d63638',
													} }
													title="Delete template"
												>
													<span className="dashicons dashicons-trash"></span>
												</button>
											</td>
										</tr>
									) )
								) : (
									<tr>
										<td colSpan="5">
											<div className="isEmail-template-empty">
												<span className="isEmail-template-empty-icon">
													💬
												</span>
												<strong>
													No email templates created
													yet.
												</strong>{ ' ' }
												<span>
													Click "Add New Email
													Template" to create your
													first one.
												</span>
											</div>
										</td>
									</tr>
								) }
							</tbody>
						</table>
					</div>
					<div style={ { marginTop: '20px' } }>
						<button
							className="ablocks-form-builder__email-notification__button"
							onClick={ addNewTemplate }
						>
							+ Add New Email Template
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormConfirmation;
