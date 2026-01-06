import classNames from 'classnames';
import metadata from './block.json';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import SaveContainer from '@Components/block-container/save2';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		tabHeaders,
		initialOpen,
		iconPosition,
		showTitle,
		showSubTitle,
		activeDuration,
		showIcon,
		tabSubTitles,
		tabsMenuPositioning,
		tabsChangingEffect,
		tabIcons,
		enableHoverSwitch,
	} = attributes;
	return (
		<SaveContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<div
				className={ classNames( 'ablocks-block-tabs' ) }
				data-initial-open={ initialOpen }
				data-enable-auto-change={
					tabsChangingEffect === 'enableAutoChange' ? true : false
				}
				data-enable-scroll-change={
					tabsChangingEffect === 'enableScrollChange' ? true : false
				}
				data-tab-active-duration={ activeDuration }
				data-tab-menu-position={ tabsMenuPositioning?.value }
				data-enable-hover-switch={ enableHoverSwitch }
			>
				<ul className="ablocks-block-tabs__tab-panel">
					{ tabHeaders.map( ( header, index ) => (
						<li
							key={ index }
							className={ `ablocks-block-tabs__tab ablocks-block-tabs__tab-menu ${
								showIcon &&
								`ablocks-block-tabs__tab-menu-${ iconPosition }`
							}` }
							data-tab={ index }
						>
							{ showIcon && (
								<div className="ablocks-block-tabs__icon">
									<RenderIcon
										customIconData={ tabIcons?.[ index ] }
									/>
								</div>
							) }
							<div className="ablocks-block-tabs__tab-menu-content">
								{ showTitle && (
									<RichText.Content
										tagName="h2"
										value={ header }
										className="ablocks-block-tabs__tab-menu-title"
									/>
								) }
								{ showSubTitle && (
									<RichText.Content
										tagName="p"
										value={ tabSubTitles[ index ] } // Render subtitle
										className="ablocks-block-tabs__tab-menu-subtitle" // Added class
									/>
								) }
							</div>
							{ tabsChangingEffect === 'enableAutoChange' && (
								<div className="ablocks-block-tabs__progressbar"></div>
							) }
						</li>
					) ) }
				</ul>
				<div className="ablocks-block-tabs__body">
					<InnerBlocks.Content />
				</div>
			</div>
		</SaveContainer>
	);
}

Save.propTypes = propTypes;
