/* eslint-disable semi */
/* eslint-disable no-undef */
$(document).ready(function () {
  $('#searchBtn').on('click', function () {
    var searchText = $('#searchText').val()
    $.ajax('/api/search/' + searchText, {
      type: 'GET'
    }).then(function (response) {
      document.open()
      document.write(response)
      document.close()
      console.log('loaded')
    })
  });
  $('.open-button').on('click', function () {
    var volumeid = $(this).data('id');
    $.ajax('/details/' + volumeid, {
      type: 'GET'
    }).then(function (response) {
      document.open()
      document.write(response)
      document.close()
      console.log('loaded')
    })
  });
})
