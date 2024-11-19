document.getElementById('generate-pdf').addEventListener('click', () => {
  
    let htmlContent = `
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
            color: #34495e;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo {
            max-width: 300px;
            display: block;
            margin: 0 auto;
        }
        h2 {
            color: #2c3e50;
            font-size: 22px;
        }
        h3 {
            color: #2980b9;
            font-size: 18px;
            margin-bottom: 10px;
        }
        .summary {
            text-align: left;
            margin: 20px;
            font-size: 16px;
            line-height: 1.6;
        }
        table {
            width: 90%;
            margin: 20px auto;
            border-collapse: collapse;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ccc;
        }
        th {
            background-color: #009a76;
            color: #fff;
        }
        td {
            background-color: #ecf0f1;
        }
        .terms {
            margin: 20px;
            font-size: 14px;
            color: #7f8c8d;
            line-height: 1.4;
        }
        .tramite{
        padding: 10px;
        }
    </style>

    <div class="header">
        <img src="../imagenes/unlam.png" alt="Universidad Logo" class="logo">
        <h3>Comprobante de Inscripción a Materias</h3>
    </div>

    <div class="summary">
        <p>Alumno: <strong>XXX XXX XXXX</strong>, DNI: <strong>34673412</strong></p>
        <p>Inscripción realizada para el <strong>2do Cuatrimestre del Año Académico 2024</strong>.</p>
    </div>

    <!-- Tabla de materias -->
    <table>
        <thead>
            <tr>
                <th>Materia</th>
                <th>Comision</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            ${seleccionadas.map(item => {
                const [materia, horario] = item.split(' - ');
                return `
                    <tr>
                        <td><strong>${materia}</strong></td>
                        <td>${horario}</td>
                        <td>Habilitado</td>
                    </tr>
                `;
            }).join('')}
        </tbody>
    </table>
      <div class="summary">      
    <p><strong class="">Nro de trámite:</strong> 4456763234</p>
      </div>
   
    <div class="terms">
        <h3>Términos y Condiciones:</h3>
        <ul>
            <li>La inscripción debe verificarse por Intraconsulta según el calendario académico.</li>
            <li>Solo se podrán modificar materias que figuren como "CURSO CERRADO".</li>
            <li>La inscripción se confirma únicamente si aparecen aulas y comisiones asignadas.</li>
            <li>No se permite inscribirse a materias superpuestas en días/horarios.</li>
            <li>La inscripción no garantiza la condición de alumno regular.</li>
        </ul>
    </div>
`;

htmlContent += `</div>`;



    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    html2pdf().from(tempDiv).save('inscripcion.pdf');

    tempDiv.remove();
});


const botones = document.querySelectorAll(".buttonIncri");
let clickeo = false;  

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        clickeo = true;
        boton.classList.toggle("selected");

        if(clickeo) {
            nextBtn.disabled = false;
        }
        verificarSeleccionDeHorarios()
    });
});

const carouselElement = document.getElementById('inscripcionCarousel');
const prevBtn = carouselElement.querySelector('[data-bs-slide="prev"]');
const nextBtn = carouselElement.querySelector('[data-bs-slide="next"]');

nextBtn.disabled = true;

carouselElement.addEventListener('slid.bs.carousel', () => {
    const isFirstSlide = carouselElement.querySelector('.carousel-item:first-child').classList.contains('active');
    prevBtn.disabled = isFirstSlide;

    verificarSeleccionDeHorarios();
});

const buttons = document.querySelectorAll('.buttonIncri');
const materiasSeleccionadasContainer = document.getElementById('materiasSeleccionadas');
const seleccionadas = [];

botones.forEach(button => {
    button.addEventListener('click', function() {
        const materiaSeleccionada = this.textContent || this.innerText;

const materiaIndex = seleccionadas.indexOf(materiaSeleccionada);

if (materiaIndex === -1) {

    seleccionadas.push(materiaSeleccionada);


    const materiaHTML = `
        <div class="col-md-4 mb-3 text-center" data-materia="${materiaSeleccionada}">
            <h5>${materiaSeleccionada}</h5>
            <div class="horario">
                <button type="button" class="btn w-100 buttonIncri1" value="Lun-Vie 19 a 23hs. Com 368">Lun-Vie 19 a 23hs. Com 368 (Virtual)</button>
                <button type="button" class="btn w-100 buttonIncri1" value="Miercoles 8 a 12hs. Com 368">Miercoles 8 a 12hs. Com 268 (Presencial)</button>
                <button type="button" class="btn w-100 buttonIncri1" value="Jueves 19 a 23hs. Com 368">Jueves 19 a 23hs. Com 168 (Semi presencial)</button>
            </div>
        </div>
    `;

    materiasSeleccionadasContainer.innerHTML += materiaHTML;
} else {
    
    seleccionadas.splice(materiaIndex, 1);

    const materiaElement = materiasSeleccionadasContainer.querySelector(`[data-materia="${materiaSeleccionada}"]`);
    if (materiaElement) {
        materiaElement.remove();
    }
}

        const carouselElement = document.getElementById('inscripcionCarousel');
        const nextBtn = carouselElement.querySelector('[data-bs-slide="next"]');
        nextBtn.disabled = false;
  
    });
});
const horariosPorMateria = {};
materiasSeleccionadasContainer.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('buttonIncri1')) {
        const horarioSeleccionado = event.target.innerText;
        const materiaSeleccionada = event.target.closest('.col-md-4').querySelector('h5').innerText;

        const horariosMateria = event.target.closest('.horario').querySelectorAll('.buttonIncri1');
        horariosMateria.forEach(horario => {
            if (horario !== event.target) {
                horario.classList.remove('selected');
            }
        });

        event.target.classList.toggle('selected');

        const indexExistente = seleccionadas.findIndex(item => item.split(' - ')[0] === materiaSeleccionada);
        if (indexExistente !== -1) {
            seleccionadas.splice(indexExistente, 1);
           
        }
        if (event.target.classList.contains('selected')) {
            horariosPorMateria[materiaSeleccionada] = true; 
        } else {
            delete horariosPorMateria[materiaSeleccionada]; 
        }
     
        if (event.target.classList.contains('selected')) {
            const materiaYHorario = `${materiaSeleccionada} - ${horarioSeleccionado}`;
            seleccionadas.push(materiaYHorario);
        }

        const confirmacionHorario = document.getElementById("seleccionadasIncripcion");
        confirmacionHorario.innerHTML = '';

        seleccionadas.forEach(item => {
            confirmacionHorario.innerHTML += `
                <div class="col-md-4 mb-3 text-center">
                    <h5>${item.split(' - ')[0]}</h5>
                    <div class="horario">
                        <p>Horario seleccionado: ${item.split(' - ')[1]}</p>
                    </div>
                </div>
            `;
        });

       
    }
    verificarSeleccionDeHorarios();
});

let currentStep = 1;

function updateProgress() {
    const progressBar = document.getElementById("progressBar");
    const stepMaterias = document.getElementById("stepMaterias");
    const stepHorarios = document.getElementById("stepHorarios");
    const stepConfirmacion = document.getElementById("stepConfirmacion");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    switch (currentStep) {
        case 1:
            progressBar.style.width = "33%";
            progressBar.innerText = "Paso 1 de 3";
            progressBar.setAttribute("aria-valuenow", "33");

            stepMaterias.classList.add("text-primary");
            stepHorarios.classList.remove("text-primary");
            stepConfirmacion.classList.remove("text-primary");

            prevBtn.disabled = true;
            nextBtn.innerText = "Siguiente";
            break;
        case 2:
            progressBar.style.width = "66%";
            progressBar.innerText = "Paso 2 de 3";
            progressBar.setAttribute("aria-valuenow", "66");

            stepMaterias.classList.remove("text-primary");
            stepHorarios.classList.add("text-primary");
            stepConfirmacion.classList.remove("text-primary");

            prevBtn.disabled = false;
            nextBtn.innerText = "Siguiente";
            nextBtn.addEventListener('click', nextStep);
            nextBtn.removeEventListener('click', mostrarModalConfirmacion);

            verificarSeleccionDeHorarios();
            break;

        case 3:
            progressBar.style.width = "100%";
            progressBar.innerText = "Paso 3 de 3";
            progressBar.setAttribute("aria-valuenow", "100");

            stepMaterias.classList.remove("text-primary");
            stepHorarios.classList.remove("text-primary");
            stepConfirmacion.classList.add("text-primary");

            prevBtn.disabled = false;
            nextBtn.innerText = "Finalizar";

            

            nextBtn.removeEventListener('click', nextStep);
            nextBtn.removeAttribute('data-bs-slide');
            nextBtn.addEventListener('click', mostrarModalConfirmacion);
            break;
    }

    console.log(currentStep);
}

function verificarSeleccionDeHorarios() {

    const materiasSeleccionadas = document.querySelectorAll('#materiasSeleccionadas h5').length;

    const cantidadHorariosSeleccionados = Object.keys(horariosPorMateria).length;

    const nextBtn = document.querySelector('[data-bs-slide="next"]');

 
    nextBtn.disabled = cantidadHorariosSeleccionados !== materiasSeleccionadas;
}

function mostrarModalConfirmacion() {
    const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'), {
        backdrop: 'static', 
        keyboard: false 
    });
    modal.show();
}

function nextStep() {
    if (currentStep < 3) {
        currentStep++;
        updateProgress();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgress();
    }
}

updateProgress();
