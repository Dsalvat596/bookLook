var fetch = function (isbn) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' +isbn,
        success: function (data) {
            console.log(data);
            var myBook = [{
                title: data.items[0].volumeInfo.title,
                author: data.items[0].volumeInfo.authors[0],
                description: data.items[0].volumeInfo.description,
                image: data.items[0].volumeInfo.imageLinks.thumbnail,
                date: data.items[0].volumeInfo.publishedDate
            }]
            successCallBack(myBook);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });

};


$('.body-container').on('click', '.searchbtn', function () {
    var isbn = $('.searchISBN').val();
    fetch(isbn);
})



var successCallBack = function (book) {
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);

    for (let j = 0; j < book.length; j++) {
        var newHTML = template(book[j]);
        $('.body-container').append(newHTML);
    };
};