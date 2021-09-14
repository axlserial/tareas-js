import EditTarea from './edit-tarea.js';
//import View from '../view.js';

export default class Modal {
	constructor(selector){	// selector == id del modal
		this.elem = document.querySelector(selector);
		this.title = this.elem.querySelector('#titulo-modal');
		this.descr = this.elem.querySelector('#desc-modal');
		this.check = this.elem.querySelector('#check-modal');
		this.tarea = null;
		this.view = null;

		this.editTarea = new EditTarea();
		this.editTarea.onClick((titulo, desc, comp) => this.guardaValores(titulo, desc, comp));		

		this.close_data();
	}
	
	show() {
		this.elem.classList.toggle('is-active');
		this.on_show();
	}
	
	close() {
		this.elem.classList.toggle('is-active');
		this.on_close();
	}
	
	close_data() {
		let modalClose = this.elem.querySelectorAll("[data-bulma-modal='close'], .modal-background");
		let that = this;
		modalClose.forEach(function(e) {
			e.addEventListener("click", function() {
				that.elem.classList.toggle('is-active');
				let event = new Event('modal:close');
				that.elem.dispatchEvent(event);
			});
		});
	}

	setValues(tarea){
		this.tarea = tarea;
		this.title.value = tarea.titulo;
		this.descr.value = tarea.desc;
		this.check.checked = tarea.completa;
	}

	guardaValores(titulo, desc, completa){
		this.view.editarTarea({
			id: this.tarea.id,
			titulo,
			desc,
			fecha: this.tarea.fecha,
			completa
		});
		this.close();
	}
	
	on_show() {
		let event = new Event('modal:show');
		this.elem.dispatchEvent(event);
	}
	
	on_close() {
		let event = new Event('modal:close');
		this.elem.dispatchEvent(event);
	}

	setView(view){
		this.view = view;
	}

	// addEventListener(event, callback) {
	// 	this.elem.addEventListener(event, callback);
	// }
}