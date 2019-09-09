function updateAntenna() {
    let col = 2;
    let $rtw = [1, 0];
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
    $.mobile.loading('show', {
        text: 'Loading',
        textVisible: true,
        theme: 'z',
        html: ""
    });
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


        for (const title in $data) {
            const $row = $data[title];
            if ($content[0].innerHTML === '') {
                $content.append($(`<span>`).html(`${$table.children[$rtw[0]].children[$rtw[1]].innerHTML}`));
                $grid = {};
            }
            $grid[title] = $('<div>', { class: `ui-grid-solo ui-responsive` });
            $grid[title].append($(`<div>`, { class: 'ui-block-' + block_letter }).html(title));
            $grid[`${title} body`] = $('<div>', { class: `ui-grid-${grid_letter} ui-responsive` });


            for (const ele in $row) {
                // debugger;
                // if (ele === '') debugger;
                const elementA = $row[ele];
                // $('#' + ele + ' span').text($table.children[elementA[0]].children[elementA[1]].textContent);
                $block = $('<div>', { class: 'ui-block-' + block_letter });
                $grid[`${title} body`].append($block);
                $block.append($(`<div class="ui-bar ui-bar-a" id=${ele}>${ele}: <span id="" class="ui-li-count">${$table.children[elementA[0]].children[elementA[1]].innerHTML} </span></div>`));
            }
            $content.append($grid[title]);
            $content.append($grid[`${title} body`]);
            $content.append($('<br>'));
        }
        // console.log(data);
        $.mobile.loading("hide");
    });
}