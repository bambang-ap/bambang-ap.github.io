const onResize = () => {
  let selector = $('.work .experience .col')
  let { outerWidth: width, outerHeight: height } = window
  if (!selector.length > 0) {
    setTimeout(onResize, 500)
    return
  }
  selector.attr('class', 'col')
  if (width < 768) {
    selector.addClass('col-12')
  } else if (width < 900) {
    selector.addClass('col-6')
  } else {
    selector.addClass('col-4')
  }
}
function includeHTML() {
  var z, i, elmnt, file, xhttp
  /* Loop through a collection of all HTML elements: */
  z = document.querySelectorAll('[include-html]')
  for (i = 0; i < z.length; i++) {
    elmnt = z[i]
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("src")
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText }
          if (this.status == 404) { elmnt.innerHTML = "Page not found." }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html")
          elmnt.removeAttribute("src")
          includeHTML()
        }
      }
      xhttp.open("GET", file, true)
      xhttp.send()
      /* Exit the function: */
      return
    }
  }
}