window.addEventListener("load", cargar);
var contador = 0;
var contenedor = document.getElementById("contenedor");
var span = document.getElementById("span");
var boton = document.getElementById("boton");
var textoLista = document.getElementById("textoLista");t 
var contenedorLista = document.getElementById("contenedorLista");


function cargar() {
	span.addEventListener("click", añadirLista);
	boton.addEventListener("click", verSpan);
	boton.addEventListener("click", nuevaLista);
}

function verSpan(e) {
	e.preventDefault();
	contenedorLista.classList.add("none");
}

function añadirLista(e) {
	e.preventDefault();
	span.classList.add("ocultar");
	form.classList.add("inline");
	contenedorLista.classList.add("inline");
}

function nuevaLista(e) {
	e.preventDefault();
	var contenedorLista = document.createElement("div");
	contenedorLista.setAttribute("id","outer-dropzone");
	var spanLista = document.createElement("span");

	if (textoLista.value === "") {
		return false;
	}

	textoLista.focus();

	spanLista.textContent = textoLista.value;
	spanLista.classList.add("spanLista");

	contenedorLista.classList.add("contenedorLista");
	spanLista.contentEditable = true;

	contenedorLista.appendChild(spanLista);
	contenedor.insertBefore(contenedorLista, span.previousSibling);
	textoLista.value = "";

	var nuevaTarjeta = document.createElement("a");
	nuevaTarjeta.href = "#";

	var textoAñadir = document.createTextNode("Añadir una tarea ...");

	nuevaTarjeta.appendChild(textoAñadir);

	contenedorLista.appendChild(nuevaTarjeta);

	nuevaTarjeta.classList.add("enlaceTarjeta");

	nuevaTarjeta.addEventListener("click", añadirTarjeta);
	contenedorLista.addEventListener("drop", soltar);
	contenedorLista.addEventListener("dragover", arrastarSobre);
	contenedorLista.addEventListener("dragend", dragend);
}

function eliminar(e) {
	e.preventDefault();
	var formulario = this.parentElement;
	formulario.parentElement.removeChild(formulario);
}

function añadirTarjeta(e) {
	e.preventDefault();
	this.style.display = "none";
	var form = document.createElement("form");
	var textArea = document.createElement("textarea");
	textArea.classList.add("txtLista");
	var nuevoBoton = document.createElement("button");
	var textoBoton = document.createTextNode("Añadir");
	var iconoEliminar = document.createElement("a");
	iconoEliminar.classList.add("fa", "fa-times", "eliminar");
	iconoEliminar.addEventListener("click", eliminar);
	nuevoBoton.classList.add("botonAdd");
	nuevoBoton.appendChild(textoBoton);

	form.appendChild(textArea);
	form.appendChild(nuevoBoton);
	form.appendChild(iconoEliminar);

	this.parentElement.insertBefore(form, this.nextSibling);
	nuevoBoton.addEventListener("click", nuevaTarjeta);
}

function nuevaTarjeta(e) {
	e.preventDefault();
	this.parentElement.style.display = "none";
	this.parentElement.previousSibling.style.display = "block";
	var txtTarjeta = document.createElement("textarea");
	txtTarjeta.classList.add("txtTarjeta" ,  "draggable");
	txtTarjeta.setAttribute("id","yes-drop");
	
	txtTarjeta.textContent = this.previousSibling.value;
	this.parentElement.parentElement.insertBefore(txtTarjeta, this.parentElement.previousSibling);

	// Arrastrando TextArea de la Tarjeta
	txtTarjeta.draggable = "true";
	txtTarjeta.id = "id" + contador;
	contador++;
	txtTarjeta.addEventListener("dragstart", empiezaArrastrar);
	txtTarjeta.addEventListener("dragenter", entraArrastrar);
	txtTarjeta.addEventListener("dragleave", dejaArrastrar);
}

function empiezaArrastrar(e) {
	e.dataTransfer.setData("text", this.id);
	this.classList.add("animated", "swing");

}

function soltar(e) {
	var elementoArrastrado = document.getElementById(e.dataTransfer.getData("text"));
	this.insertBefore(elementoArrastrado, this.children[1]);
	this.classList.remove("color");
	this.classList.remove("animated", "shake");


}

function entraArrastrar(e) {
	e.preventDefault();
	this.parentElement.classList.add("color");
}

function dejaArrastrar(e) {
	e.preventDefault();
	this.parentElement.classList.remove("color");
}

function arrastarSobre(e) {
	e.preventDefault();
}

function dragend(e) {
	this.classList.add("animated", "shake");
}