function increaseNumberNotifyContact(className) {
  let currentValue = +$(`.${className}`).find("em").text();
  currentValue += 1;
  if (currentValue === 0) {
    $(`.${className}`).html("");
  } else {
    $(`.${className}`).html(`(<em>${currentValue}</em>)`);
  }

}

function decreaseNumberNotifyContact(className) {
  let currentValue = +$(`.${className}`).find("em").text();
  currentValue -= 1;
  if (currentValue === 0) {
    $(`.${className}`).html("");
  } else {
    $(`.${className}`).html(`(<em>${currentValue}</em>)`);
  }

}
