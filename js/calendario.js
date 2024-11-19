const calendarDays = document.getElementById("calendarDays");
const calendarDayss = document.getElementById("calendarDayss");
const monthYear = document.getElementById("monthYear");
const monthYearr = document.getElementById("monthYearr");
const tooltip = document.getElementById("tooltip");
const tooltipp = document.getElementById("tooltipp");
let currentDate = new Date();

// Lista de feriados en Argentina (formato MM-DD)
const holidays = [
    { date: "01-01", name: "Año Nuevo" },
    { date: "05-01", name: "Día del Trabajador" },
    { date: "05-25", name: "Revolución de Mayo" },
    { date: "07-09", name: "Día de la Independencia" },
    { date: "12-25", name: "Navidad" }
];

// Lista de eventos especiales
const specialEvents = [
    { date: "03-21", name: "Inicio de Clases", color: "bg-info" },
    { date: "11-14", name: "Inscripción a exámenes finales, libres y acreditaciones", color: "#28a745" },
    {date:  "11-15", name: "Inscripción a exámenes finales, libres y acreditaciones", color: "#28a745" },
    {date:  "11-21", name: "Verificación de inscripción", color: "#28a745" },
    {date:  "11-04", name: "Feriado", color: "#ffc107" },
    {date:  "12-05", name: "Examenes turno Diciembre del 05/12 hasta 14/12", color: "#ff7b00" },
    { date: "12-31", name: "Fiesta de Fin de Año", color: "#ff5733" }
    
];

function getEvent(day, month) {
    const formattedDate = `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays.find(event => event.date === formattedDate) ||
           specialEvents.find(event => event.date === formattedDate);
}

function showTooltip(event, message) {
    if (message) {
        tooltip.textContent = message;
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
        tooltip.style.display = 'block';

        tooltipp.textContent = message;
        tooltipp.style.left = `${event.pageX + 10}px`;
        tooltipp.style.top = `${event.pageY + 10}px`;
        tooltipp.style.display = 'block';
    }
}

function hideTooltip() {
    tooltip.style.display = 'none';
    tooltipp.style.display = 'none';
}

function renderCalendar(date) {
    calendarDays.innerHTML = "";
    calendarDayss.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();

    monthYear.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });
    monthYearr.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let dayCell = "";
    let dayCell1 = "";
    for (let i = 0; i < firstDayOfMonth; i++) {
        dayCell += "<td></td>";
        dayCell1 += "<td></td>";
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear();
        const event = getEvent(day, month);

        let classes = isToday ? 'today' : '';
        let tooltipMessage = '';
        let backgroundColor = ''; 
        let textColor = '';

        if (event) {
            classes += ` ${event.color || 'holiday'}`;
            tooltipMessage = event.name;
            backgroundColor = event.color ? event.color : '';

            if (event.color === '#28a745') {
                textColor = 'white';  
            } else if (event.color === 'bg-danger' || event.color === '#ff7b00' || event.color === '#ff5733') {
                textColor = 'white';  
            } else {
                textColor = 'black'; 
            }
        } else {
            textColor = 'black'; 
        }

        // Aplicar el color de texto en el número del día
        dayCell += `<td class="${classes}" style="background-color:${backgroundColor}; color:${textColor}" onmouseover="showTooltip(event, '${tooltipMessage}')" onmouseout="hideTooltip()">${day}</td>`;
        dayCell1 += `<td class="${classes}" style="background-color:${backgroundColor}; color:${textColor}" onmouseover="showTooltip(event, '${tooltipMessage}')" onmouseout="hideTooltip()">${day}</td>`;

        if ((day + firstDayOfMonth) % 7 === 0) {
            calendarDays.innerHTML += `<tr>${dayCell}</tr>`;
            calendarDayss.innerHTML += `<tr>${dayCell1}</tr>`;
            dayCell = "";
            dayCell1 = "";
        }
    }
    if (dayCell || dayCell1) {
        calendarDays.innerHTML += `<tr>${dayCell}</tr>`;
        calendarDayss.innerHTML += `<tr>${dayCell1}</tr>`;
    }
}

document.getElementById("prevMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});
document.getElementById("prevMonthh").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

document.getElementById("nextMonthh").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);

$('#calendarioModal').on('shown.bs.modal', function () {

    renderCalendar(currentDate);
    $('#calendarioModal').modal('show');  
});
// Para mostrar el modal


