$(document).ready(function() 
    {
    //    document.oncontextmenu = function() {return false;};
        var FileExcel;
        var colFlag;
        var rowFlag;

        var trRow;
        var trCol;
        var arrayParamRow = [];
        var arrayParamColl = [];


        $('#rangeSize').hide();
        $('#stopParam').hide();
        $('.reset').hide();
        $('#rangeSize').mouseup(function(){
            var x = $('#rangeSize').val();
            $('table').css('zoom', x+'%');
        });


        $('th').click(function(){
          //  var x = $(this).attr('id');
            alert('ws');
        });


        function search(text){
            var col;
            var i, j, k, word, cel;

            /* -------------- ПОШУК ПО РЯДКАМ І СТОВПЦЯМ -------------- */
            $('.widScroll table tbody tr th').css('opacity', '0.5');
            if(arrayParamRow[0] != null && arrayParamColl[0] !=null)
            {
                for (j = 0; j < arrayParamColl.length; j++) {
                    col = arrayParamColl[j];
                    for (i = 0; i < arrayParamRow.length; i++) {
                        cel = col + arrayParamRow[i];
                        $('#' + cel).css('opacity', '1');
                        if(typeof (FileExcel.fileLists[0].cells[cel].data) != "undefined") {
                            word = FileExcel.fileLists[0].cells[cel].data;
                            if (text.test(word)) {
                                $('#' + cel).css("background", "rgba(21,126,206,.3)");
                            }
                        }

                    }
                }
            }
            /* -------------- КІНЕЦЬ -------------- */

            /* -------------- ПОШУК ПО СТОВПЦЯМ -------------- */
            else if(arrayParamColl[0] != null)
            {
               $('.widScroll table tbody tr th').css('opacity', '0.8');

                for (j = 0; j < arrayParamColl.length; j++) {
                    col = arrayParamColl[j];
                    for (i = 1; i < FileExcel.fileLists[0].nRow; i++) {
                        cel = col + i;
                          $('#' + cel).css('opacity', '1');
                        if(typeof (FileExcel.fileLists[0].cells[cel].data) != "undefined") {
                            word = FileExcel.fileLists[0].cells[cel].data;
                            if (text.test(word)) {
                                $('#' + col + i).css("background", "rgba(21,126,206,.3)");
                            }
                        }

                    }
                }
            }
            /* -------------- КІНЕЦЬ -------------- */

            /* -------------- ПОШУК ПО РЯДКАМ -------------- */
            else if(arrayParamRow[0] != null)
            {
                $('.widScroll table tbody tr th').css('opacity', '0.5');
                for (j = 0; j < arrayParamRow.length; j++) {
                    for (i = 0; i < FileExcel.fileLists[0].nColNumb; i++) {
                        col = FileExcel.fileLists[0].nCells[i];
                        cel = col + arrayParamRow[j];
                        console.log('col = '+col + arrayParamRow[j]+' == ' +cel);
                        $('#' + cel).css('opacity', '1');
                        if(typeof (FileExcel.fileLists[0].cells[cel].data) != "undefined") {
                            word = FileExcel.fileLists[0].cells[cel].data;
                            if (text.test(word)) {
                                $('#' + cel).css("background", "rgba(21,126,206,.3)");
                            }
                        }

                    }
                }
            }
            /* -------------- КІНЕЦЬ -------------- */

            /* -------------- ПОШУК ПО КОМІРКАМ -------------- */
            else {
                $('.widScroll table tbody tr th').css('opacity', '1');
                for (j = 1; j < FileExcel.fileLists[0].nRow; j++) {
                    for (i = 0; i < FileExcel.fileLists[0].nColNumb; i++) {
                        col = FileExcel.fileLists[0].nCells[i];
                        word = FileExcel.fileLists[0].cells[col + j].data;
                        if (text.test(word)) {
                            $('#' + col + j).css("background", "rgba(21,126,206,.3)");
                        }

                    }
                }
            }
            /* -------------- КІНЕЦЬ -------------- */
        }

        $('input').keyup(function() {
            var text = $(".searchBlock input").val();
            if (text != '') {
                $('tbody tr th').css("background", "inherit");
                text = new RegExp(text, 'gi');
                search(text);
            }
            else{
                $('tbody tr th').css("background", "inherit");
                $('tbody tr th').css("opacity", "1");
            }
        });

        $('#columnParam').click(function(){
            colFlag = true;
            rowFlag = false;
            $('.widScroll').css("cursor","crosshair");
            $('#stopParam').show(300);
                $('tr th').click(function () {
                    if(colFlag != false) {
                        var idCel= ($(this).attr("id"));
                        $("#blockRowParam").append("<li class='searchParam' alt='"+idCel+"'>"+idCel+"<span class='remove glyphicon glyphicon-remove'></span></li>");
                        $('.reset').show();
                        var colss = $('#'+idCel).attr('colspan');
                        arrayParamColl.push(idCel.replace(/\d/g, ''));
                        if(colss > 1)
                        {
                            currentId = $('#'+idCel);
                            for(var i = 1; i < colss; i++)
                            {
                                currentId = currentId.next();
                                arrayParamColl.push(currentId.attr('id').replace(/\d/g, ''));
                            }
                        }

                    }
                    $('.searchParam > .remove').click(function(){
                 //       alert($(this).parent().attr('alt'));
                        $(this).parent().remove();
                    });
                });
        });

        $('#rowParam').click(function(){
            rowFlag = true;
            colFlag = false;
            $('.widScroll').css("cursor","crosshair");
            $('#stopParam').show(300);
            $('tr th').click(function () {
                if(rowFlag != false) {
                    var idCel= ($(this).attr("id"));
                    var rows = $('#'+idCel).attr('rowspan');
                    $("#blockRowParam").append("<li class='searchParam' alt='"+idCel+"'>"+idCel+"<span class='remove glyphicon glyphicon-remove'></span></li>");
                    $('.reset').show();
                    arrayParamRow.push(idCel.replace(/\D/g, ''));
                    if(rows > 1)
                    {
                        currentId = idCel.replace(/\D/g, '');
                        for(var i = 1; i < rows; i++)
                        {
                            currentId++;
                            arrayParamRow.push(currentId);
                        }
                    }

                }

                $('.searchParam > .remove').click(function(){
                    $(this).parent().remove();
                });
            });
        });

        $('.reset').click(function(){
            arrayParamRow = [];
            arrayParamColl = [];
            $('.searchParam').remove();
        });


        $('#stopParam').click(function(){
            rowFlag = false;
            colFlag = false;
            $('.widScroll').css("cursor","pointer");
            $('#stopParam').hide();

        });

        function createList(list, countListNumber) {
            // var ColNum = 'A';
            // alert(list.fileLists[countListNumber - 1].nColNumb);
            var width;
            var cssWay = "<table id='myTable' class='tablesorter' ><thead><tr><th></th>";
            for (var i = 0; i < list.fileLists[countListNumber - 1].nColNumb; i++) {
                cssWay += "<th>" + list.fileLists[countListNumber - 1].nCells[i] + "</th>";
            }
            cssWay += "</tr></thead><tbody>";
        //    alert(list.fileLists[countListNumber - 1].union);

            for (var j = 1; j < list.fileLists[countListNumber - 1].nRow; j++){
                cssWay += "<tr><th>"+j+"</th>";
                for (var i = 0; i < list.fileLists[countListNumber - 1].nColNumb; i++) {
                    col = list.fileLists[countListNumber - 1].nCells[i];
                    if(list.fileLists[countListNumber - 1].cells[col+j])
                        if(list.fileLists[countListNumber - 1].cells[col+j].data != null) {
                            if(list.fileLists[countListNumber - 1].cells[col + j].width <= 0)
                                cssWay += "<th contenteditable='true' id='" + col + j + "' ><div style='width: 70px; height: "+ (list.fileLists[countListNumber - 1].cells[col + j].height+2) +"px; font-size: "+list.fileLists[countListNumber - 1].cells[col + j].fontSize+"pt; '>" + list.fileLists[countListNumber - 1].cells[col + j].data + "</div></th>";
                            else{
                                width = list.fileLists[countListNumber - 1].cells[col + j].width *8;
                                cssWay += "<th contenteditable='true' id='" + col + j + "' > <div style='width: "+width+"px; height: "+ (list.fileLists[countListNumber - 1].cells[col + j].height+2) +"px; font-size: "+list.fileLists[countListNumber - 1].cells[col + j].fontSize+"pt;'>" + list.fileLists[countListNumber - 1].cells[col + j].data + "</div></th>";
                            }
                                 }
                        else
                            cssWay += "<th id='"+col+j+"'><div style='width: 70px;' contenteditable='true'></div></th>";
                    else
                        cssWay += "<th id='"+col+j+"' ><div style='width: 70px;' contenteditable='true'></div></th>";
                }
                cssWay += "</tr>";
            }

            cssWay += "</tbody></table>";

            return cssWay;

        }

        function column(obj)
        {
            var myArray;
            var key;
            var current;

            myArray = obj.union;

            for(key in myArray) {
                var mass = key.split(':');
                var th;
                var colSum1= 0, colSum2= 1,rowSum = 1;

                p = mass[0].replace(/\d/g, '').length-1;
                for(var i = 0;i< mass[0].replace(/\d/g, '').length; i++)
                {
                    colSum1 += mass[0].replace(/\d/g, '').charCodeAt(i) * Math.pow(26,p);
                    p--;
                }
                p = mass[0].replace(/\d/g, '').length-1;
                for(i = 0;i< mass[1].replace(/\d/g, '').length; i++)
                {
                    colSum2 += mass[1].replace(/\d/g, '').charCodeAt(i) * Math.pow(26,p);
                    p--;
                }
                rowSum += mass[1].replace(/\D/g, '') - mass[0].replace(/\D/g, '');

                $('#'+mass[0]).attr('colspan', colSum2 - colSum1);
                $('#'+mass[0]).attr('rowspan', rowSum);
                th = $('#'+mass[0]);
                    if((colSum2 - colSum1) > 1){
                        $('#'+mass[0]+' div').css("width", "100%");
                        for(i = 1;i<(colSum2 - colSum1);i++){
                            th = th.next();
                            th.hide();
                        }
                    }
                    th = $('#'+mass[0]);
                    if(rowSum > 1){
                        currentLeter1 = mass[0].replace(/\d/g, '');
                        currentNumber = mass[0].replace(/\D/g, '');
                        currentLeter3 = mass[0].replace(/\d/g, '');
                        currentLeter2 = mass[1].replace(/\d/g, '');
                        asailNumber = mass[1].replace(/\D/g, '');
                        $('#'+mass[0]+' div').css("height", "100%");

                        console.log("Start: "+ mass[0] + ":" + mass[1]);
                        for(i = 1; i < rowSum; i++){
                            currentNumber++;
                            $('#' + currentLeter1 + currentNumber).hide();
                            if(currentLeter1.length > 1) {

                                   while (currentLeter1 != currentLeter2) {
                                        currentLeter1 = currentLeter1.slice(0, 1) + String.fromCharCode(currentLeter1.charCodeAt(currentLeter1.length - 1) + 1);
                                        if (currentLeter1[currentLeter1.length - 1] == "[") {
                                            currentLeter1 = currentLeter1.slice(0, 1) + "A";
                                            currentLeter1 = String.fromCharCode(currentLeter1.charCodeAt(currentLeter1.length - 2) + 1) + currentLeter1.slice(1);
                                        }
                                        $('#' + currentLeter1 + currentNumber).hide();

                                    }
                            }else if((currentLeter1.length == 1) && (currentLeter2.length == 1)){
                                while (currentLeter1 != currentLeter2) {
                                     currentLeter1 = String.fromCharCode(currentLeter1.charCodeAt(0) + 1);
                                    console.log(currentLeter1 +currentNumber + " first while");
                                    $('#' + currentLeter1 + currentNumber).hide();

                                }

                            }else if((currentLeter1.length == 1) || (currentLeter2.length > 1)){
                                while (currentLeter1[currentLeter1.length - 1] != currentLeter2[currentLeter2.length - 1]) {
                                    currentLeter1 = currentLeter1.slice(0, currentLeter1[currentLeter1.length - 1]) + String.fromCharCode(currentLeter1.charCodeAt(currentLeter1.length - 1) + 1);
                                    if (currentLeter1[currentLeter1.length - 1] == "[") {
                                        currentLeter1 = "AA"
                                    }
                                    $('#' + currentLeter1 + currentNumber).hide();

                                }

                            }
                            //----------------------------------------------------//

                            currentLeter1 =  mass[0].replace(/\d/g, '');
                        }
                    }
            }
        }


        $('#butClose').click(function(){
            FileExcel = null;
            $('.tabs .nav-tabs').empty();
            $('.tabs .tab-content').empty();
        });

        function addList(obj)
        {

            $('.tabs .nav-tabs').empty();
            $('.tabs .tab-content').empty();
            for(var i = 1; i < (obj.sheetCount+1); i++)
            {
                if(i==1) {
                    $('.tabs .nav-tabs').append('<li class="active"><a href="#tab-'+i+'" data-toggle="tab">'+obj.fileLists[i-1].nameList+'</a></li>');
                    $('.tabs .tab-content').append('<div class="tab-pane fade in active" id="tab-' + i + '"><div class="container-fluid"><div class="row"><div class="widScroll">'+createList(obj,i)+'</div></div></div></div>');

                    column(obj.fileLists[i-1]);
                }
                else {
                    $('.tabs .nav-tabs').append('<li><a href="#tab-'+i+'" data-toggle="tab">'+obj.fileLists[i-1].nameList+'</a></li>')
                    $('.tabs .tab-content').append('<div class="tab-pane fade" id="tab-' + i + '"><div class="container-fluid"><div class="row"><div class="widScroll">'+createList(obj,i)+'</div></div></div></div>');

                    column(obj.fileLists[i-1]);
                }
            }
        }

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });


        $('.widScroll table tbody tr th').click(function(){
            alert('s0');
            var thId = $(this).attr('id');
            alert(thId);

        });


        $("#imgLoad").hide();
        $("button").click(function(){
            $("input[type='file']").trigger('click');
        });


        var button = $("#butUpload"), interval, image, widthImg, heightImg, thumbW, thumbH;

        new AjaxUpload(butUpload, {			//команда из библиотеки ajaxupload.js
            action: "upload.php",
            onSubmit: function (file, ext){
                if(ext && /^(xls|xlsx|ods)$/.test(ext)){						// проверка на формат файла, формат выберается здесь - /^(rar|zip|jpg)$/
            //        button.text("Загрузка");
                    this.disable();
                    $("#imgLoad").show();
                } else {
                    alert("Ошибка чтения! Выберите: xls,xlsx,ods. ");
                    return false;
                }

                $.ajax({
                    type: 'POST',
                    url: 'upl',
                    data:({file:file}),
                    success: function(data){

                        FileExcel = JSON.parse(data);
                        //alert(data); //this work
                        addList(FileExcel);
                    //    $('.tab-content').html(data);
                        $('#rangeSize').val('100%');
                        $('#rangeSize').show();
                        $("#imgLoad").hide();
                    }
                });
            },
            onComplete: function(file, response){

                this.enable();

            }
        });

        $('#Export').click(function(){
            $.ajax({
                type: 'POST',
                url: 'export.php',
                data:({FileExcel:FileExcel}),
                success: function(data){
                    alert(data);
                    $('.widScroll').append(data);
                }
            });
        });



        /*$("#butUpload").click(function(){
            var filename = $('#file').val();
            $.ajax({
                type: "POST",
                url: "upload",
                data: filename,
                success: function(data){
                    console.log(data);
                    $('.postRequest').html(data);
                }
            });
        });*/
    }
);
