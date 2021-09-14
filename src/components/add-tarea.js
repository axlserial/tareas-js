import Alerta from './alerta.js';

export default class AddTarea {
	constructor(){
		this.titulo = document.getElementById('titulo');
		this.desc = document.getElementById('descripcion');
		this.btn = document.getElementById('enter');
		this.alerta = new Alerta('error-enter');
	}
	
	onClick(callback){
		this.btn.onclick = () => {
			if (this.titulo.value === '' || this.desc === ''){
				this.alerta.show('No puedes dejar algún campo vacío');
			} else {
				this.alerta.hide();
				callback(this.titulo.value, this.desc.value);
				this.titulo.value = '';
				this.desc.value = '';
			}
		};
	}
}