$(document).ready(function(){
    var tips = [];//поисковые подсказки
    //загрузка выбранного поиска в пред. сеансе
    if($.cookie('listSearch'))
        $('#listSearch').val($.cookie('listSearch'));
    //вызов нажатия кнопки enter
    $('#labelSearch').keypress(function(e){
        if(e.keyCode==13)
            $('#buttonSearch').click();
    });
    //функция клика
    $('#buttonSearch').click(function(){
        var valueList = $('#listSearch').val();
        var valueSearch = $('#labelSearch').val();
        var result = "";
        if (valueSearch != "") {
            switch (valueList) {
                case 'http://google.com/search' :
                    result = valueList + '?q=' + valueSearch;
                    break;
                case 'https://yandex.com/search/' :
                    result = valueList + '?query=' + valueSearch;
                    break;
            }
            window.open(result);
        }
    });
    //сохранение выбранного значения списка
    $('#listSearch').change(function() {
        $.cookie('listSearch', $(this).val(), {
            expires: 365}
        );
    });
    $( "#labelSearch" ).autocomplete({
        source: tips
    });
    //взятие похожих запросов для подсказок
    $('#labelSearch').keyup(function(){
        if ($('#labelSearch').val().length > 0) {
            $.ajax({
                type: 'GET',
                url: "https://www.googleapis.com/customsearch/v1?key=AIzaSyBXQmWrtnhgBblNofM6NSfiWqbguDO8uj0&cx=017576662512468239146:omuauf_lfve&q=" + $( "#labelSearch" ).val(),
                dataType: "json",
                success: function (data) {
                    resultAjax.innerHTML = ""
                    for (i = 0; i < data.items.length; i++){
                        tips[i] = data.items[i].title
                    }
                },
                error: function (){
                    resultAjax.innerHTML = "AJAX запрос не обработан www.googleapis.com"
                }
            });
        }
        resultAjax.innerHTML =""
    });
});