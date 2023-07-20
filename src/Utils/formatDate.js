
const FormatDate = (numberDay) => {
    switch (numberDay) {
        case 0:
            const fecha = new Date();
           return format(fecha)
        case numberDay != 0:
            const fechaActual = new Date(); // Fecha actual
            const fechaNueva = new Date(fechaActual.getTime() + numberDay * 24 * 60 * 60 * 1000);
           return format(fechaNueva);
    }
}

const format = (fecha) => {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Agrega un cero al mes si es necesario
    const dia = String(fecha.getDate()).padStart(2, '0'); // Agrega un cero al día si es necesario

    return `${año}-${mes}-${dia}`;
}

module.exports = {FormatDate}