/** @format */

currentDayInfo = () => {
  var d = new Date();
  var n = d.getDay();

  if (n === 0) {
    return "Sunday";
  }
  if (n === 1) {
    return "Monday";
  }
  if (n === 2) {
    return "Tuesday";
  }
  if (n === 3) {
    return "Wednesday";
  }
  if (n === 4) {
    return "Thursday";
  }
  if (n === 5) {
    return "Friday";
  }
  if (n === 6) {
    return "Saturday";
  }
};

currentHourInfo = () => {
  var d = new Date();
  var n = d.getHours();
  return n;
};

currentMinuteInfo = () => {
  var d = new Date();
  var n = d.getMinutes();
  return n;
};

storeInfo = (data) => {
  var dObj = new Date();
  var y = dObj.getFullYear();
  var m = dObj.getMonth();
  var d = dObj.getDate();

  if (data === "ymd") {
    return y + "-" + (m + 1) + "-" + d;
  }

  if (data === "lec") {
    if (currentHourInfo() === 8 || currentHourInfo() === 9) {
      if (currentHourInfo() === 8 && currentMinuteInfo() >= 30) {
        return "8.30-9.30";
      }
      if (currentHourInfo() === 9 && currentMinuteInfo() <= 30) {
        return "8.30-9.30";
      }
    }
    if (currentHourInfo() === 9 || currentHourInfo() === 10) {
      if (currentHourInfo() === 9 && currentMinuteInfo() >= 30) {
        return "9.30-10.30";
      }
      if (currentHourInfo() === 10 && currentMinuteInfo() <= 30) {
        return "9.30-10.30";
      }
    }
    if (currentHourInfo() === 10 || currentHourInfo() === 11) {
      if (currentHourInfo() === 10 && currentMinuteInfo() >= 30) {
        return "10.30-11.30";
      }
      if (currentHourInfo() === 11 && currentMinuteInfo() <= 30) {
        return "10.30-11.30";
      }
    }
    if (currentHourInfo() === 11 || currentHourInfo() === 12) {
      if (currentHourInfo() === 11 && currentMinuteInfo() >= 30) {
        return "11.30-12.00";
      }
      if (currentHourInfo() === 12 && currentMinuteInfo() <= 00) {
        return "11.30-12.00";
      }
    }
    if (currentHourInfo() === 12 || currentHourInfo() === 13) {
      if (currentHourInfo() === 12 && currentMinuteInfo() >= 0) {
        return "12.00-1.00";
      }
      if (currentHourInfo() === 13 && currentMinuteInfo() <= 0) {
        return "12.00-1.00";
      }
    }
    if (currentHourInfo() === 13 || currentHourInfo() === 14) {
      if (currentHourInfo() === 13 && currentMinuteInfo() >= 0) {
        return "1.00-2.00";
      }
      if (currentHourInfo() === 14 && currentMinuteInfo() <= 0) {
        return "1.00-2.00";
      }
    }
    if (currentHourInfo() === 14 || currentHourInfo() === 15) {
      if (currentHourInfo() === 14 && currentMinuteInfo() >= 0) {
        return "2.00-3.00";
      }
      if (currentHourInfo() === 15 && currentMinuteInfo() <= 0) {
        return "2.00-3.00";
      }
    }
    if (currentHourInfo() === 15 || currentHourInfo() === 16) {
      if (currentHourInfo() === 15 && currentMinuteInfo() >= 0) {
        return "3.00-4.00";
      }
      if (currentHourInfo() === 16 && currentMinuteInfo() <= 0) {
        return "3.00-4.00";
      }
    }
  }
};
