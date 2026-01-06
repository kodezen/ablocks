import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getLinkAttributes } from '@Controls/link-control/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const labelSpacing = getRangeAttributes( {
	attributeName: 'labelSpacing',
	isResponsive: true,
	defaultValue: 10,
	copyStyle: true,
} );
export const helperTextSpacing = getRangeAttributes( {
	attributeName: 'helperTextSpacing',
	isResponsive: true,
	defaultValue: 10,
	copyStyle: true,
} );
export const inputIconPosition = getRangeAttributes( {
	attributeName: 'inputIconPosition',
	isResponsive: false,
	defaultValue: 75,
	copyStyle: true,
} );
export const navigatorSpacing = getRangeAttributes( {
	attributeName: 'navigatorSpacing',
	isResponsive: false,
	defaultValue: 10,
	copyStyle: true,
} );
export const rowsSpacing = getRangeAttributes( {
	attributeName: 'rowsSpacing',
	isResponsive: true,
	defaultValue: 0,
	copyStyle: true,
} );
export const buttonHeight = getRangeAttributes( {
	attributeName: 'buttonHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 0,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	email_template_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	variationSelected: {
		type: 'boolean',
		default: true,
	},
	postId: {
		type: 'number',
		default: '',
	},
	showLabels: {
		type: 'boolean',
		default: true,
	},
	loginRedirect: {
		type: 'boolean',
		default: false,
	},
	registerRedirect: {
		type: 'boolean',
		default: false,
	},
	navigatorAccess: {
		type: 'boolean',
		default: false,
	},

	formName: {
		type: 'string',
		default: '',
	},
	formType: {
		type: 'string',
		default: '',
	},
	formActions: {
		type: 'array',
		default: [],
	},
	childDetails: {
		type: 'array',
		default: [],
	},

	//label attributes

	labelColor: {
		type: 'string',
		default: '#000000',
	},
	customForm: {
		type: 'boolean',
		default: false,
	},

	//helper text

	helperTextColor: {
		type: 'string',
		default: '',
	},

	//input attributes
	inputColor: {
		type: 'string',
		default: '',
	},
	inputBgColor: {
		type: 'string',
		default: 'white',
	},
	inputPlaceholderColor: {
		type: 'string',
		default: '',
	},

	// button attribute
	buttonSize: {
		type: 'string',
		default: 'full-width',
		copyStyle: true,
	},
	buttonColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonBgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},

	buttonHColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonBgHColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonText: {
		type: 'string',
		default: 'Submit Here',
	},
	//email One settings
	emailOneTo: {
		type: 'string',
		default: 'someone@example.com',
	},
	emailOneSubject: {
		type: 'string',
		default: 'New message',
	},
	emailOneMessage: {
		type: 'string',
		default: '{all-fields}',
	},
	emailOneFormEmail: {
		type: 'string',
		default: 'someone@example.com',
	},
	emailOneFormName: {
		type: 'string',
		default: 'Local Name',
	},
	emailOneReplyTo: {
		type: 'string',
		default: 'someone@example.com',
	},
	emailOneCc: {
		type: 'string',
		default: '',
	},
	emailOneBcc: {
		type: 'string',
		default: '',
	},
	emailOneType: {
		type: 'string',
		default: 'HTML',
	},

	//emailTwoSettings
	emailTwoTo: {
		type: 'string',
		default: '',
	},
	emailTwoSubject: {
		type: 'string',
		default: 'New message',
	},
	emailTwoMessage: {
		type: 'string',
		default: '{all-fields}',
	},
	emailTwoFormEmail: {
		type: 'string',
		default: '',
	},
	emailTwoFormName: {
		type: 'string',
		default: 'Local Name',
	},
	emailTwoReplyTo: {
		type: 'string',
		default: '',
	},
	emailTwoCc: {
		type: 'string',
		default: '',
	},
	emailTwoBcc: {
		type: 'string',
		default: '',
	},
	emailTwoType: {
		type: 'string',
		default: 'HTML',
	},

	mailchimpOption: {
		type: 'string',
		default: 'default',
	},
	mailchimpApiKey: {
		type: 'string',
		default: '',
	},
	mailchimpValidateApi: {
		type: 'boolean',
		default: false,
	},
	mailchimpListIdOptions: {
		type: 'array',
		default: [ { label: 'select options', value: 'default' } ],
	},
	mailchimpMapFields: {
		type: 'array',
		default: [],
	},
	mailchimpMapSelects: {
		type: 'object',
		default: {},
	},
	mailchimpListId: {
		type: 'string',
		default: 'default',
	},
	mailchimpgroupsOptions: {
		type: 'array',
		default: [],
	},
	mailchimpgroupSelects: {
		type: 'array',
		default: [],
	},
	mailchimpTags: {
		type: 'string',
		default: '',
	},
	mapEmailOptions: {
		type: 'array',
		default: [ { label: 'None', value: 'default' } ],
	},
	mailchimpEmailSelects: {
		type: 'string',
		default: 'default',
	},
	mapOtherOptions: {
		type: 'array',
		default: [ { label: 'None', value: 'default' } ],
	},
	showDoubleOpt: {
		type: 'boolean',
		default: false,
	},

	mailchimpStatus: {
		type: 'string',
		default: '',
	},

	mailerliteOption: {
		type: 'string',
		default: 'default',
	},
	mailerliteApiKey: {
		type: 'string',
		default: '',
	},
	mailerliteValidateApi: {
		type: 'boolean',
		default: false,
	},
	mailerliteGroupId: {
		type: 'string',
		default: 'default',
	},
	mailerliteGroupIdOptions: {
		type: 'array',
		default: [ { label: 'select options', value: 'default' } ],
	},
	mailerliteMapFields: {
		type: 'array',
		default: [],
	},
	mailerliteMapSelects: {
		type: 'object',
		default: {},
	},
	allowReSubscribe: {
		type: 'boolean',
		default: false,
	},

	dripOption: {
		type: 'string',
		default: 'default',
	},
	dripApiKey: {
		type: 'string',
		default: '',
	},
	dripValidateApi: {
		type: 'boolean',
		default: false,
	},
	dripAccountIdOptions: {
		type: 'array',
		default: [ { label: 'select options', value: 'default' } ],
	},
	dripAccountId: {
		type: 'string',
		default: '',
	},
	dripMapFields: {
		type: 'array',
		default: [],
	},
	dripMapSelects: {
		type: 'object',
		default: {},
	},
	dripEmailSelects: {
		type: 'string',
		default: 'default',
	},
	dripTags: {
		type: 'boolean',
		default: false,
	},
	showFormFields: {
		type: 'boolean',
		default: false,
	},

	getResponseOption: {
		type: 'string',
		default: 'default',
	},
	getResponseApiKey: {
		type: 'string',
		default: '',
	},
	getResponseValidateApi: {
		type: 'boolean',
		default: false,
	},
	getResponseListId: {
		type: 'string',
		default: 'default',
	},
	getResponseListIdOptions: {
		type: 'array',
		default: [ { label: 'select options', value: 'default' } ],
	},
	getResponseMapFields: {
		type: 'array',
		default: [],
	},
	getResponseMapSelects: {
		type: 'object',
		default: {},
	},
	getResponseDayCycle: {
		type: 'number',
		default: 1,
	},

	convertkitOption: {
		type: 'string',
		default: 'default',
	},
	convertkitApiKey: {
		type: 'string',
		default: '',
	},
	convertkitValidateApi: {
		type: 'boolean',
		default: false,
	},
	convertkitFormIdOptions: {
		type: 'array',
		default: [
			{
				label: 'Default',
				value: 'default',
			},
		],
	},
	convertkitFormId: {
		type: 'string',
		default: 'default',
	},
	convertkitMapFields: {
		type: 'array',
		default: [],
	},
	convertkitMapSelects: {
		type: 'object',
		default: {},
	},
	convertkitEmailSelects: {
		type: 'string',
		default: 'default',
	},
	convertkitFirstNameSelects: {
		type: 'string',
		default: 'default',
	},
	convertkitTagsOptions: {
		type: 'array',
		default: [],
	},
	convertkitTagsSelects: {
		type: 'array',
		default: [],
	},
	emailVerification: {
		type: 'boolean',
		default: false,
	},
	submissionMetaData: {
		type: 'array',
		default: [],
	},
	loginPageUrl: {
		type: 'string',
		default: '',
	},
	navigatorColor: {
		type: 'string',
		default: '#74777C',
	},
	navigatorIcon: {
		type: 'object',
		default: {
			viewBox: '0 0 448 512',
			path: 'M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z',
		},
	},
	navigatorIconShow: {
		type: 'boolean',
		default: true,
	},
	forgetPasswordLabel: {
		type: 'string',
		default: 'Lost Your Password',
	},
	loginLabel: {
		type: 'string',
		default: 'Log in',
	},
	registerLabel: {
		type: 'string',
		default: 'Register',
	},
	homeLabel: {
		type: 'string',
		default: 'Go to home',
	},
	errorBackground: {
		type: 'string',
		default: '#D03739',
	},
	errorColor: {
		type: 'string',
		default: 'white',
	},
	successColor: {
		type: 'string',
		default: 'white',
	},
	successBackground: {
		type: 'string',
		default: '#00935B',
	},
	showErrorDemo: {
		type: 'string',
		default: false,
	},
	showSuccessDemo: {
		type: 'string',
		default: false,
	},
	userRoles: {
		type: 'array',
		default: [],
	},
	roleSlug: {
		type: 'string',
		default: 'default',
	},
	confirmationNotice: {
		type: 'string',
		default: 'Form successfully submitted!',
	},
	afterFormSubmission: {
		type: 'string',
		default: 'reset',
	},
	confirmationType: {
		type: 'string',
		default: 'success',
	},
	...getTypographyAttributes( 'labelTypography', true ),
	...getTypographyAttributes( 'helperTextTypography', true ),
	...alignmentAttributes( 'labelAlignment', true, { value: 'left' } ),
	...alignmentAttributes( 'inputAlignment', true, { value: 'left' } ),
	...alignmentAttributes( 'buttonAlignment', true, { value: '' } ),
	...alignmentAttributes( 'buttonTextAlignment', true, { value: 'center' } ),
	...alignmentAttributes( 'navigatorAlignment', true, { value: 'left' } ),
	...alignmentAttributes( 'successErrorAlignment', true, {
		value: 'center',
	} ),
	...buttonGroupAttributes( 'dir', true, { value: 'column' } ),
	...getBorderAttributes( 'inputBorder', true ),
	...getDimensionsAttributes( 'inputPadding', true ),
	...getDimensionsAttributes( 'buttonPadding', true ),
	...getDimensionsAttributes( 'navigatorPadding', true ),
	...getDimensionsAttributes( 'successErrorPadding', true ),
	...getTypographyAttributes( 'inputTypography', true ),
	...getTypographyAttributes( 'navigatorTypography', true ),
	...getTypographyAttributes( 'successErrorTypography', true ),
	...getLinkAttributes( 'link' ),
	...getLinkAttributes( 'webhookLink' ),
	...labelSpacing,
	...rowsSpacing,
	...inputIconPosition,
	...buttonHeight,
	...navigatorSpacing,
	...getTypographyAttributes( 'buttonTypography', true ),
	...getBorderAttributes( 'buttonBorder', true ),
	...globalAttributes,
};
export default attributes;
