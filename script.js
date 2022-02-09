var request = new XMLHttpRequest()

request.open('GET', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js', true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      console.log(movie.title)
    })
  } else {
    console.log('error')
  }
}

request.send()

function getData() {
    const response = await fetch ('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js')
    const data = await response.json()
}