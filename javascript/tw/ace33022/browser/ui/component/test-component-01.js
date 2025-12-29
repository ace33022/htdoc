/**
 *
 * @description TestComponent01
 *
 * @version 2025/12/23 ace 初始版本。
 *
 * @author ace
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web|Web technology for developers | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API|Web APIs | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Events|Event reference | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript|JavaScript | MDN}
 *
 * @see {@link http://requirejs.org/|RequireJS}
 *
 * @see {@link https://jquery.com/|jQuery}
 *
 * @see {@link https://api.jquery.com/|jQuery API Documentation}
 * @see {@link https://api.jquery.com/addclass/|.addClass() | jQuery API Documentation}
 * @see {@link https://api.jquery.com/removeclass/|.removeClass() | jQuery API Documentation}
 *
 * @see {@link https://getbootstrap.com/|Bootstrap · The most popular HTML, CSS, and JS library in the world.}
 *
 * @see {@link http://underscorejs.org/|Underscore.js}
 * @see {@link https://github.com/jashkenas/underscore|jashkenas/underscore: JavaScript's utility _ belt}
 *
 * @see {@link http://backbonejs.org/|Backbone.js}
 * @see {@link https://github.com/jashkenas/backbone|jashkenas/backbone: Give your JS App some Backbone with Models, Views, Collections, and Events}
 * @see {@link https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites|Tutorials, blog posts and example sites · jashkenas/backbone Wiki}
 *
 * @see {@link https://fontawesome.com/|Font Awesome}
 *
 */
class TestComponent01 extends HTMLElement {

	constructor() {
	
		super()
		
		let template = document.createElement('template');
		
		template.innerHTML = `
		
			<style>
			
				div {
			
					font-size: 24px;
					
					color: red;
				}
			</style>
			
			<div>
				<span>使用template</span>
			</div>
		`;
		
		// let shadow = this.attachShadow({mode: 'open'});
		// shadow.appendChild(template.content.cloneNode(true));
		
		this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
	}
}

customElements.define('test-component-01', TestComponent01);