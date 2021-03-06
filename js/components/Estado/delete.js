
const template = document.createElement('template');

template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }

    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;

      width: 65px;
      height: 30px;

      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #EC5C5C;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
    }
  </style>

  <div class="container">
    <button>Label</button>
  </div>
`;

class ButtonDel extends HTMLElement {
    
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', () => {
        
        userDelete(this.valueid);
        
        
    });
  }
  get label() {
    return this.getAttribute('label');
  }
  get valueid(){
    return this.getAttribute('valueid');
  }
  set valueid(value){
    this.setAttribute('valueid', value);    
  }
  set label(value) {
    this.setAttribute('label', value);
  }
  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }
  render() {
    this.$button.innerHTML = this.label;
  }
}

window.customElements.define('my-button-del', ButtonDel);
// modificar para nuestra api con respecto a los campos a enviar
import {loadTable} from './mainForm.js';
function userDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:8080/bachestpi2022/resources/estado/"+id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if ((this.status >= 200 && this.status<300) ){
        //const objects = JSON.parse(this.responseText);
       
        loadTable();
        Swal.fire("eliminado");
        
      }  else{
        Swal.fire("El Estado que desea eliminar esta ligado a la tabla de objeto estado");
      }
    };
  }
 