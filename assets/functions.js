const ajax = ({ url, type = 'GET', ...params }) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      ...params, url, type,
      success: (data, b, response) => resolve({ data, response }),
      error: err => reject(err)
    });
  })
}
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
const fillData = async () => {
  let z
  z = document.querySelectorAll('[id]')
  const { data: content } = await ajax({ url: 'assets/data.json', dataType: 'json' })
  const keys = Object.keys(content)
  z.forEach(elmnt => {
    key = elmnt.getAttribute("id")
    if (keys.includes(key)) {
      const data = content[key]
      if (typeof data == 'string')
        elmnt.innerHTML = data
      else {
        if (Array.isArray(data)) {
          const el = $(elmnt)
          if (key == 'work')
            data.forEach(({ image, detail }) => el.append(
              $('<div class="col col-4">').html(
                $('<div class="wrapper">')
                  .append(
                    $('<img id="image">').attr('src', image)
                  )
                  .append(
                    $('<div id="detail" class="hover-content">').html(detail)
                  )
              )
            ))
          else if (key == 'skills')
            data.forEach(({ title, detail, icon, partTitle, part, devTools }) => {
              const html = `
              <div class="col">
                <i class="fa fa-${icon} font-blue margin-bottom-10"></i>
                <div class="font-15 font-title">${title}</div>
                <div class="margin-top-20 margin-bottom-20">${detail}</div>
                <div>
                  <div class="font-title font-11">${partTitle}</div>
                  <div class="margin-top-20 margin-bottom-20">${part}</div>
                </div>
                <div>
                  <div class="font-title font-11 margin-top-20 margin-bottom-20">Dev Tools:</div>
                  <div>${devTools.map(a => `<div>${a}</div>`).join('')}</div>
                </div>
              </div>
              `
              el.append(html)
            })
        }
        else
          Object.keys(data).forEach(k => {
            const [part, elemPart] = [data[k], $(elmnt).find(`#${k}`)]
            if (typeof part == 'string')
              elemPart.html(part)
            else {
              part.forEach(({ icon, href }) => elemPart.append(
                `<a href='${href}'>
                <i class='fa fa-${icon}'></i>
              </a>`
              ))
            }
          })
      }
    }
  })
  setTimeout(() => {
    $('.experience .col').hover(({ currentTarget: target, type }) => {
      let content = $(target)
      if (type == 'mouseenter') {
        content.find('img').css('transform', 'scale(1.2)')
        content.find('.hover-content').addClass('active')
      } else {
        content.find('img').css('transform', 'scale(1)')
        content.find('.hover-content').removeClass('active')
      }
    })
  }, 500)
}
Array.prototype.loop = function (callback, reverse, index) {
  var arr = this;
  function retCallback(timeout) {
    timeout = timeout || 0;
    setTimeout(function () {
      arr.loop(callback, reverse, index + 1);
    }, timeout);
  }
  function retCallbackReverse(timeout) {
    timeout = timeout || 0;
    setTimeout(function () {
      if (index > 0)
        arr.loop(callback, reverse, index);
    }, timeout);
  }
  if (reverse) {
    index = index || arr.length;
    index--;
    callback({ item: arr[index], index, callback: retCallbackReverse });
  } else {
    index = index || 0;
    if (index < arr.length) {
      callback({ item: arr[index], index, callback: retCallback });
    }
  }
}
const includeHTML = () => {
  let z, file
  z = document.querySelectorAll('[include-html]')
  z.forEach(async elmnt => {
    file = elmnt.getAttribute("src")
    if (file) {
      const { response: { status, readyState, responseText } } = await ajax({ url: file })
      if (readyState == 4) {
        if (status == 200) { elmnt.innerHTML = responseText }
        if (status == 404) { elmnt.innerHTML = "Page not found." }
        elmnt.removeAttribute("include-html")
        elmnt.removeAttribute("src")
        includeHTML()
      }
    }
  })
}