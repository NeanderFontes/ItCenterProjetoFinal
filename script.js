
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendario');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [],
        dateClick: function(info) {
            var dateStr = info.dateStr;
            $('#eventoModal').modal('show');
            $('#evento-date').val(dateStr);
            $('#evento-id').val(''); // Limpar o ID ao adicionar novo evento
        },
        eventClick: function(info) {
            var event = info.event;
            $('#evento-id').val(event.id);
            $('#evento-title').val(event.title);
            $('#evento-date').val(event.startStr);
            $('#evento-time').val(event.startStr.substring(11, 16));
            $('#evento-notes').val(event.extendedProps.notes);
            $('#eventoModal').modal('show');
        }
    });

    calendar.render();

    $('#adicionar-evento-notas').on('click', function() {
        var eventId = $('#evento-id').val();
        var title = $('#evento-title').val();
        var date = $('#evento-date').val();
        var time = $('#evento-time').val();
        var notes = $('#evento-notes').val();

        if (eventId) {
            // Atualizar evento existente
            var event = calendar.getEventById(eventId);
            event.setProp('title', title);
            event.setStart(date + 'T' + time);
            event.setExtendedProp('notes', notes);
        } else {
            // Adicionar novo evento
            calendar.addEvent({
                id: Date.now(),
                title: title,
                start: date + 'T' + time,
                allDay: false,
                notes: notes
            });
        }

        $('#eventoModal').modal('hide');
    });

    $('#remover-evento').on('click', function() {
        var eventId = $('#evento-id').val();
        var event = calendar.getEventById(eventId);
        if (event) {
            event.remove();
        }
        $('#eventoModal').modal('hide');
    });
});