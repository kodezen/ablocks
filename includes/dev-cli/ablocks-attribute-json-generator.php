<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class AblocksAttributeJsonGenerator {
	protected $build_blocks_dir = ABLOCKS_ROOT_DIR_PATH . 'assets/build/blocks/';
	protected $src_blocks_dir = ABLOCKS_ROOT_DIR_PATH . 'src/blocks/';
	protected $attributes_dir = ABLOCKS_ROOT_DIR_PATH . 'includes/blocks/';
	protected $action_name = 'ablocks-attribute-json-generator';
	/**
	 * Build the blocks by processing block.json and attributes.php files.
	 */
	public function build() {
		// Define paths to blocks directories
		$build_blocks_directory = $this->build_blocks_dir;
		$src_blocks_directory = $this->src_blocks_dir;
		$attributes_directory = $this->attributes_dir;

		// List all block names
		$block_names = require_once $this->attributes_dir . 'blocks.php';

		foreach ( $block_names as $block_name ) {
			// Path to the block's attributes.php file
			$attributes_php_path = $attributes_directory . $block_name . '/attributes.php';

			// Check if attributes.php exists
			if ( file_exists( $attributes_php_path ) ) {
				// Include the attributes.php file to get the $attributes array
				$attributes = require $attributes_php_path;
				// Check if $attributes is properly set
				if ( isset( $attributes ) && is_array( $attributes ) ) {
					// Paths to block.json files in both directories
					$build_block_json_path = $build_blocks_directory . $block_name . '/block.json';
					$src_block_json_path = $src_blocks_directory . $block_name . '/block.json';

					// Generate block.json content with merged attributes
					$block_json_content = $this->generate_merged_block_json( $src_block_json_path, $attributes );

					// Save the generated content to both directories
					$this->save_block_json( $build_block_json_path, $block_json_content, $block_name );
					$this->save_block_json( $src_block_json_path, $block_json_content, $block_name );
				} else {
					WP_CLI::warning( "No attributes found for $block_name" );
				}
			} else {
				WP_CLI::warning( "attributes.php not found for: $block_name" );
			}//end if
		}//end foreach
	}

	/**
	 * Generate merged block.json content with the provided attributes
	 *
	 * @param string $block_json_path Path to the block.json file.
	 * @param array  $attributes Array of attributes to merge.
	 * @return string JSON encoded block.json content
	 */
	private function generate_merged_block_json( $block_json_path, $attributes ) {
		$block_json = [];

		// Check if block.json exists in the build folder and read it
		if ( file_exists( $block_json_path ) ) {
			// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			$existing_block_json_content = file_get_contents( $block_json_path ); // phpcs::ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			$existing_block_json = json_decode( $existing_block_json_content, true );

			if ( isset( $existing_block_json ) && is_array( $existing_block_json ) ) {
				// Merge the existing block.json with the new attributes
				$existing_block_json['attributes'] = $attributes;
				$block_json = $existing_block_json;
			} else {
				WP_CLI::warning( "Invalid block.json structure in: $block_json_path" );
			}
		}

		// Encode the block.json array into JSON
		return wp_json_encode( $block_json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES );
	}

	/**
	 * Save block.json content to the specified path
	 *
	 * @param string $block_json_path Path to the block.json file.
	 * @param string $block_json_content JSON encoded block.json content.
	 * @param string $block_name Name of the block.
	 * @return void
	 */
	private function save_block_json( $block_json_path, $block_json_content, $block_name ) {
		// Check if block.json path is valid
		if ( ! file_exists( dirname( $block_json_path ) ) ) {
			WP_CLI::warning( "Directory not found for: $block_json_path" );
			return;
		}

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_file_put_contents
		file_put_contents( $block_json_path, $block_json_content );

		WP_CLI::success( "Updated attributes in: $block_json_path" );
	}
}

// Register the command with WP-CLI
if ( defined( 'WP_CLI' ) && \WP_CLI ) {
	\WP_CLI::add_command( 'ablocks-attribute-json-generator', 'AblocksAttributeJsonGenerator' );
}
