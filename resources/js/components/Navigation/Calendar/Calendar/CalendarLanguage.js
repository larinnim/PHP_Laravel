export default function CalendarLanguage(lang) {
    let MONTHS = [];
    let WEEKDAYS_LONG = [];
    let WEEKDAYS_SHORT = [];
    
    switch(lang) {
        case 'pt-BR':
             MONTHS = [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Decembro"
            ];
             WEEKDAYS_LONG = [
                "Domingo",
                "Segunda",
                "Terça",
                "Quarta",
                "Quinta",
                "Sexta",
                "Sábado"
            ];
             WEEKDAYS_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
          return {MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT};
        case 'en-CA' || 'en-us':
            MONTHS = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];
            WEEKDAYS_LONG = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return {MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT};
        case 'es':
             MONTHS = [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ];
            WEEKDAYS_LONG = [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado"
            ];
            WEEKDAYS_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
            return {MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT};
        default:
          return null;
      }
  }
  