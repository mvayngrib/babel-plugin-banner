'use strict';

const utils = require( './utils' );
const isComment = utils.isComment;
const getCommentContent = utils.getCommentContent;

module.exports = function( babel ) {
	const t = babel.types;

	return {
		visitor: {
			Program: function Program( path, $ ) {
				const options = $.opts;
				const banner = options.banner;
				const newLine = typeof options.newLine !== 'undefined' ? Boolean( options.newLine ) : true;

				if ( typeof banner !== 'string' ) {
					throw new TypeError( 'Banner must be a string.' );
				}

				if ( newLine ) {
					path.unshiftContainer( 'body', t.noop() );
				}

				if ( isComment( banner ) ) {
					path.addComment( 'leading', getCommentContent( banner ) );
				}
			}
		}
	};
}
