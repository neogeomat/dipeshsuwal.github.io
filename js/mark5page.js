function updateMark5() {
    let col = 2;
    $dataA = {
        'NAME': [2, 1],
        'VSN': [2, 2],
        'TIME': [2, 3],
        'GB': [2, 4],
        '%': [2, 5],
        'Check UT': [2, 6]
    };
    let $dataB = {
        'NAME': [4, 1],
        'VSN': [4, 2],
        'TIME': [4, 3],
        'GB': [4, 4],
        '%': [4, 5],
        'Check UT': [4, 6]
    };
    $.mobile.loading('show', {
        text: 'Loading',
        textVisible: true,
        theme: 'z',
        html: ""
    });
    // $.get('https://cors-anywhere.herokuapp.com/' + 'https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/Mark5RemainingCapacity.html', function(data) {
    //     $ht = $.parseHTML(data);
    //     console.log($ht);
    // })
    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/Mark5RemainingCapacity.html') + '&callback=?', function(data) {
        // alert(data.contents);

        $w = data.contents;
        $ht = $.parseHTML($w);
        $table = $ht[3]["children"][0];

        // console.log($table.children[row].children[col].textContent);
        $content = $('#mark5page');
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
        $gridA = $('<div>', { class: `ui-grid-${grid_letter} ui-responsive` });
        $content.append($gridA);
        // debugger;
        for (const ele in $dataA) {
            // debugger;
            // if (ele === '') debugger;
            const elementA = $dataA[ele];
            // $('#' + ele + ' span').text($table.children[elementA[0]].children[elementA[1]].textContent);
            $block = $('<div>', { class: 'ui-block-' + block_letter });
            $gridA.append($block);
            $block.append($(`<div class="ui-bar ui-bar-a" id=${ele}>${ele}: <span id="" class="ui-li-count">${$table.children[elementA[0]].children[elementA[1]].innerHTML} </span></div>`));
        }
        $content.append($('<br>'));
        $gridB = $('<div>', { class: `ui-grid-${grid_letter} ui-responsive` });
        $content.append($gridB);
        for (const ele in $dataB) {
            if ($dataB.hasOwnProperty(ele)) {
                const elementB = $dataB[ele];
                $block = $('<div>', { class: 'ui-block-' + block_letter });
                $gridB.append($block);
                $block.append($(`<div class="ui-bar ui-bar-a" id=${ele}>${ele}: <span id="" class="ui-li-count">${$table.children[elementB[0]].children[elementB[1]].innerHTML} </span></div>`));
            }
        }
        // console.log(data);
        $.mobile.loading("hide");
    });
}