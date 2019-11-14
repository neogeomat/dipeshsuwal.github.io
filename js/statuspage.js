function updateStatus() {
    let col = 2;
    $status = {
        'ANTENNA NAME': [1, 0],
        'SCHEDULE': [3, 3],
        'LOG': [3, 5],

        'TIME': [1, 1],
        'NEXTTIME': [2, 2],
        'HALT': [1, 3],

        'SOURCE': [1, 6],
        'TRACKINGSTATE': [1, 7],
        'AZIMUTH': [4, 11],
        'ELEVATION': [4, 13],

        'RA': [2, 7],
        'DEC': [3, 9],
        'CATALOGYEAR': [3, 10],

        'IFA': [5, 4],
        'IFB': [5, 5],
        'IFC': [5, 6],
        'IFD': [5, 7],

        'CABLE': [4, 9],
        'TEMPERATURE': [1, 5],
        'HUMIDITY': [2, 5],
        'PRESSURE': [3, 7],
        'WINDSPEED': [5, 9],
        'WINDDIRECTION': [5, 11],

        'MODE': [3, 0],
        'RATE': [3, 1],
        'CHECKS': [6, 0]
    };
    // $.mobile.loading('show', {
    //     text: 'Loading',
    //    textVisible: true,
    //    theme: 'z',
    //     html: ""
    //  });
    // $.get('https://cors-anywhere.herokuapp.com/' + 'https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/SystemStatusMonitor.html', function(data) {
    //     $ht = $.parseHTML(data);
    //     console.log($ht);
    // })
    $.get('pages/SystemStatusMonitor.html', function(data) {
        // alert(data);
        // debugger;
        // $w = data.contents;
        // $w = $.parseHTML(data);
        let $ht = $.parseHTML(data);
        let $table = $ht[5]["children"][0];

        // console.log($table.children[row].children[col].textContent);
        $content = $('#StatusPage');
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
        // debugger;
        for (const ele in $status) {
            if ($status.hasOwnProperty(ele)) {
                const element = $status[ele];
                // $('#' + ele + ' span').text($table.children[element[0]].children[element[1]].textContent);
                $block = $('<div>', { class: 'ui-block-' + block_letter });
                $grid.append($block);

                if ($table.children[element[0]].children[element[1]].textContent.localeCompare("  WETTZELL") == 0) {
                    //console.log('Green');
                    $block.append($(`<div style="color:green" class="ui-bar ui-bar-a" id=${ele}>${ele}: 
                                    <span id="" class="ui-li-count">${$table.children[element[0]].children[element[1]].textContent} </span>
                                </div>`));
                } else if ($table.children[element[0]].children[element[1]].textContent.localeCompare("  HALT") == 0) {
                    //console.log('Green');
                    $block.append($(`<div style="color:red" class="ui-bar ui-bar-a" id=${ele}>${ele}: 
                                    <span id="" class="ui-li-count">${$table.children[element[0]].children[element[1]].textContent} </span>
                                </div>`));
                } else {

                    $block.append($(`<div class="ui-bar ui-bar-a" id=${ele}>${ele}: 
                                    <span id="" class="ui-li-count">${$table.children[element[0]].children[element[1]].textContent} </span>
                                </div>`));
                }


            }
        }
        //    $.mobile.loading("hide");
    });
}