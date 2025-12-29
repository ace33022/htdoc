/**
 *
 * @description MyButton
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

class MyButton extends HTMLElement {

  constructor() {
	
    super();
		
    // 創建 this 內部的 shadow root
    const shadowRoot = this.attachShadow({
		
      mode: true
    });
		
    // 將所有對this的動作轉為對shadow root進行。
    shadowRoot.innerHTML = '<button>按鈕</button>';
  }
}

customElements.define('my-button', MyButton);