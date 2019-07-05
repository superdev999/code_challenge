const key = ["Person", "Place", "Location", "Venue", "City", "Language", "Product"];
var data = [];
var keyList = "";
$(document).ready(function(){
    $(".newAddForm").css({"display":"none"});
    key.forEach((keyItem)=>{
        keyList = keyList + "<option value='"+keyItem+"'>"+keyItem+"</option>"+"\n";
    });
    $(keyList).appendTo(".keyList");
    //Intialize
    if( data.length > 0 )
        displayData();

    // Click Add New Button
    $(".addNewDisplay").click( function () {
        $(".newAddForm").css({"display":"contents"});
    });

    // Click Add Button
    $(".addNew").click( function () {
        $(".newAddForm").css({"display":"none"});
        var newName = $(".newName").val();
        var newValue = $(".newValue").val();

        var myKeyVals = { newName : newName, newValue:newValue };

        var saveData = $.ajax({
            type: 'POST',
            url: "php/index.php",
            data: myKeyVals,
            dataType: "json",
            success: function(resultData) {
                console.log("DATA<<<<", resultData);//fixme
                if( resultData.success ){
                    data.push({
                        name:resultData.data.name,
                        value:resultData.data.value
                    });
                    displayData();
                }else{
                    switch (resultData.status) {
                        case 422:
                            alert(resultData.messages[0]);
                            break;
                        case 500:
                            alert(resultData.messages[0]);
                            break;
                        default:
                            break;
                    }
                }
            }
        });
        saveData.error(function() { alert("Something went wrong"); });
        $(".newName").val('');
        $(".newValue").val('');
    });


    //customize function
    function displayData() {
        $(".data").remove();
        data.forEach((item, key)=>{
            var dataItem = "<tr class='data'>"+
                "<td class='mdl-data-table__cell--non-numeric'>"+(key+1)+"</td>"+
                "<td>"+item.name+"</td>"+
                "<td>"+item.value+"</td>"+
                "</tr>";
            $(dataItem).appendTo("table tbody");
        })
    }
});
