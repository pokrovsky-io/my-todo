var template = document.querySelector('#template');
var itemTemplate = template.content.querySelector('.my-todo__item');
var itemsList = document.querySelector('.my-todo__list');
var currentDate = document.querySelector('.current-date');

var createEventItem = function (event) {
  var newEventItem = itemTemplate.cloneNode('true');
  // var doneButton = newEventItem.querySelector('.my-todo__done');
  var deleteButton = newEventItem.querySelector('.my-todo__delete');
  var summary = newEventItem.querySelector('.my-todo__summary');


  summary.textContent = event.summary;

  deleteButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    itemsList.removeChild(newEventItem);
    storage.remove(event.id);
    // Удаление с сервера
  });

  return newEventItem;
};


var renderEventItems = function (events) {
  var fragment = document.createDocumentFragment();

  events.forEach(function (event) {
    fragment.appendChild(createEventItem(event));
    storage.set(event);
  });

  itemsList.appendChild(fragment);
}




function dni() {
  var D = new Date(1999, 11, 31);
  D.setDate(D.getDate() + 3);
  alert(D);
}


/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */



var listSettings = {
  'calendarId': 'primary',
  'timeMin': (new Date()).toISOString(),
  'showDeleted': false,
  'singleEvents': true,
  'maxResults': 10,
  'orderBy': 'startTime'
}

var ListSettings = function (inputValue) {
  this.calendarId = 'primary';

  // ??? какой формат возможен
  this.timeMin = 'current Date';
  this.timeMax = 'current Date';

  this.singleEvents = true;
  this.orderBy = 'startTime';
}


var listEvents = function () {
  gapi.client.calendar.events.list(listSettings)
    .then(function (response) {
      var events = response.result.items;
      console.log(events);
      if (events.length > 0) {
        storage.clear();
        renderEventItems(events);
      } else {
        notice.show('Запланированных на сегодня событий не найдено');
      }
    });
}



var onListDateChange = function () {
  // var inputValue = this.value;
  var date = new Date(this.value);
  var dateRange = {
    min: date.setHours(date.getHours() - 3),
    max: date.setHours(date.getHours() + 21),
  }
}



currentDate.addEventListener('change', onListDateChange);


window.list = {
  update: listEvents,
}



// window.myTodo.list = listUpcomingEvents;
