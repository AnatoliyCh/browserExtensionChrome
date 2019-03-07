$(document).ready(function(){
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
        $.getScript(
            "https://www.google.com/complete/search?client=hp&hl=en&sugexp=msedr&gs_rn=62&gs_ri=hp&cp=1&gs_id=9c&q=" + $("#labelSearch").val() + "&xhr=t&callback=hello&callback=addTips",
            addTips)
    });
});
var tips = [];//поисковые подсказки
function addTips(data){
    var lengthLabelSearch = ($("#labelSearch").val().length);//берем длину запроса
    for (var key in data){
        if (key == '1'){
            for (var key1 in data[key]){
                tips[key1] = (data[key][key1]["0"].slice(0, lengthLabelSearch) + data[key][key1]["0"].slice(lengthLabelSearch + 3)).slice(0, -4);
            }
            break;
        }
    }
    console.log(tips);
};