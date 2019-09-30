function updateAntenna() {
    let col = 3;
    let $rtw = [1, 0];
    let $radioSource = [2, 1];
    let $dataA = {
        'Azimuth': [3, 0],
        'Elevation': [3, 2]
    };
    let $dataB = {
        'Azimuth': [5, 0],
        'Elevation': [5, 2]
    };
    let $dataC = {
        'Azimuth': [6, 0],
        'Elevation': [6, 2]
    };
    let $dataD = {
        'Azimuth': [7, 0],
        'Elevation': [7, 2]
    };

    let $data = {
        'Actual Pos': $dataA,
        'Commanded Pos': $dataB,
        'NASA FS Pos': $dataC,
        'Com Pos Offset': $dataD
    };

//    $.mobile.loading('show', {
//        text: 'Loading',
//        textVisible: true,
//        theme: 'z',
//        html: ""
//    });
    // $.get('https://cors-anywhere.herokuapp.com/' + 'https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/Antenna.html', function(data) {
    //     $ht = $.parseHTML(data);
    //     console.log($ht);
    // })
    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/Antenna.html') + '&callback=?', function(data) {
        // alert(data.contents);

        $w = data.contents;
        $ht = $.parseHTML($w);
        $table = $ht[3]["children"][0];

        // console.log($table.children[row].children[col].textContent);
        $content = $('#antennapage');
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

        if ($content[0].innerHTML === '') {
            // $content.append($(`<span>`).html(`${$table.children[$rtw[0]].children[$rtw[1]].innerHTML}`));
            // $content.append($(`<span>`).html(`${$table.children[$radioSource[0]].children[$radioSource[1]].innerHTML}`));
             $content.append($(`<span>`).html(`${$table.children[$rtw[0]].children[$rtw[1]].innerHTML}`));
             $content.append($('</br>'));
             $content.append($(`<span>`).html(`<b>Radio<b>${$table.children[$radioSource[0]].children[$radioSource[1]].innerHTML}`));
             $content.append($('</br>'));
             $content.append($('</br>'));
            
            $grid = {};
/*          $grid[`xtrainfo`] = $('<div>', { class: `ui-grid-${grid_letter}` });
            $grid[`xtrainfo`].append($(`<div>`, { class: 'ui-block-' + block_letter }).html(`${$table.children[$rtw[0]].children[$rtw[1]].innerHTML}`));
            $grid[`xtrainfo`].append($(`<div>`, { class: 'ui-block-' + block_letter }).html(`<b>Radio<b> ${$table.children[$radioSource[0]].children[$radioSource[1]].innerHTML}`));
            $content.append($grid[`xtrainfo`]);*/

            $grid[`head`] = $('<div>', { class: `ui-grid-${grid_letter}` });
            $grid[`head`].append($(`<div>`, { class: 'ui-block-' + block_letter }).html(`<div class="ui-bar ui-bar-b">Position</div>`));


            // $ui_table = $('<table data-role="table" data-mode="columntoggle" id="my-table">');
            // $ui_table.appendTo($content);
            for (const $th in $dataA) {
                // debugger;
                $grid[`head`].append($(`<div>`, { class: 'ui-block-' + block_letter }).html(`<div class="ui-bar ui-bar-b">${$th}</div>`));

                // $ui_table_th = $(`<th>${$th}</th>`).append($ui_table);
            }
            $content.append($grid[`head`]);

        }
        for (const title in $data) {
            const $row = $data[title];

            // $grid[`head`] = $('<div>', { class: `ui-grid-solo` });
            // $grid[`head`] = $('<div>', { class: `ui-grid-${grid_letter}` });
            $grid[`head`].append($(`<div>`, { class: 'ui-block-' + block_letter }).html(`<div class="ui-bar ui-bar-a" style = "height:2em;">${title}</div>`));

            for (const ele in $row) {
                // debugger;
                // if (ele === '') debugger;
                const elementA = $row[ele];
                // $('#' + ele + ' span').text($table.children[elementA[0]].children[elementA[1]].textContent);
                $block = $('<div>', { class: 'ui-block-' + block_letter });
                $grid[`head`].append($block);
                $block.append($(`<div class="ui-bar ui-bar-a" style = "height:2em;">${$table.children[elementA[0]].children[elementA[1]].innerHTML}</div>`));

            }
            $content.append($grid[`head`]);
        }
        $content.append($('</br>'));

        // status part starts here
        let $statusMessage = {
            'Status Messages': [
                [10, 1],
                [10, 0],
                [10, 2]
            ],
            'Error Messages': [
                [12, 1],
                [12, 0],
                [12, 2]
            ]
        };

        let $errorMessage = {
            'Error Messages': [12, 0, 12, 1, 12, 2]
        }

        // debugger;
        for (const ele in $statusMessage) {
            $grid = $('<div>', { class: `ui-grid-c` });
            $content.append($grid);
            $block = $('<div>', { class: 'ui-block-d' });
            $grid.append($block);
            $block.append($(`<div class="ui-bar ui-bar-a" style = "height:10em;">${ele}</br></span></div>`));
            if ($statusMessage.hasOwnProperty(ele)) {
                const messages = $statusMessage[ele];
                // $('#' + ele + ' span').text($table.children[element[0]].children[element[1]].textContent);
                for (message in messages) {
                    element = messages[message];
                    $block = $('<div>', { class: 'ui-block-d' });
                    $grid.append($block);
                    $block.append($(`<div class="ui-bar ui-bar-a"  style="overflow-y:scroll; overflow-x:hidden; height:10em;">${$table.children[element[0]].children[element[1]].children[0].children[0].innerHTML} </span></div>`));
                    //$('#b').scrollTop($('#b')[0].scrollHeight);
                };

            }
        }
        // for (const ele in $errorMessage) {
        //     if ($errorMessage.hasOwnProperty(ele)) {
        //         const element = $errorMessage[ele];
        //         // $('#' + ele + ' span').text($table.children[element[0]].children[element[1]].textContent);
        //         $block = $('<div>', { class: 'ui-block-b' });
        //         $grid.append($block);

        //         $block.append($(`<div class="ui-bar ui-bar-a" id=${ele}>${ele}:</br>${$table.children[element[0]].children[element[1]].children[0].innerHTML} </span></div>`));
        //     }
        // }
        // antenna image
        // $image = $('<img src = "https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/WebCamImage.jpg"></img>');
        // $content.append($image);

      //  $.mobile.loading("hide");
    });
}