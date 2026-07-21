/**
 *
 * @description ListProduct000
 *
 * @version 2026/07/16 ace 初始版本。
 *
 */

class ListProduct000 extends HTMLElement {

	constructor() {
	
		super()
		
		console.log('list-product-000 constructor()');
		
		this.attachShadow({"mode": "open"});
		
    this.shadowRoot.innerHTML = `
		
			<style type="text/css">
			
				*, *:before, *:after {
				
					box-sizing: border-box;
				}
				
				html, :host {
				
					display: block;
				
					/* width: 100%; */
					/* height: 100%; */
					
					/* font-family: "DFKai-SB"; */
				}
				
				.base {
				
					height: 100%;
				}
				
				.block-bottom {

					/* -webkit-appearance: none; */
					
					width: 100%;
					
					/* position: fixed; */
					/* position: sticky; */
					position: sticky;
					bottom: 30px;
					
					/* margin-bottom: 20px; */
					/* margin: auto; */
					
					z-index: 99;
					
					/* cursor: pointer; */
					
					/* transform: translate3d(0, 0, 0); */
					/* transform: translateZ(0); */ /* 啟用硬體加速解決錯位 */
				}
			</style>

			<div class="base"></div>
			
			<block-bottom-000 class="block-bottom"></block-bottom-000>
    `;
	}
	
	connectedCallback() {
	
		// var that = this;
	
		console.log('list-product-000 connectedCallback()');
		
		// console.log(that.getAttribute('subdep'));
		// console.log(that["subdep"]);
	}
	
	static get properties() {
	
		return {
		
			"subdep": [
			
				{
					"pNoS": "030101",
					"productName": "漢堡包",
					"pathImage": "image/subdep/030101.JPG"
				},
				{
					"pNoS": "030102",
					"productName": "漢堡包",
					"pathImage": "image/subdep/030102.JPG"
				},
				{
					"pNoS": "030103",
					"productName": "漢堡包",
					"pathImage": "image/subdep/030103.JPG"
				},
				{
					"pNoS": "030104",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				},
				{
					"pNoS": "030105",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				},
				{
					"pNoS": "030106",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				},
				{
					"pNoS": "030107",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				},
				{
					"pNoS": "030108",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				},
				{
					"pNoS": "030109",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				},
				{
					"pNoS": "030110",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				},
				{
					"pNoS": "030111",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				},
				{
					"pNoS": "030112",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				},
				{
					"pNoS": "030113",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				},
				{
					"pNoS": "030114",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				},
				{
					"pNoS": "030115",
					"productName": "漢堡包",
					"pathImage": "icon/DEFAULT.PNG"
				}
			]
		}
	}
	
	// which attributes to watch
	static get observedAttributes() {
	
    return ["subdep"];
  }
	
	attributeChangedCallback(name, oldValue, newValue) {
	
		var that = this;
	
		// console.log(that["properties"]);	// null
		
		console.log('name: ' + name);
		
    if ((name == 'subdep') && (oldValue !== newValue)) {
		
			// console.log(oldValue);
			// console.log(newValue);
			
			// console.log(that["subdep"]);
			
			// @todo 2026/07/19 ace 清除原先的內容？
			that.shadowRoot.querySelector('.base').innerHTML = '';
		
			JSON.parse(newValue).forEach(function(element) {
			
				var testComponent = document.createElement('test-component-004');
			
				// console.log(element);
				
				testComponent.setAttribute('product-code', element["pNoS"]);
				testComponent.setAttribute('product-name', element["productName"]);
				testComponent.setAttribute('path-image-subdep', element["pathImage"]);
				
				// testComponent.addEventListener('click', function(event) {alert(element["productName"]);});
				testComponent.addEventListener('click', function(event) {alert(element["pNoS"]);});
			
				that.shadowRoot.querySelector('.base').appendChild(testComponent);
			});
    }
  }
	
	get subdep() {return this.getAttribute('subdep');}
	set subdep(value) {this.setAttribute('subdep', value);}
	
	set productCode(value) {this.setAttribute('productCode', value);}
}

customElements.define('list-product-000', ListProduct000);