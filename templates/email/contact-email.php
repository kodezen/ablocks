<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

\ABlocks\Helper::get_template( 'email/template-header.php' );
?>
<div class="ablocks-container">
	<div class="ablocks-content"> 
		<div class="ablocks-wrapper">
			<div class="ablocks-entry-content">
				<p><?php echo wp_kses_post( $message ); ?></p>
			</div>
			<div class="ablocks-footer">
				&copy; <?php
						$url = wp_parse_url( get_bloginfo( 'url' ) );
						echo sanitize_text_field( $url['host'] . ':' . $url['port'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
				<?php // echo wp_kses_post( $footer );
					// phpcs::ignore Squiz.PHP.CommentedOutCode.Found
				?>
			</div>
		</td>
	</div>
</div>
<?php
	\ABlocks\Helper::get_template( 'email/template-footer.php' );
