export default (el, type) => {
  // IE9+ and other modern browsers
  if ('createEvent' in document) {
    const e = new Event(type, { bubbles: true, cancelable: false });
    el.dispatchEvent(e);
  } else {
    // IE8
    const e = document.createEventObject();
    e.eventType = type;
    el.fireEvent(`on${e.eventType}`, e);
  }
};