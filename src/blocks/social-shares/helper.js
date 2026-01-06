export const buttonTypeOptions = [
	{
		label: 'Facebook',
		value: 'Facebook',
	},

	{
		label: 'Twitter',
		value: 'Twitter',
	},

	{
		label: 'LinkedIn',
		value: 'LinkedIn',
	},
	{
		label: 'Pinterest',
		value: 'Pinterest',
	},
	{
		label: 'Reddit',
		value: 'Reddit',
	},
	{
		label: 'Telegram',
		value: 'Telegram',
	},
	{
		label: 'WhatsApp',
		value: 'WhatsApp',
	},
	{
		label: 'Skype',
		value: 'Skype',
	},
	{
		label: 'Tumblr',
		value: 'Tumblr',
	},
	{
		label: 'Digg',
		value: 'Digg',
	},
	{
		label: 'VK',
		value: 'VK',
	},
	{
		label: 'Mix',
		value: 'Mix',
	},
	{
		label: 'Pocket',
		value: 'Pocket',
	},
	{
		label: 'Stumble',
		value: 'Stumble',
	},

	{
		label: 'Gmail',
		value: 'Gmail',
	},
	{
		label: 'Messenger',
		value: 'Messenger',
	},
	{
		label: 'Flipboard',
		value: 'Flipboard',
	},
	{
		label: 'Blogger',
		value: 'Blogger',
	},
];
export const viewButtonOption = [
	{
		label: 'Icon & Text',
		value: 'Icon & Text',
	},
	{
		label: 'Icon',
		value: 'Icon',
	},
	{
		label: 'Text',
		value: 'Text',
	},
];
export const shapeOption = [
	{
		label: 'Square',
		value: 'Square',
	},
	{
		label: 'Rounded',
		value: 'Rounded',
	},
	{
		label: 'Circle',
		value: 'Circle',
	},
];
export const showButtonNumberOption = [
	{ label: '1', value: '1' },
	{ label: '2', value: '2' },
	{ label: '3', value: '3' },
	{ label: '4', value: '4' },
	{ label: '5', value: '5' },
	{ label: '6', value: '6' },
	{ label: '7', value: '7' },
	{ label: '8', value: '8' },
	{ label: '9', value: '9' },
	{ label: '10', value: '10' },
];

export const iconShare = [
	{
		text: 'Facebook',
		icon: {
			viewBox: '0 0 320 512',
			path: 'M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item--facebook-bg',
		iconBackgroundColor: 'ablocks-social-share-item--facebook-icon-bg',
		link: 'https://www.facebook.com/sharer.php?u=',
		isOpen: false,
		backgroundH: '#2d4373',
	},
	{
		text: 'Twitter',
		icon: {
			viewBox: '0 0 512 512',
			path: 'M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item--twitter-bg',
		iconBackgroundColor: 'ablocks-social-share-item--twitter-icon-bg',
		link: 'https://twitter.com/intent/tweet?url=',

		isOpen: false,
		backgroundH: '#1da1f2',
	},
	{
		text: 'Telegram',
		icon: {
			viewBox: '0 0 448 512',
			path: 'M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item--telegram-bg',
		iconBackgroundColor: 'ablocks-social-share-item--telegram-icon-bg',
		link: 'https://t.me/share/url?url=',

		isOpen: false,
		backgroundH: '#1da1f2',
	},
	{
		text: 'Print',
		icon: {
			viewBox: '0 0 512 512',
			path: 'M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item---print-bg',
		iconBackgroundColor: 'ablocks-social-share-item--print-icon-bg',
		link: 'window.print()',
		backgroundH: '#4a4a4a',
		isOpen: false,
	},
	{
		text: 'Email',
		icon: {
			viewBox: '0 0 640 512',
			path: 'M496 128a144 144 0 0 0-119.74 224H263.74A144 144 0 1 0 144 416h352a144 144 0 0 0 0-288zM64 272a80 80 0 1 1 80 80 80 80 0 0 1-80-80zm432 80a80 80 0 1 1 80-80 80 80 0 0 1-80 80z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item--email-bg',
		iconBackgroundColor: 'ablocks-social-share-item--email-icon-bg',
		link: 'mailto:?subject=',
		backgroundH: '#d44638',
		isOpen: false,
	},
	{
		text: 'WhatsApp',
		icon: {
			viewBox: '0 0 448 512',
			path: 'M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item--whatsapp-bg',
		iconBackgroundColor: 'ablocks-social-share-item--whatsapp-icon-bg',
		link: 'https://web.whatsapp.com/send?text=',
		backgroundH: '#25d366',
		isOpen: false,
	},
	{
		text: ' XLNG',
		icon: 'X',
		buttonBackgroundColor: 'ablocks-social-share-item--xlng-bg',
		iconBackgroundColor: 'ablocks-social-share-item--xlng-icon-bg',
		link: 'https://xlng.com/share?url=',
		backgroundH: '#0067a3',
		isOpen: false,
	},
	{
		text: 'Pocket',
		icon: {
			viewBox: '0 0 448 512',
			path: 'M407.6 64h-367C18.5 64 0 82.5 0 104.6v135.2C0 364.5 99.7 464 224.2 464c124 0 223.8-99.5 223.8-224.2V104.6c0-22.4-17.7-40.6-40.4-40.6zm-162 268.5c-12.4 11.8-31.4 11.1-42.4 0C89.5 223.6 88.3 227.4 88.3 209.3c0-16.9 13.8-30.7 30.7-30.7 17 0 16.1 3.8 105.2 89.3 90.6-86.9 88.6-89.3 105.5-89.3 16.9 0 30.7 13.8 30.7 30.7 0 17.8-2.9 15.7-114.8 123.2z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item--pocket-bg',
		iconBackgroundColor: 'ablocks-social-share-item--pocket-icon-bg',
		link: 'https://getpocket.com/save?url=',
		backgroundH: '#ef4056',
		isOpen: false,
	},
	{
		text: 'Mix',
		icon: {
			viewBox: '0 0 448 512',
			path: 'M0 64v348.9c0 56.2 88 58.1 88 0V174.3c7.9-52.9 88-50.4 88 6.5v175.3c0 57.9 96 58 96 0V240c5.3-54.7 88-52.5 88 4.3v23.8c0 59.9 88 56.6 88 0V64H0z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item--mix-bg',
		iconBackgroundColor: 'ablocks-social-share-item--mix-icon-bg',
		link: 'https://mix.com/add?url=',
		backgroundH: '#ff813f',
		isOpen: false,
	},
	{
		text: 'Stumble',
		icon: {
			viewBox: '0 0 512 512',
			path: 'M502.9 266v69.7c0 62.1-50.3 112.4-112.4 112.4-61.8 0-112.4-49.8-112.4-111.3v-70.2l34.3 16 51.1-15.2V338c0 14.7 12 26.5 26.7 26.5S417 352.7 417 338v-72h85.9zm-224.7-58.2l34.3 16 51.1-15.2V173c0-60.5-51.1-109-112.1-109-60.8 0-112.1 48.2-112.1 108.2v162.4c0 14.9-12 26.7-26.7 26.7S86 349.5 86 334.6V266H0v69.7C0 397.7 50.3 448 112.4 448c61.6 0 112.4-49.5 112.4-110.8V176.9c0-14.7 12-26.7 26.7-26.7s26.7 12 26.7 26.7v30.9z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item--stumbleupon-bg',
		iconBackgroundColor: 'ablocks-social-share-item--stumbleupon-icon-bg ',
		link: '',
		backgroundH: '#eb4924',

		isOpen: false,
	},
	{
		text: 'Skype',
		icon: {
			viewBox: '0 0 448 512',
			path: 'M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item--skype-bg',
		iconBackgroundColor: 'ablocks-social-share-item--skype-icon-bg',
		link: 'https://web.skype.com/share?url=',
		backgroundH: '#00aff0',
		isOpen: false,
	},
	{
		text: 'Digg',
		icon: {
			viewBox: '0 0 512 512',
			path: 'M81.7 172.3H0v174.4h132.7V96h-51v76.3zm0 133.4H50.9v-92.3h30.8v92.3zm297.2-133.4v174.4h81.8v28.5h-81.8V416H512V172.3H378.9zm81.8 133.4h-30.8v-92.3h30.8v92.3zm-235.6 41h82.1v28.5h-82.1V416h133.3V172.3H225.1v174.4zm51.2-133.3h30.8v92.3h-30.8v-92.3zM153.3 96h51.3v51h-51.3V96zm0 76.3h51.3v174.4h-51.3V172.3z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item--digg-bg',
		iconBackgroundColor: 'ablocks-social-share-item--digg-icon-bg',
		link: 'https://digg.com/submit?url=',
		backgroundH: '#1e7e9a',
		isOpen: false,
	},
	{
		text: 'Tumblr',
		icon: {
			viewBox: '0 0 320 512',
			path: 'M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z',
		},

		buttonBackgroundColor: 'ablocks-social-share-item--tumblr-bg',
		iconBackgroundColor: 'ablocks-social-share-item--tumblr-icon-bg',
		link: 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=',
		backgroundH: '#35465c',
		isOpen: false,
	},
	{
		text: 'OK',
		icon: 'O',
		buttonBackgroundColor: 'ablocks-social-share-item--ok-bg',
		iconBackgroundColor: 'ablocks-social-share-item--ok-icon-bg',
		link: 'https://connect.ok.ru/offer?url=',
		backgroundH: '#f47e00',
		isOpen: false,
	},
	{
		text: 'VK',
		icon: {
			viewBox: '0 0 576 512',
			path: 'M545 117.7c3.7-12.5 0-21.7-17.8-21.7h-58.9c-15 0-21.9 7.9-25.6 16.7 0 0-30 73.1-72.4 120.5-13.7 13.7-20 18.1-27.5 18.1-3.7 0-9.4-4.4-9.4-16.9V117.7c0-15-4.2-21.7-16.6-21.7h-92.6c-9.4 0-15 7-15 13.5 0 14.2 21.2 17.5 23.4 57.5v86.8c0 19-3.4 22.5-10.9 22.5-20 0-68.6-73.4-97.4-157.4-5.8-16.3-11.5-22.9-26.6-22.9H38.8c-16.8 0-20.2 7.9-20.2 16.7 0 15.6 20 93.1 93.1 195.5C160.4 378.1 229 416 291.4 416c37.5 0 42.1-8.4 42.1-22.9 0-66.8-3.4-73.1 15.4-73.1 8.7 0 23.7 4.4 58.7 38.1 40 40 46.6 57.9 69 57.9h58.9c16.8 0 25.3-8.4 20.4-25-11.2-34.9-86.9-106.7-90.3-111.5-8.7-11.2-6.2-16.2 0-26.2.1-.1 72-101.3 79.4-135.6z',
		},
		buttonBackgroundColor: 'ablocks-social-share-item--vk-bg',
		iconBackgroundColor: 'ablocks-social-share-item--vk-icon-bg',
		link: 'https://vk.com/share.php?url=',
		backgroundH: '#45668e',
		isOpen: false,
	},
	{
		text: 'Reddit',
		icon: {
			viewBox: '0 0 512 512',
			path: 'M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z',
		},
		buttonBackgroundColor: 'ablocks-social-share-item--reddit-bg',
		iconBackgroundColor: 'ablocks-social-share-item--reddit-icon-bg',
		link: 'https://reddit.com/submit?url=',
		backgroundH: '#ff4500',
		isOpen: false,
	},
	{
		text: 'Pinterest',
		icon: {
			viewBox: '0 0 496 512',
			path: 'M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z',
		},
		buttonBackgroundColor: 'ablocks-social-share-item--pinterest-bg',
		iconBackgroundColor: 'ablocks-social-share-item--pinterest-icon-bg',
		link: 'http://pinterest.com/pin/create/button/?url=',
		backgroundH: '#e60023',
		isOpen: false,
	},
	{
		text: 'LinkedIn',
		icon: {
			viewBox: '0 0 448 512',
			path: 'M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z',
		},
		buttonBackgroundColor: 'ablocks-social-share-item--linkedin-bg',
		iconBackgroundColor: 'ablocks-social-share-item--linkedin-icon-bg',
		link: 'https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=',
		backgroundH: '#0077b5',
		isOpen: false,
	},
	{
		text: 'Gmail',
		icon: {
			viewBox: '0 0 512 512',
			path: 'M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z',
		},
		buttonBackgroundColor: 'ablocks-social-share-item--gmail-bg',
		iconBackgroundColor: 'ablocks-social-share-item--gmail-icon-bg',
		link: 'https://mail.google.com/mail/?view=cm&fs=1&su=Check%20this%20out&body=',
		backgroundH: '#d14836',
		isOpen: false,
	},
	{
		text: 'Messenger',
		icon: {
			viewBox: '0 0 24 24',
			path: 'M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.732 8l3.13 3.259L19.732 8l-6.539 6.963z',
		},
		buttonBackgroundColor: 'ablocks-social-share-item--messenger-bg',
		iconBackgroundColor: 'ablocks-social-share-item--messenger-icon-bg',
		link: 'https://www.facebook.com/dialog/send?link=',
		backgroundH: '#0084ff',
		isOpen: false,
	},
	{
		text: 'Flipboard',
		icon: {
			viewBox: '0 0 448 512',
			path: 'M0 32v448h448V32H0zm358.4 179.2h-89.6v89.6h-89.6v89.6H89.6V121.6h268.8v89.6z',
		},
		buttonBackgroundColor: 'ablocks-social-share-item--flipboard-bg',
		iconBackgroundColor: 'ablocks-social-share-item--flipboard-icon-bg',
		link: 'https://share.flipboard.com/bookmarklet/popout?v=2&url=',
		backgroundH: '#e12828',
		isOpen: false,
	},
	{
		text: 'Blogger',
		icon: {
			viewBox: '0 0 448 512',
			path: 'M162.4 196c4.8-4.9 6.2-5.1 36.4-5.1 27.2 0 28.1.1 32.1 2.1 5.8 2.9 8.3 7 8.3 13.6 0 5.9-2.4 10-7.6 13.4-2.8 1.8-4.5 1.9-31.1 2.1-16.4.1-29.5-.2-31.5-.8-10.3-2.9-14.1-17.7-6.6-25.3zm61.4 94.5c-53.9 0-55.8.2-60.2 4.1-3.5 3.1-5.7 9.4-5.1 13.9.7 4.7 4.8 10.1 9.2 12 2.2 1 14.1 1.7 56.3 1.2l47.9-.6 9.2-1.5c9-5.1 10.5-17.4 3.1-24.4-5.3-4.7-5-4.7-60.4-4.7zm223.4-130.1c-3.5-28.4-23-50.4-51.8-58.5L393.7 101c-10.2-2.9-23.3-4.5-37.9-4.5-7.3 0-13.4.7-18.8 1.8-11.1 2.2-17.6 3.9-26.6 7.1-11.7 4.2-14.1 5.3-24.9 11.7-12.2 7.2-15.9 10.1-23.3 18.2-4.9 5.4-13.3 19.1-14.2 23.2-1.9 8.7-3.6 20.3-4.8 33.7a281.3 281.3 0 0 0-.1 28.5c0 147.8 68.5 158.4 207.6 158.4 128.8 0 178.8-11.8 178.8-158.4 0-92.2-14.3-149.8-61.4-158.7zM331 320.2c-3.9 28.6-32.2 48.6-71.4 50.4-27.2 1.3-108.2.3-108.2.3-23.8 0-31.5-5.7-31.5-31.5v-108c0-23.8 7.7-31.5 31.5-31.5 0 0 81-.3 108.2.3 39.2 1.8 67.5 21.8 71.4 50.4 3.2 23.3 3.2 46.8 0 69.6z',
		},
		buttonBackgroundColor: 'ablocks-social-share-item--blogger-bg',
		iconBackgroundColor: 'ablocks-social-share-item--blogger-icon-bg',
		link: 'https://www.blogger.com/blog-this.g?u=',
		backgroundH: '#ff5722',
		isOpen: false,
	},
];

export const stackOptions = [
	{
		label: 'vertical',
		value: 'vertical',
		icon: 'align-left',
	},
	{
		label: 'horizontal',
		value: 'horizontal',
		icon: 'align-top',
	},
];

export const horizontalOptions = [
	{
		label: 'Start',
		value: 'flex-start',
	},
	{
		label: 'End',
		value: 'flex-end',
	},
	{
		label: 'Center',
		value: 'center',
	},
	{
		label: 'Between',
		value: 'space-between',
	},
	{
		label: 'Around',
		value: 'space-around',
	},
];
export const socialShareIcon = (
	<>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
			className="ablocks-svg-icon"
		>
			<path d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path>
		</svg>
	</>
);

export const getMaxValueForUnit = ( unit ) => {
	if ( unit === 'px' ) {
		return 200;
	} else if ( unit === 'em' ) {
		return 15;
	} else if ( unit === 'rem' ) {
		return 15;
	}
	return 200;
};
