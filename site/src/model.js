import Fecha from './components/fecha.js';

export default class Model {
	constructor(){
		this.fecha = new Fecha();
		this.view = null;

		this.tareas = JSON.parse(localStorage.getItem('tareas'));

		if (!this.tareas || this.tareas.length < 1){
			this.tareas = [{
				id: 0,
				titulo: 'Bienvenido',
				desc: 'Aprende JS',
				fecha: `${this.fecha.generaHoraActual()} - ${this.fecha.generaFechaActual()}`,
				completa: false
			}];

			this.currentId = 1;
		} else {
			this.currentId = this.tareas[this.tareas.length - 1].id + 1;
		}
	}

	setView(view){
		this.view = view;
	}

	agregaTareas(titulo, desc){
		const tarea = {
			id: this.currentId++,
			titulo,
			desc,
			fecha: `${this.fecha.generaHoraActual()} - ${this.fecha.generaFechaActual()}`,
			completa: false
		};

		this.tareas.push(tarea);
		this.guardar();

		return {...tarea};
	}

	checkTarea(id){
		const index = this.tareas.findIndex(tarea => tarea.id === id);
		this.tareas[index].completa = !this.tareas[index].completa;
		this.guardar();
		return this.tareas[index].completa;
	}

	borraTarea(id){
		const index = this.tareas.findIndex(tarea => tarea.id === id);
		this.tareas.splice(index, 1);
		this.guardar();
	}

	editarTarea(tarea){
		const index = this.tareas.findIndex(t => t.id === tarea.id);
		this.tareas[index].titulo = tarea.titulo;
		this.tareas[index].desc = tarea.desc;
		this.tareas[index].completa = tarea.completa;
		this.guardar();
	}

	getTarea(id){
		return {...this.tareas.find((tarea) => tarea.id === id)};
	}

	getTareas(){
		return this.tareas.map((tarea) => ({...tarea}));
	}

	guardar(){
		localStorage.setItem('tareas', JSON.stringify(this.tareas));
	}
}