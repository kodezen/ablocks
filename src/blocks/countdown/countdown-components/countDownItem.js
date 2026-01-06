import classNames from 'classnames';

const CountDownItem = ( { label, value, children, showLabel } ) => (
	<div
		className={ classNames(
			'ablocks-countdown__item',
			`ablocks-countdown__item--${ label }`
		) }
	>
		<div className="ablocks-countdown-value"> { value } </div>
		{ showLabel && (
			<div className="ablocks-countdown-label"> { children } </div>
		) }
	</div>
);

export default CountDownItem;
