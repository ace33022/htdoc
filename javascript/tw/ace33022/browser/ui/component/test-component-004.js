/**
 *
 * @description TestComponent004
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
class TestComponent004 extends HTMLElement {

	constructor() {
	
		super()
		
		// console.log('constructor()');
		
		this.attachShadow({"mode": "open"});
		
    this.shadowRoot.innerHTML = `
		
			<style type="text/css">
			
				*, *:before, *:after {
				
					box-sizing: border-box;
				}
				
				html, :host {
				
					width: 100%;
					
					font-family: "DFKai-SB";
				}
				
				.base {
				
					width: 100%;
					
					/* position: relative; */
					
					display: flex;
					justify-content: space-between;
					
					padding: 5px;
					
					/* margin: 5px; */
					
					/* margin-bottom: 41px; */
					/* margin-bottom: 10px; */
				}
				
				/*
				.base .left {
				
					display: flex;
					flex-direction: column;
				}
				*/

				/*
				.base .right {
				
					position: relative;
					align-self: center;
					
					margin-left: 1.2rem;
				}
				*/
				
				.right {
				
					display: flex;
					align-items: center;
				}
				
				.title, .description {

					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					
					display: -webkit-box;
					overflow: hidden;
					
					padding: 5px;
				}
				
				.title {

					font-size: 24px;
					font-weight: 400;
					line-height: 30px;
					
					letter-spacing: 0.1rem;
				}
				
				.badge-wrap {
				
					display: flex;
					align-items: center;
					flex-wrap: wrap;
				}

				.badge {

					width: -webkit-fit-content;
					width: -moz-fit-content;
					width: fit-content;
					
					color: black;
					
					font-size: 14px;
					font-weight: 400;
					line-height: 20px;
					letter-spacing: 0.1rem;
					
					/* margin-bottom: 14px; */
					margin-right: 0.5rem;
				}

				.badge.good {

					color: white;
					background-color: #C2141C;
					
					border-radius: 50px;
					
					/* padding: 3px 10px; */
					padding: 5px 10px;
				}

				.subdep-image {
				
					width: 100px;
					height: 100px;
					
					/* text-align: center; */
					/* margin-left: auto; */
					
					object-fit: cover;
				}

				/*
				.subdep-image {

					-o-object-fit: cover;
						 object-fit: cover;
				}
				*/
			</style>

			<span class="base">
			
				<span class="left">
				
					<div class="title">鐵板麵</div>
					
					<div class="description">好滋味！太蝦了吧！台灣人真的天天來？｜韓國啦啦隊無法理解的釣蝦樂趣</div>
					
					<div class="badge-wrap">
					
						<span class="badge good">推薦</span>
						<span class="badge good"">熱賣</span>
					</div>
				</span>
				
				<span class="right">
				
					<img class="subdep-image">
				</span>
			</span>
    `;
	}
	
	connectedCallback() {
	
		// console.log('connectedCallback()');
		
		// console.log(this.shadowRoot.querySelector('div img'));
		// this.shadowRoot.querySelector('div img').src = this.pathImageSubdep;
		this.shadowRoot.querySelector('.title').innerText = this["productName"];
		this.shadowRoot.querySelector('.subdep-image').src = this["pathImageSubdep"];
	}
	
	set productName(value) {return this.setAttribute('product-name', value);}
	set pathImageSubdep(value) {return this.setAttribute('path-image-subdep', value);}
	
	get productName() {return this.getAttribute('product-name');}
	get pathImageSubdep() {return this.getAttribute('path-image-subdep');}
}

customElements.define('test-component-004', TestComponent004);