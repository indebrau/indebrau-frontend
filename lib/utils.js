/* translates dates into a more human friendly format
returns input for passed invalid dated objects */
function renderDate(dateTime, addSeconds) {
  if (!dateTime) return dateTime; // empty
  let formattedDate = new Date(dateTime);
  if (formattedDate instanceof Date && !isNaN(formattedDate.valueOf())) {
    var locales = null;
    if (navigator.languages != undefined) {
      locales = navigator.languages[0];
    } else {
      locales = navigator.language;
    }
    var options = {
      hourCycle: 'h24',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    if (addSeconds) {
      options.second = '2-digit';
    }
    return formattedDate.toLocaleString(locales, options);
  } else {
    return dateTime;
  }
}

function parseSensorValue(value) {
  if (!value) return value;
  let formattedValue = parseFloat(value).toFixed(2);
  // care for cooling and heating
  if (isNaN(formattedValue)) {
    try {
      let valueJSON = JSON.parse(value);
      if (valueJSON.on == false)
        formattedValue = parseFloat(0).toFixed(2);
      else
        formattedValue = parseFloat(valueJSON.power).toFixed(2);
      console.log(formattedValue);
      return formattedValue;
    }
    catch (e){
      return value; // neither number nor json with power value
    }
  } else {
    return formattedValue;
  }
}

export { renderDate, parseSensorValue };
