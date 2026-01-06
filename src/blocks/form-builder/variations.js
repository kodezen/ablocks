import { plugin_root_url } from '../../utils/helper';
import { __ } from '@wordpress/i18n';
export const variations = [
	{
		name: 'custom',
		title: 'Custom Blank Form',
		icon: (
			<img
				src={
					plugin_root_url + 'assets/images/form-builder/blankForm.svg'
				}
				alt={ __( 'Custom Blank Form', 'ablocks' ) }
			/>
		),

		attributes: {
			formType: 'customform',
			formActions: [ 'email', 'submission' ],
			submissionMetaData: [ 'userIp', 'userAgent' ],
		},
		scope: [ 'block' ],
		innerBlocks: [],
	},
	{
		name: 'contact',
		title: 'Simple Contact Form',
		icon: (
			<img
				src={
					plugin_root_url +
					'assets/images/form-builder/contactForm.svg'
				}
				alt={ __( 'Simple Contact Form', 'ablocks' ) }
			/>
		),
		attributes: {
			formType: 'contact',
			formActions: [ 'email', 'submission' ],
			submissionMetaData: [ 'userIp', 'userAgent' ],
		},
		scope: [ 'block' ],
		innerBlocks: [
			[
				'ablocks/form-input',
				{
					name: 'first_name',
					label: 'First Name',
					placeholder: 'First Name',
					type: 'text',
					inputType: 'Text',
				},
			],
			[
				'ablocks/form-input',
				{
					name: 'last_name',
					label: 'Last Name',
					placeholder: 'Last Name',
					type: 'text',
					inputType: 'Text',
				},
			],
			[
				'ablocks/form-input',
				{
					name: 'email',
					label: 'Email',
					placeholder: 'someone@example.com',
					type: 'email',
					inputType: 'Email',
				},
			],
			[
				'ablocks/form-textarea',
				{
					name: 'message',
					label: 'Message',
					placeholder: 'Enter your Message',
					type: 'text',
					inputType: 'Textarea',
				},
			],
		],
	},
	{
		name: 'registration',
		title: 'Registration Form',
		icon: (
			<img
				src={
					plugin_root_url +
					'assets/images/form-builder/registrationForm.svg'
				}
				alt={ __( 'Registration Form', 'ablocks' ) }
			/>
		),
		attributes: {
			formType: 'registration',
			buttonText: 'Register',
		},
		scope: [ 'block' ],
		innerBlocks: [
			[
				'ablocks/form-input',
				{
					name: 'username',
					label: 'Username',
					placeholder: 'Username',
					type: 'username',
					inputType: 'Username',
					nameChangeable: false,
				},
			],
			[
				'ablocks/form-input',
				{
					name: 'email',
					label: 'Email',
					placeholder: 'Email',
					type: 'email',
					inputType: 'Email',
					nameChangeable: false,
				},
			],
			[
				'ablocks/form-password',
				{
					label: 'Password',
					name: 'password',
					placeholder: 'Password',
					type: 'password',
					inputType: 'Password',
					nameChangeable: false,
				},
			],
			[
				'ablocks/form-password',
				{
					label: 'Confirm Password',
					name: 'confirm_password',
					placeholder: 'Confirm password',
					type: 'password',
					inputType: 'Password',
					nameChangeable: false,
				},
			],
			[
				'ablocks/form-checkbox',
				{
					name: 'accept',
					label: 'Accept our terms and condition',
					type: 'checkbox',
					inputType: 'checkbox',
					isRequired: true,
					nameChangeable: false,
				},
			],
		],
	},
	{
		name: 'login',
		title: 'Login Form',
		icon: (
			<img
				src={
					plugin_root_url + 'assets/images/form-builder/loginForm.svg'
				}
				alt={ __( 'Login Form', 'ablocks' ) }
			/>
		),
		attributes: {
			formType: 'login',
			buttonText: 'Log In',
		},
		scope: [ 'block' ],
		innerBlocks: [
			[
				'ablocks/form-input',
				{
					name: 'username',
					label: 'Username or Email',
					placeholder: 'Username or Email',
					type: 'text',
					inputType: 'Username',
					nameChangeable: false,
				},
			],
			[
				'ablocks/form-password',
				{
					label: 'Password',
					name: 'password',
					placeholder: 'Password',
					type: 'password',
					inputType: 'Password',
					nameChangeable: false,
				},
			],
			[
				'ablocks/form-checkbox',
				{
					name: 'rememberme',
					label: 'Remember Me',
				},
			],
		],
	},
	{
		name: 'subscription',
		title: 'Subscription Form',
		icon: (
			<img
				src={
					plugin_root_url +
					'assets/images/form-builder/subcriptionForm.svg'
				}
				alt={ __( 'Subscription Form', 'ablocks' ) }
			/>
		),
		attributes: {
			formType: 'subscription',
			buttonText: 'Subscription',
			formActions: [ 'email', 'submission' ],
			submissionMetaData: [ 'userIp', 'userAgent' ],
		},
		scope: [ 'block' ],
		innerBlocks: [
			[
				'ablocks/form-input',
				{
					name: 'email',
					label: 'Email',
					placeholder: 'Email',
					type: 'email',
					inputType: 'Email',
					nameChangeable: false,
				},
			],
		],
	},
	{
		name: 'multi-step',
		title: 'Multi Step Form',
		icon: (
			<img
				src={
					plugin_root_url +
					'assets/images/form-builder/multiStepForm.svg'
				}
				alt={ __( 'Multi Step Form', 'ablocks' ) }
			/>
		),
		attributes: {
			formType: 'multistep',
			buttonText: 'Subscription',
			formActions: [ 'email', 'submission' ],
			submissionMetaData: [ 'userIp', 'userAgent' ],
		},
		scope: [ 'block' ],
		innerBlocks: [ [ 'ablocks/form-multi-step' ] ],
	},
	{
		name: 'forget_password',
		title: 'Forget Password Form',
		icon: (
			<img
				src={
					plugin_root_url +
					'assets/images/form-builder/forgetPasswordForm.svg'
				}
				alt={ __( 'Forget Password Form', 'ablocks' ) }
			/>
		),
		attributes: {
			formType: 'forget_password',
			buttonText: 'Forget Password',
		},
		scope: [ 'block' ],
		innerBlocks: [
			[
				'ablocks/form-input',
				{
					name: 'email',
					label: 'User Email',
					placeholder: 'Email',
					type: 'email',
					inputType: 'Email',
					nameChangeable: false,
				},
			],
		],
	},
];
