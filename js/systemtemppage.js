function updateSystemTemp() {
    let col = 4;
    const nooftemps = 16; //no od rows in grid B
    $tempSys = {
        'IFA': [1, 1],
        'IFB': [1, 3],
        'IFC': [2, 1],
        'IFD': [2, 3]
    };
    $dataB = {
        'BBC': [4, 0],
        'Freq': [4, 1],
        'Ts-U': [4, 2],
        'Ts-L': [4, 3]
    };
//    $.mobile.loading('show', {
//        text: 'Loading',
//        textVisible: true,
//        theme: 'z',
//        html: ""
//    });
    // $.get('https://cors-anywhere.herokuapp.com/' + 'https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/SystemTemperatures.html', function(data) {
    //     $ht = $.parseHTML(data);
    //     console.log($ht);
    // })
    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/SystemTemperatures.html') + '&callback=?', function(data) {
        // alert(data.contents);

        $w = data.contents;
        $ht = $.parseHTML($w);
        $table = $ht[3]["children"][0];

        // console.log($table.children[row].children[col].textContent);
        $content = $('#systemtemppage');
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
        $gridA = $('<div>', {
            class: `ui-grid-${grid_letter}`
        });
        $content.append($gridA);
        // debugger;
        for (const ele in $tempSys) {
            // debugger
            // if (ele === '') debugger;
            const elementA = $tempSys[ele];
            // $('#' + ele + ' span').text($table.children[elementA[0]].children[elementA[1]].textContent);
            $block = $('<div>', { class: 'ui-block-' + block_letter });
            $gridA.append($block);
            $block.append($(`<div class="ui-bar ui-bar-b" id=${ele}>${ele}</div>`));
        }
        for (const ele in $tempSys) {
            // debugger
            // if (ele === '') debugger;
            const elementA = $tempSys[ele];
            // $('#' + ele + ' span').text($table.children[elementA[0]].children[elementA[1]].textContent);
            $block = $('<div>', { class: 'ui-block-' + block_letter });
            $gridA.append($block);
            $block.append($(`<div class="ui-bar ui-bar-a"><span id="">${$table.children[elementA[0]].children[elementA[1]].innerHTML} </span></div>`));
        }


        $content.append($('<br>'));
        $gridB = $('<div>', { class: `ui-grid-${grid_letter}` });
        $content.append($gridB);
        for (const ele in $dataB) {
            const elementB = $dataB[ele];
            $block = $('<div>', { class: 'ui-block-' + block_letter });
            $gridB.append($block);
            $block.append($(`<div class="ui-bar ui-bar-b" id=${ele}>${ele}</div>`));
        }
        for (let i = 0; i < nooftemps; i++) {
            for (const ele in $dataB) {
                const elementB = $dataB[ele];
                $block = $('<div>', { class: 'ui-block-' + block_letter });
                $gridB.append($block);
                $block.append($(`<div class="ui-bar ui-bar-a"><span id="">${$table.children[elementB[0]+i].children[elementB[1]].innerHTML} </span></div>`));
            }
        }
        // console.log(data);
      //  $.mobile.loading("hide");
    });
}