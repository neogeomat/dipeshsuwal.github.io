function updateLogs() {
    let col = 2;
    $status = {
        'Error': [1, 1],
        'Logs': [2, 1]
    };
    $.mobile.loading('show', {
        text: 'Loading',
        textVisible: true,
        theme: 'z',
        html: ""
    });
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
        // debugger;
        for (const ele in $status) {
            if ($status.hasOwnProperty(ele)) {
                const element = $status[ele];
                // $('#' + ele + ' span').text($table.children[element[0]].children[element[1]].textContent);
                $block = $('<div>', { class: 'ui-block-' + block_letter });
                $grid.append($block);

                $block.append($(`<div class="ui-bar ui-bar-a" id=${ele}>${ele}:</br>${$table.children[element[0]].children[element[1]].children[0].innerHTML} </span></div>`));
            }
        }
        $.mobile.loading("hide");
    });
}