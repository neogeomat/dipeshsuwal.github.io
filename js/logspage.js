function updateLogs() {
    //var alpha = document.getElementById("Error");
    //div.scrollTop = div.scrollHeight - div.clientHeight;
    //alpha.scrollIntoView(false);
    //alpha.scrollTop = alpha.scrollHeight;
    
    let col = 2;
    $logstatus = {
        'Error': [1, 1],
        'Logs': [2, 1]
    };
//    $.mobile.loading('show', {
//        text: 'Loading',
//        textVisible: true,
//        theme: 'z',
//        html: ""
//    });
    // $.get('https://cors-anywhere.herokuapp.com/' + 'https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/Log.html', function(data) {
    //     $ht = $.parseHTML(data);
    //     console.log($ht);
    // })
    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/Log.html') + '&callback=?', function(data) {
        // alert(data.contents);

        $w = data.contents;
        $ht = $.parseHTML($w);
        $table = $ht[4].children[0].children[0];

        // console.log($table.children[row].children[col].textContent);
        $content = $('#logspage');
        $content.html('');
        switch (col) {
            case 1:
                grid_letter = 'solo';
                block_letter = 'b';
                break;
            case 2:
                grid_letter = 'a';
                block_letter = 'b';
                break;
            case 3:
                grid_letter = 'b';
                block_letter = 'c';
                break;
            case 4:
                grid_letter = 'c';
                block_letter = 'd';
                break;
            default:
                grid_letter = 'a';
                block_letter = 'b';
                break;
        }
        $grid = $('<div>', { class: `ui-grid-${grid_letter} ui-responsive` });
        $content.append($grid);
        //$content.append('<br>');
        // debugger;
        for (const ele in $logstatus) {
            if ($logstatus.hasOwnProperty(ele)) {
                const element = $logstatus[ele];
                //console.log($table.children[element[0]].children[element[1]].textContent);
                //console.log($table.children[element[0]].children[element[1]].innerHTML);
                
                // $('#' + ele + ' span').text($table.children[element[0]].children[element[1]].textContent);
                
               
                
                
                $block = $('<div>', { class: 'ui-block-' + block_letter });
                $grid.append($block);
                
                $block.append($(`<div class="ui-bar ui-bar-b">${ele}</div>`));
                
                

                $block.append($(`<div class="ui-bar ui-bar-a" id=${ele} style="overflow-y:auto; overflow-x:hidden; height:225px; ">${$table.children[element[0]].children[element[1]].children[0].innerHTML} </span></div>`));
                $block.append('<br>');
                

                //$('#Error').scrollTop($('#Error')[0].scrollHeight);
                //$('#Logs').scrollTop($('#Logs')[0].scrollHeight);
                //Comment: How to perform action on id=${ele}, I tried but couldn't. Just need to perform above action.
                
                
            }
            
            // $grid.append('<br>');
            
            if (ele.localeCompare("Error")==0){
                    console.log(ele);
                    $('#Error').scrollTop($('#Error')[0].scrollHeight);
                    }
                    
           
            
            else if (ele.localeCompare("Logs")==0){
                     console.log(ele);
                    $('#Logs').scrollTop($('#Logs')[0].scrollHeight);
                    }
            
        }
      //  $.mobile.loading("hide");
    });
}