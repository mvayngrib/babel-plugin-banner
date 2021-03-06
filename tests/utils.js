'use strict';

const chai = require( 'chai' );
const utils = require( '../utils' );
const expect = chai.expect;
const isComment = utils.isComment;
const getCommentContent = utils.getCommentContent;

function testInput( input, fn, expected ) {
	if ( !Array.isArray( input ) ) {
		input = [ input ];
	}

	for ( const value of input ) {
		expect( fn( value ), value ).to.equal( expected );
	}
}

function testInputOutput( map, fn ) {
	Object.keys( map ).forEach( ( key ) => {
		const expected = map[ key ];

		expect( fn( key ), key ).to.equal( expected );
	} );
}

describe( 'isComment', () => {
	it( 'is a function', () => {
		expect( isComment ).to.be.a( 'function' );
	} );

	it( 'recognizes comments correctly', () => {
		const comments = [
			'/*test*/',
			'/*! Test */',
			'/**/',
			'/*\n*/',
			'/*T\ne\ns\nt */',
			'//test',
			'//Test\n',
			'// test',
			'// test\n',
			'//',
			'//\n'
		];

		const notComments = [
			'/* Test',
			'Test */',
			'// t\nest',
			'Te/*st',
			'Te/**/st'
		];

		testInput( comments, isComment, true );
		testInput( notComments, isComment, false );
	} );
} );

describe( 'getCommentContent', () => {
	it( 'is a function', () => {
		expect( getCommentContent ).to.be.a( 'function' );
	} );

	it( 'correctly gets content from given comment', () => {
		const comments = {
			'/*test*/': 'test',
			'/*! Test */': '! Test ',
			'/**/': '',
			'/*\n*/': '\n',
			'/*T\ne\ns\nt */': 'T\ne\ns\nt ',
			'//test': 'test',
			'//Test\n': 'Test\n',
			'// test': ' test',
			'// test\n': ' test\n',
			'//': '',
			'//\n': '\n'
		};

		testInputOutput( comments, getCommentContent );
	} );
} );
