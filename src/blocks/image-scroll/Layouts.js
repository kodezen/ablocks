import React, { useRef } from 'react';
import Image from './Image';
import './style.css';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import getDeviceType from '@Utils/get-device-type';
const propTypes = {};

export default function Layouts( props ) {
	const ref = useRef();
	const { attributes } = props;
	const {
		imgUrl,
		imageScrollOption,
		scrollHeight,
		transitionTime,
		showOverlay,
		showIcon,
	} = attributes;

	const iconData = {
		path: 'M7.67993 9.84002V14.16C7.67993 16.536 9.62393 18.48 11.9999 18.48C14.3759 18.48 16.3199 16.536 16.3199 14.16V9.84002C16.3199 7.46402 14.3759 5.52002 11.9999 5.52002C9.62393 5.52002 7.67993 7.46402 7.67993 9.84002ZM11.9999 6.48002C13.8479 6.48002 15.3599 7.99202 15.3599 9.84002V14.16C15.3599 16.008 13.8479 17.52 11.9999 17.52C10.1519 17.52 8.63993 16.008 8.63993 14.16V9.84002C8.63993 7.99202 10.1519 6.48002 11.9999 6.48002Z M12 10.5602C12.264 10.5602 12.48 10.3442 12.48 10.0802V8.64016C12.48 8.37616 12.264 8.16016 12 8.16016C11.736 8.16016 11.52 8.37616 11.52 8.64016V10.0802C11.52 10.3442 11.736 10.5602 12 10.5602Z M11.6638 22.1762C11.7598 22.2722 11.8798 22.3202 11.9998 22.3202C12.1198 22.3202 12.2398 22.2722 12.3358 22.1762L13.5358 20.9762C13.7278 20.7842 13.7278 20.4962 13.5358 20.3042C13.3438 20.1122 13.0558 20.1122 12.8638 20.3042L11.9998 21.1682L11.1358 20.3042C10.9438 20.1122 10.6558 20.1122 10.4638 20.3042C10.2718 20.4962 10.2718 20.7842 10.4638 20.9762L11.6638 22.1762Z M11.6638 1.82418L10.4638 3.02418C10.2718 3.21618 10.2718 3.50418 10.4638 3.69618C10.5598 3.79218 10.6798 3.84018 10.7998 3.84018C10.9198 3.84018 11.0398 3.79218 11.1358 3.69618L11.9998 2.83218L12.8638 3.69618C12.9598 3.79218 13.0798 3.84018 13.1998 3.84018C13.3198 3.84018 13.4398 3.79218 13.5358 3.69618C13.7278 3.50418 13.7278 3.21618 13.5358 3.02418L12.3358 1.82418C12.1438 1.63218 11.8558 1.63218 11.6638 1.82418Z',
		viewBox: '0 0 24 24',
	};

	const deviceType = getDeviceType();

	let layout;

	if ( imgUrl ) {
		layout = <Image { ...props } containerRef={ ref } />;
	}

	return (
		<>
			{ showOverlay && (
				<div className="ablocks-block-image-overlay"></div>
			) }
			{ showIcon && (
				<div className="ablocks-icon ablocks-icon-wrap">
					<RenderIcon
						customIconData={ iconData }
						style={ {
							fill:
								getTextColorCSS( attributes?.iconColor ) ||
								'black',
						} }
					/>
				</div>
			) }
			<figure
				className="ablocks-image-scroll__figure"
				ref={ ref }
				data-scroll-option={ imageScrollOption.value }
				data-scroll-height={
					scrollHeight?.[ 'value' + deviceType ] ??
					scrollHeight?.value ??
					0
				}
				data-transition-time={ transitionTime }
			>
				{ layout }
			</figure>
		</>
	);
}

Layouts.propTypes = propTypes;
