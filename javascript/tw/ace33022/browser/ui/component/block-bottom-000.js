/**
 *
 * @description BlockBottom000
 *
 * @version 2026/07/16 ace 初始版本。
 *
 */

class BlockBottom000 extends HTMLElement {

	constructor() {
	
		super()
		
		console.log('block-bottom-000 constructor()');
		
		this.attachShadow({"mode": "open"});
		
    this.shadowRoot.innerHTML = `
		
			<style type="text/css">
			
				*, *:before, *:after {
				
					box-sizing: border-box;
				}
				
				html, :host {
				
					display: block;
				}
				
				.base {
				
					width: 100%;
					
					/* margin: auto; */
					
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					align-items: center;
				}
				
				.cancel-back {

					width: 100%;

					font-size: 1.15rem;
					letter-spacing: 1.5px;
					
					text-align: center;
					
					color: #fff;
					background: #E6C3C3;
					
					padding: 1rem;
					margin: 1rem;
					
					border-radius: 48px;
				}
				
				.cancel-back:active {
				
					background: #E6C3E3;
				}

				.add-to-cart {

					width: 100%;

					font-size: 1.15rem;
					letter-spacing: 1.5px;
					
					text-align: center;
					
					color: #fff;
					background: #811c22;
					
					padding: 1rem;
					margin: 1rem;
					
					border-radius: 48px;
				}
				
				.add-to-cart:active {
				
					background: #E6C3C3;
				}
			</style>

			<div class="base">
			
				<input type="button" class="cancel-back" value="取消">
				<input type="button" class="add-to-cart" value="確認">
			</div>
    `;
	}
	
	connectedCallback() {
	
		var that = this;
	
		console.log('block-bottom-000 connectedCallback()');
		
		that.shadowRoot.querySelector('.cancel-back').addEventListener('click', function(event) {alert('cancel');});
		that.shadowRoot.querySelector('.add-to-cart').addEventListener('click', function(event) {alert('confirm');});
	}
}

customElements.define('block-bottom-000', BlockBottom000);