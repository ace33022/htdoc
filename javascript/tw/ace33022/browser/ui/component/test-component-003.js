/**
 *
 * @description TestComponent003
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
class TestComponent003 extends HTMLElement {

	constructor() {
	
		super()
		
		console.log('constructor()');
	}
	
	connectedCallback() {
	
		console.log('connectedCallback()');
		
		let template = document.createElement('template');
		
		template.innerHTML = `
		
			<style type="text/css">
			
				*, *:before, *:after {
				
					box-sizing: border-box;
				}
				
				html, :host {
				
					width: 100%;
					
					font-family: "華康細明體", "DFKai-SB";
				}
				
				input, label {
				
					outline-width: 0;
				}
				
				h3.title, span.title {

					font-size: 22px;
					font-weight: 400;
					line-height: 30px;
					
					letter-spacing: 0.1rem;
					
					margin-top: 0;
					margin-bottom: 14px;
				}
				
				.container {
				
					width: 100%;
					
					display: flex;
					position: relative;
					justify-content: space-between;
					
					/* margin-bottom: 41px; */
					/* margin-bottom: 10px; */
				}
				
				.container .title, .container .p {

					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				
				.container .left {
				
					display: flex;
					flex-direction: column;
				}

				.container .right {
				
					position: relative;
					align-self: center;
					
					margin-left: 1.2rem;
				}

				.container .right .img {
				
					width: 100px;
					height: 100px;
					
					text-align: center;
					margin-left: auto;
					
					object-fit: cover;
				}

				/*
				.container .right .img  {

					-o-object-fit: cover;
						 object-fit: cover;
				}
				*/

				.badge-wrap {
				
					display: flex;
					align-items: center;
					flex-wrap: wrap;
				}

				.badge-wrap .badge {

					color: black;
					
					font-size: 14px;
					font-weight: 400;
					line-height: 20px;
					letter-spacing: 0.1rem;
					
					margin-bottom: 14px;
					margin-right: 0.5rem;

					display: flex;
					align-items: center;
					
					width: -webkit-fit-content;
					width: -moz-fit-content;
					width: fit-content;
				}

				.badge-wrap .badge img {

					min-width: 20px;
					min-height: 20px;
					margin-right: 3px;
				}

				.badge-wrap .badge.good {

					color: white;
					background-color: #C2141C;
					
					padding: 3px 10px;
					border-radius: 50px;
				}

				.badge-wrap .badge.good img {

					min-width: 16px;
					min-height: 16px;
				}

				.badge-wrap .badge.warning {

					color: #E3B100;
				}
			</style>

			<div class="container">
			
				<div class="left">
				
					<h3 class="title">鐵板麵</h3>
					
					<div class="p">好滋味！</div>
					
					<!--
					<div class="badge-wrap">
					
						<span class="badge good" style="[[_isRecommendStyle()]]">[[message00101]]</span>
						<span class="badge good" style="[[_isBuyableStyle()]]">[[message00102]]</span>
					</div>
					-->
				</div>
				
				<div class="right">
				
					<img class="img" src="image/subdep/030102.JPG">
				</div>
			</div>
		`;
		
		this.attachShadow({"mode": "open"}).appendChild(template.content.cloneNode(true));
	}
}

customElements.define('test-component-003', TestComponent003);