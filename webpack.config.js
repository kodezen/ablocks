const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const postcss = require( 'postcss' );
const cssnano = require( 'cssnano' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const path = require( 'path' );
const { readFileSync, existsSync } = require( 'fs' );
const { dirname, extname, join, sep } = require( 'path' );
const { sync: glob } = require( 'fast-glob' );
const { fromProjectRoot } = require( '@wordpress/scripts/utils/file' );
const blockLists = require( './blockLists' );

async function getWebpackConfig() {
	const chalk = ( await import( 'chalk' ) ).default;

	function getWebpackEntryPoints() {
		const blockMetadataFiles = glob( '**/block.json', {
			absolute: true,
			cwd: fromProjectRoot( 'src' ),
		} );

		if ( blockMetadataFiles.length > 0 ) {
			const srcDirectory = fromProjectRoot( 'src' + sep );
			const entryPoints = blockMetadataFiles.reduce(
				( accumulator, blockMetadataFile ) => {
					try {
						const { editorScript, script, viewScript } = JSON.parse(
							readFileSync( blockMetadataFile )
						);
						[ editorScript, script, viewScript ]
							.flat()
							.filter(
								( value ) =>
									value && value.startsWith( 'file:' )
							)
							.forEach( ( value ) => {
								const filepath = join(
									dirname( blockMetadataFile ),
									value.replace( 'file:', '' )
								);

								if ( ! filepath.startsWith( srcDirectory ) ) {
									// eslint-disable-next-line
									console.log(
										chalk.yellow(
											`Skipping "${ value.replace(
												'file:',
												''
											) }" listed in "${ blockMetadataFile.replace(
												fromProjectRoot( sep ),
												''
											) }". File is located outside of the "${ fromProjectRoot(
												'src'
											) }" directory.`
										)
									);
									return;
								}
								const entryName = filepath
									.replace( extname( filepath ), '' )
									.replace( srcDirectory, '' )
									.replace( /\\/g, '/' );

								const [ entryFilepath ] = glob(
									`${ entryName }.[jt]s?(x)`,
									{
										absolute: true,
										cwd: fromProjectRoot( 'src' ),
									}
								);

								if ( ! entryFilepath ) {
									// eslint-disable-next-line
									console.log(
										chalk.yellow(
											`Skipping "${ value.replace(
												'file:',
												''
											) }" listed in "${ blockMetadataFile.replace(
												fromProjectRoot( sep ),
												''
											) }". File does not exist in the "${ fromProjectRoot(
												'src'
											) }" directory.`
										)
									);
									return;
								}
								accumulator[ entryName ] = entryFilepath;
							} );
						return accumulator;
					} catch ( error ) {
						// eslint-disable-next-line
						console.log(
							chalk.yellow(
								`Skipping "${ blockMetadataFile.replace(
									fromProjectRoot( sep ),
									''
								) }" due to malformed JSON.`
							)
						);
						return accumulator;
					}
				},
				{}
			);

			if ( Object.keys( entryPoints ).length > 0 ) {
				return {
					...entryPoints,
					blocks: path.resolve( __dirname, 'src/blocks.js' ),
				};
			}
		}
		return {
			blocks: path.resolve( __dirname, 'src/blocks.js' ),
		};
	}

	const config = {
		...defaultConfig,
		entry: {
			...getWebpackEntryPoints(),
			dashboard: path.resolve( __dirname, 'src/dashboard.js' ),
			'blocks-common': path.resolve( __dirname, 'src/blocks-common.js' ),
			'demo-import': path.resolve( __dirname, 'src/demo-import.js' ),
			'animation-init': path.resolve( __dirname, 'src/animation-init.js' ),
		},
		output: {
			...defaultConfig.output,
			path: path.resolve( __dirname, 'assets/build' ),
		},
		resolve: {
			alias: {
				...defaultConfig.resolve.alias,
				'@BuildBlocks': path.resolve(
					__dirname,
					'./assets/build/blocks/'
				),
				'@Addons': path.resolve( __dirname, 'src/addons/' ),
				'@Blocks': path.resolve( __dirname, 'src/blocks/' ),
				'@Components': path.resolve( __dirname, 'src/components/' ),
				'@Dashboard': path.resolve( __dirname, 'src/dashboard/' ),
				'@Controls': path.resolve( __dirname, 'src/controls/' ),
				'@Utils': path.resolve( __dirname, 'src/utils/' ),
				'@Global': path.resolve( __dirname, 'src/global/' ),
				'@Toolbar': path.resolve( __dirname, 'src/toolbar/' ),
				'@BlocksCommon': path.resolve(
					__dirname,
					'src/blocks-common/'
				),
			},
		},
		plugins: [
			...defaultConfig.plugins,
			new CopyPlugin( {
				patterns: blockLists
					.map( ( blockName ) => {
						const fromPath = path.resolve(
							__dirname,
							`src/blocks/${ blockName }/style.css`
						);
						if ( existsSync( fromPath ) ) {
							return {
								from: fromPath,
								to: path.resolve(
									__dirname,
									'assets/build/blocks',
									blockName
								),
								transform( content ) {
									return postcss( [ cssnano ] )
										.process( content, { from: undefined } )
										.then( ( result ) => result.css );
								},
							};
						}
						return null;
					} )
					.filter( Boolean ),
			} ),
		],
	};

	return config;
}

module.exports = getWebpackConfig();
