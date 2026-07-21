// import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

// import '@polymer/polymer/lib/elements/dom-repeat';
// import '@polymer/polymer/lib/elements/dom-if.js';

/**
 *
 * @description ModalMessage002
 *
 * @version 2026/03/17 cody 初始版本。
 *
 * @memo 2026/03/17 cody 沒有關閉按鈕的訊息顯示，必須在上層自行撰寫移除此標籤元件的程式碼。
 *
 * @author cody
 *
 */
// class ModalMessage002 extends PolymerElement {
class ModalMessage002 extends HTMLElement {

	constructor() {
	
		super();
		
		let template = document.createElement('template');
		
		console.log('constructor().');
		
		// console.log(this.shadowRoot);	// null
		
		template.innerHTML = `

			<style type="text/css">
			
				* {
				
					font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
					
					box-sizing: border-box;
				}

				body {
				
					margin: 0;
				}

				@keyframes successPop {

					to {
					
						transform: translate(-50%, -50%) scale(1);
					}
				}

				.mask {

					background: rgba(0, 0, 0, 0.35);
					
					z-index: 999;
					
					position: fixed;
					inset: 0;
					
					display: block;
				}
				
				.modal {
				
					background: #ffffff;
					
					width: calc(100% - 64px);
					max-width: 320px;
					
					top: 50%;
					left: 50%;
					
					text-align: center;
					
					padding: 30px 22px 28px;
					
					z-index: 1000;
					
					position: fixed;
					
					display: block;
					
					border-radius: 22px;
					box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
					
					transform: translate(-50%, -50%) scale(0.95);
					animation: successPop 0.3s ease forwards;
				}

				.icon {
				
					color: #6b5a2b;
					
					font-size: 34px;
					font-weight: 700;
					
					width: 64px;
					height: 64px;
					
					margin: 0 auto 16px;
					
					border-radius: 50%;
					background: linear-gradient(135deg, #f6ecd2, #e8d7a6);
					
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.title {
				
					font-size: 20px;
					font-weight: 700;
					letter-spacing: 4px;
					
					margin-bottom: 10px;
				}

				.message {
				
					color: #6f6f6f;
					
					font-size: 14px;
					line-height: 1.8;
				}
				
				.button-group {
				
					display: flex;
					align-items: center;
					justify-content: space-around;
				}
				
				.button-group input[type="button"] {
				
					font-size: 2rem;
				
					border-radius: 10%;
					border-color: darkgray;
					
					margin-top: 10px;
				}
			</style>
			
			<!-- 遮罩 -->
			<div class="mask"></div>

			<div class="modal">

				<div class="icon">✓</div>
				
				<div class="title">[[title]]</div>
				
				<template is="dom-repeat" items="[[description]]">
					<div class="message">[[item.content]]</div>
				</template>
				
				<span class="button-group">
				
					<input type="button" value="取消">
					<input type="button" value="確認">
				</span>
			</div>
		`;
		
		this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
	}	

	connectedCallback() {
	
		// super.connectedCallback();
		
		console.log('connectedCallback().');
		
		console.log(this.shadowRoot);
	}

	// vaadin update function
	afterServerUpdate() {
	
		console.log("afterServerUpdate().");
  }
	
	static get template() {
	
		return html
			`
				<style type="text/css">
				
					* {
					
						font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
						
						box-sizing: border-box;
					}

					body {
					
						margin: 0;
					}

					@keyframes successPop {

						to {
						
							transform: translate(-50%, -50%) scale(1);
						}
					}

					.mask {

						background: rgba(0, 0, 0, 0.35);
						
						z-index: 999;
						
						position: fixed;
						inset: 0;
						
						display: block;
					}
					
					.modal {
					
						background: #ffffff;
						
						width: calc(100% - 64px);
						max-width: 320px;
						
						top: 50%;
						left: 50%;
						
						text-align: center;
						
						padding: 30px 22px 28px;
						
						z-index: 1000;
						
						position: fixed;
						
						display: block;
						
						border-radius: 22px;
						box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
						
						transform: translate(-50%, -50%) scale(0.95);
						animation: successPop 0.3s ease forwards;
					}

					.icon {
					
						color: #6b5a2b;
						
						font-size: 34px;
						font-weight: 700;
						
						width: 64px;
						height: 64px;
						
						margin: 0 auto 16px;
						
						border-radius: 50%;
						background: linear-gradient(135deg, #f6ecd2, #e8d7a6);
						
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.title {
					
						font-size: 20px;
						font-weight: 700;
						letter-spacing: 4px;
						
						margin-bottom: 10px;
					}

					.message {
					
						color: #6f6f6f;
						
						font-size: 14px;
						line-height: 1.8;
					}
					
					.button-group {
					
						display: flex;
						align-items: center;
						justify-content: space-around;
					}
					
					.button-group input[type="button"] {
					
						font-size: 2rem;
					
						border-radius: 10%;
						border-color: darkgray;
						
						margin-top: 10px;
					}
				</style>
				
				<!-- 遮罩 -->
				<div class="mask"></div>

				<div class="modal">

					<div class="icon">✓</div>
					
					<div class="title">[[title]]</div>
					
					<template is="dom-repeat" items="[[description]]">
						<div class="message">[[item.content]]</div>
					</template>
					
					<span class="button-group">
					
						<input type="button" value="取消">
						<input type="button" value="確認">
					</span>
				</div>
			`;
	}

	// @memo 2024/10/18 cody Polymer屬性資料預設會轉成有減號的命名格式，即使properties設定屬性名稱為wfNo，在標籤的屬性名稱會轉換為wf-no？
	// @memo 2025/03/04 cody reflectToAttribute屬性設定成true，才會將設定值反應在標籤的Attribute上，也才能觸發attributeChangedCallback()函數。
	static get properties() {
	
    return {
		
			"title": {
			
				"type": String,
				"value": "驗證完成"
			},
			"description": {
			
				"type": Array,
				"value": () => {
				
					return [
					
						{"content": "手機驗證成功"},
						{"content": "歡迎使用尊榮會員服務"}
					];
				}
			}
    };
  }
	
	static get is() {return 'modal-message-002';}
}

customElements.define('modal-message-002', ModalMessage002);
// customElements.define(ModalMessage002.is, ModalMessage002);
