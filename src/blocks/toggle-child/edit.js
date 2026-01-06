import Settings from './settings';
import Render from './render';

export default function Edit( props ) {
	const { isSelected } = props;

	return (
		<>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
