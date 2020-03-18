/* eslint-disable semi */
/* eslint-disable no-undef */
$(document).ready(function () {
  google.books.load();

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
      document.write(response);
      document.close()
      console.log('loaded')
    })
  });
  $('.add-button').on('click', function () {
    var volumeid = $(this).data('id');
    $.ajax('/api/book/' + volumeid, {
      type: 'POST',
      data: {
        title: $(this).data('title'),
        author: $(this).data('author'),
        isbn: $(this).data('isbn')
      }
    }).then(function (response) {
      console.log(response);
    })
  });

  $('#viewBook-button').on('click', function () {
    var isbn = $(this).data('isbn');
    var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    viewer.load(`ISBN:${isbn}`);
    $('#bookViewerModal').modal('show');
  });

  $('#comupd-button').on('click', function () {
    var volumeid = $(this).data('id');
    $.ajax('/api/comments/' + volumeid, {
      type: 'POST',
      data: {
        comment: 'Very Good Book',
        name: 'My Name',
        rating: '5'
      }
    }).then(function (response) {
      console.log(response);
    })
  });
})
