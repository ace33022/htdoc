/**
 *
 * Web Service Model
 *
 * @version 2016/12/04 初始版本。
 *
 * @author ace
 *
 * @see <a href="http://underscorejs.org/">Underscore.js</a>
 * @see <a href="http://backbonejs.org/">Backbone.js</a>
 *
 */

(function(root) {

  if (typeof define === 'function') {

    define(["backbone"], function() {

			return root.Backbone.Model.extend({
			
				"constructor": function(attributes, options) {Backbone.Model.apply(this, arguments);},
				"initialize": function() {
				
					this.on('error', function(errorValue) { console.log(errorValue); });
				},
				"sync": function(method, model, options) {
				
					options || (options = {});
					
					options.url = this.getRESTUrl(method.toLowerCase());

					// Lets notify backbone to use our URLs and do follow default course
					return Backbone.sync.apply(this, arguments);
				},
				"parse": function(response, options) {

					// console.log(response);
					// console.log(options);

					if (options["xhr"]["status"] === 200) {
					
						// return response["result"][0];
						return options["xhr"]["responseJSON"];
					}
					else {
					
						this.trigger('error', response);
					}
				}
			});
		});
	}
})(this);