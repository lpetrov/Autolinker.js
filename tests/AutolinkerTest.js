/*global Ext, Y, tests, Autolinker */
Ext.test.Session.addSuite( new Ext.test.Suite( {
	
	name: 'Autolinker',
	
	
	items : [
		/*
		 * Test link()
		 */
		{
			name : "Test link()",
			
			"link() should automatically link URLs in the form of http://www.yahoo.com" : function() {
				var result = Autolinker.link( "Joe went to http://www.yahoo.com" );
				Y.Assert.areSame( 'Joe went to <a href="http://www.yahoo.com" target="_blank">yahoo.com</a>', result );
			},
			
			"link() should automatically link URLs in the form of http://yahoo.com" : function() {
				var result = Autolinker.link( "Joe went to http://yahoo.com" );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com" target="_blank">yahoo.com</a>', result );
			},
			
			"link() should automatically link URLs in the form of www.yahoo.com, prepending the http:// in this case" : function() {
				var result = Autolinker.link( "Joe went to www.yahoo.com" );
				Y.Assert.areSame( 'Joe went to <a href="http://www.yahoo.com" target="_blank">yahoo.com</a>', result );
			},

			"link() should automatically link URLs in the form of subdomain.yahoo.com" : function() {
				var result = Autolinker.link( "Joe went to subdomain.yahoo.com" );
				Y.Assert.areSame( 'Joe went to <a href="http://subdomain.yahoo.com" target="_blank">subdomain.yahoo.com</a>', result );
			},
			
			
			// -----------------------------
			
			// Test with short urls of known domains
			
			"link() should automatically link URLs in the form of yahoo.com, prepending the http:// in this case" : function() {
				var result = Autolinker.link( "Joe went to yahoo.com" );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com" target="_blank">yahoo.com</a>', result );
			},
			
			"link() should automatically link URLs in the form of yahoo.co.uk, prepending the http:// in this case" : function() {
				var result = Autolinker.link( "Joe went to yahoo.co.uk" );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.co.uk" target="_blank">yahoo.co.uk</a>', result );
			},
			
			"link() should automatically link URLs in the form of yahoo.ru, prepending the http:// in this case" : function() {
				var result = Autolinker.link( "Joe went to yahoo.ru" );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.ru" target="_blank">yahoo.ru</a>', result );
			},
			
			
			// -----------------------------
			
			// Test that the path, query string, and hash are captured
			
			"link() should automatically link URLs in the form of yahoo.com/path/to/file.html, handling the path" : function() {
				var result = Autolinker.link( "Joe went to yahoo.com/path/to/file.html" );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com/path/to/file.html" target="_blank">yahoo.com/path/to/file.html</a>', result );
			},
			
			"link() should automatically link URLs in the form of yahoo.com?hi=1, handling the query string" : function() {
				var result = Autolinker.link( "Joe went to yahoo.com?hi=1" );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com?hi=1" target="_blank">yahoo.com?hi=1</a>', result );
			},
			
			"link() should automatically link URLs in the form of yahoo.com#index1, handling the hash" : function() {
				var result = Autolinker.link( "Joe went to yahoo.com#index1" );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com#index1" target="_blank">yahoo.com#index1</a>', result );
			},
			
			"link() should automatically link URLs in the form of yahoo.com/path/to/file.html?hi=1, handling the path and the query string" : function() {
				var result = Autolinker.link( "Joe went to yahoo.com/path/to/file.html?hi=1" );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com/path/to/file.html?hi=1" target="_blank">yahoo.com/path/to/file.html?hi=1</a>', result );
			},
			
			"link() should automatically link URLs in the form of yahoo.com/path/to/file.html#index1, handling the path and the hash" : function() {
				var result = Autolinker.link( "Joe went to yahoo.com/path/to/file.html#index1" );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com/path/to/file.html#index1" target="_blank">yahoo.com/path/to/file.html#index1</a>', result );
			},
			
			"link() should automatically link URLs in the form of yahoo.com/path/to/file.html?hi=1#index1, handling the path, query string, and hash" : function() {
				var result = Autolinker.link( "Joe went to yahoo.com/path/to/file.html?hi=1#index1" );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com/path/to/file.html?hi=1#index1" target="_blank">yahoo.com/path/to/file.html?hi=1#index1</a>', result );
			},
			
			
			// -----------------------------
			
			// Test that the hash anchor part pulls all needed characters in complex URLs
			
			"link() should automatically link a URL with a complex hash (such as a Google Analytics url)" : function() {
				var result = Autolinker.link( "Joe went to https://www.google.com/analytics/web/?pli=1#my-reports/Obif-Y6qQB2xAJk0ZZE1Zg/a4454143w36378534p43704543/%3F.date00%3D20120314%26_.date01%3D20120314%268534-table.rowStart%3D0%268534-table.rowCount%3D25/ and analyzed his analytics" );
				Y.Assert.areSame( 'Joe went to <a href="https://www.google.com/analytics/web/?pli=1#my-reports/Obif-Y6qQB2xAJk0ZZE1Zg/a4454143w36378534p43704543/%3F.date00%3D20120314%26_.date01%3D20120314%268534-table.rowStart%3D0%268534-table.rowCount%3D25/" target="_blank">google.com/analytics/web/?pli=1#my-reports/Obif-Y6qQB2xAJk0ZZE1Zg/a4454143w36378534p43704543/%3F.date00%3D20120314%26_.date01%3D20120314%268534-table.rowStart%3D0%268534-table.rowCount%3D25</a> and analyzed his analytics', result );
			},
			
			
			// --------------------------
			
			// Sanity check: test that multiple URLs in a string are autolinked (basically making sure that we never forget the 'g' RegExp flag)
			
			"link() should automatically link multiple URLs" : function() {
				var result = Autolinker.link( 'Joe went to http://yahoo.com and http://google.com' );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com" target="_blank">yahoo.com</a> and <a href="http://google.com" target="_blank">google.com</a>', result );
			},
			
			
			// -----------------------------
			
			// Test that trailing periods are not included in the url
			
			"link() should automatically link URLs in the form of 'http://yahoo.com.', without including the trailing period" : function() {
				var result = Autolinker.link( "Joe went to http://yahoo.com." );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com" target="_blank">yahoo.com</a>.', result );
			},
			
			"link() should automatically link URLs in the form of 'www.yahoo.com.', without including the trailing period" : function() {
				var result = Autolinker.link( "Joe went to www.yahoo.com." );
				Y.Assert.areSame( 'Joe went to <a href="http://www.yahoo.com" target="_blank">yahoo.com</a>.', result );
			},
			
			"link() should automatically link URLs in the form of 'yahoo.com.', without including the trailing period" : function() {
				var result = Autolinker.link( "Joe went to yahoo.com." );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com" target="_blank">yahoo.com</a>.', result );
			},

			"link() should automatically link URLs in the form of 'http://yahoo.com/sports.', without including the trailing period" : function() {
				var result = Autolinker.link( "Joe went to http://yahoo.com/sports." );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com/sports" target="_blank">yahoo.com/sports</a>.', result );
			},


			// -----------------------------

			// Test that trailing slashes are removed

			"link() should remove trailing slash from 'http://yahoo.com/'" : function() {
				var result = Autolinker.link( "Joe went to http://yahoo.com/." );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com/" target="_blank">yahoo.com</a>.', result );
			},

			"link() should remove trailing slash from 'http://yahoo.com/sports/'" : function() {
				var result = Autolinker.link( "Joe went to http://yahoo.com/sports/." );
				Y.Assert.areSame( 'Joe went to <a href="http://yahoo.com/sports/" target="_blank">yahoo.com/sports</a>.', result );
			},


			// --------------------------
			
			// Test with email addresses
			
			"link() should automatically link an email address which is the only text in the string" : function() {
				var result = Autolinker.link( "joe@joe.com" );
				Y.Assert.areSame( '<a href="mailto:joe@joe.com" target="_blank">joe@joe.com</a>', result );
			},
			
			"link() should automatically link email addresses at the start of the string" : function() {
				var result = Autolinker.link( "joe@joe.com is Joe's email" );
				Y.Assert.areSame( '<a href="mailto:joe@joe.com" target="_blank">joe@joe.com</a> is Joe\'s email', result );
			},
			
			"link() should automatically link an email address in the middle of the string" : function() {
				var result = Autolinker.link( "Joe's email is joe@joe.com because it is" );
				Y.Assert.areSame( 'Joe\'s email is <a href="mailto:joe@joe.com" target="_blank">joe@joe.com</a> because it is', result );
			},
			
			"link() should automatically link email addresses at the end of the string" : function() {
				var result = Autolinker.link( "Joe's email is joe@joe.com" );
				Y.Assert.areSame( 'Joe\'s email is <a href="mailto:joe@joe.com" target="_blank">joe@joe.com</a>', result );
			},

			"link() should automatically link email addresses with a period in the 'local part'" : function() {
				var result = Autolinker.link( "Joe's email is joe.smith@joe.com" );
				Y.Assert.areSame( 'Joe\'s email is <a href="mailto:joe.smith@joe.com" target="_blank">joe.smith@joe.com</a>', result );
			},
			
			"link() should NOT automatically link any old word with an @ character in it" : function() {
				var result = Autolinker.link( "Hi there@stuff" );
				Y.Assert.areSame( 'Hi there@stuff', result );
			},
			
			
			// --------------------------
			
			// Test that URLs within HTML tags are not autolinked
			
			"link() should NOT automatically link URLs within HTML tags" : function() {
				var result = Autolinker.link( '<p>Joe went to <a href="http://www.yahoo.com">yahoo</a></p>' );
				Y.Assert.areSame( '<p>Joe went to <a href="http://www.yahoo.com">yahoo</a></p>', result );
			},
			
			"link() should automatically link URLs past the last HTML tag" : function() {
				var result = Autolinker.link( '<p>Joe went to <a href="http://www.yahoo.com">yahoo</a></p> and http://google.com' );
				Y.Assert.areSame( '<p>Joe went to <a href="http://www.yahoo.com">yahoo</a></p> and <a href="http://google.com" target="_blank">google.com</a>', result );
			},
			
			"link() should NOT automatically link a URL found within the inner text of a pre-existing anchor tag" : function() {
				var result = Autolinker.link( '<p>Joe went to <a href="http://www.yahoo.com">yahoo.com</a></p> yesterday.' );
				Y.Assert.areSame( '<p>Joe went to <a href="http://www.yahoo.com">yahoo.com</a></p> yesterday.', result );
			},
			
			"link() should NOT automatically link a URL found within the inner text of a pre-existing anchor tag, but link others" : function() {
				var result = Autolinker.link( '<p>Joe went to google.com, <a href="http://www.yahoo.com">yahoo.com</a>, and weather.com</p> yesterday.' );
				Y.Assert.areSame( '<p>Joe went to <a href="http://google.com" target="_blank">google.com</a>, <a href="http://www.yahoo.com">yahoo.com</a>, and <a href="http://weather.com" target="_blank">weather.com</a></p> yesterday.', result );
			},
			
			"link() should NOT automatically link an image tag with a URL inside it, inside an anchor tag" : function() {
				var result = Autolinker.link( '<a href="http://google.com"><img src="http://google.com/someImage.jpg" /></a>' );
				Y.Assert.areSame( '<a href="http://google.com"><img src="http://google.com/someImage.jpg" /></a>', result );
			},
			
			"link() should NOT automatically link an image tag with a URL inside it, inside an anchor tag, but match urls around the tags" : function() {
				var result = Autolinker.link( 'google.com looks like <a href="http://google.com"><img src="http://google.com/someImage.jpg" /></a> (at google.com)' );
				Y.Assert.areSame( '<a href="http://google.com" target="_blank">google.com</a> looks like <a href="http://google.com"><img src="http://google.com/someImage.jpg" /></a> (at <a href="http://google.com" target="_blank">google.com</a>)', result );
			},
			
			
			// --------------------------
			
			// Test the 'newWindow' option
			
			"link() should not add target=\"_blank\" when the 'newWindow' option is set to false" : function() {
				var result = Autolinker.link( "Test http://url.com", { newWindow: false } );
				Y.Assert.areSame( 'Test <a href="http://url.com">url.com</a>', result );
			},


			// --------------------------
			
			// Test the 'stripPrefix' option
			
			"link() should not remove the prefix for non-http protocols" : function() {
				var result = Autolinker.link( "Test file://execute-virus.com" );
				Y.Assert.areSame( 'Test <a href="file://execute-virus.com" target="_blank">file://execute-virus.com</a>', result );
			},

			"link() should not remove 'http://www.' when the 'stripPrefix' option is set to false" : function() {
				var result = Autolinker.link( "Test http://www.url.com", { stripPrefix: false } );
				Y.Assert.areSame( 'Test <a href="http://www.url.com" target="_blank">http://www.url.com</a>', result );
			},

			
			// --------------------------
			
			// Test the 'truncate' option
			
			"link() should truncate long a url/email/twitter to the given number of characters with the 'truncate' option specified" : function() {
				var result = Autolinker.link( "Test http://url.com/with/path", { truncate: 12 } );
				Y.Assert.areSame( 'Test <a href="http://url.com/with/path" target="_blank">url.com/wi..</a>', result );
			},
			
			"link() should leave a url/email/twitter alone if the length of the url is exactly equal to the length of the 'truncate' option" : function() {	
				var result = Autolinker.link( "Test http://url.com/with/path", { truncate: 'url.com/with/path'.length } );  // the exact length of the link
				Y.Assert.areSame( 'Test <a href="http://url.com/with/path" target="_blank">url.com/with/path</a>', result );
			},
			
			"link() should leave a url/email/twitter alone if it does not exceed the given number of characters provided in the 'truncate' option" : function() {
				var result = Autolinker.link( "Test http://url.com/with/path", { truncate: 25 } );  // just a random high number
				Y.Assert.areSame( 'Test <a href="http://url.com/with/path" target="_blank">url.com/with/path</a>', result );
			},

            "link() should support for custom callbacks" : function() {
				var result = Autolinker.link( "Test http://url.com/with/path", {
                    truncate: 25,
                    callback: function(anchorAttributes, anchorHref, anchorText) {
                        return '[<a ' + anchorAttributes.join( " " ) + '>' + anchorText + '</a>]'
                    }
                });
				Y.Assert.areSame( 'Test [<a href="http://url.com/with/path" target="_blank">url.com/with/path</a>]', result );
			}
		}
	]
	
} ) );