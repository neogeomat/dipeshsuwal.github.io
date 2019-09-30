function updateStation() {
    let col = 2;
    let $dataA = {
        'Time': [1, 1],
        '70K': [2, 1],
        '20K': [3, 1],
        'Pressure': [4, 1],
        'Amb. Temp.': [5, 1]
    };
    let $dataB = {
        'Time': [1, 1],
        'EFOS18': [2, 1],
        'TAC2': [3, 1]
    };
    let $dataC = {
        'Time': [1, 1],
        'dotmon': [2, 1],
        'Time2': [3, 1],
        'mk5=dot?': [4, 1]
    };    
    let $dataD = {
        'Session': [1, 0],
    };
  
    let $data = {
        'Dewar': $dataA,
        'Master Clock Offset': $dataB,
        'Local Frequency': $dataC
    };
           
//    $.mobile.loading('show', {
//        text: 'Loading',
//        textVisible: true,
//        theme: 'z',
//        html: ""
//    });
    // $.get('https://cors-anywhere.herokuapp.com/' + 'https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/StationMonitoring.html', function(data) {
    //     $ht = $.parseHTML(data);
    //     console.log($ht);
    // })
    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://vlbisysmon.evlbi.wettzell.de/monitoring_archive/fs_web_pages/wettzell/StationMonitoring.html') + '&callback=?', function(data) {
        // alert(data.contents);

        $w = data.contents;
        $ht = $.parseHTML($w);
        // debugger;
        $table = {};

        $dewar_table = $ht[3].children[0].children[0];
        $master_table = $ht[5].children[0].children[0];
        $local_table = $ht[7].children[0].children[0];

        $table['Dewar'] = $dewar_table;
        $table['Master Clock Offset'] = $master_table;
        $table['Local Frequency'] = $local_table;
        
        
        if ($local_table.children[1].children[0].textContent.localeCompare(" No active session! ")==0)
            {
                console.log('No Active');
                
                $data = {
                'Dewar': $dataA,
                'Master Clock Offset': $dataB,
                'Local Frequency': $dataD
                };     
        }
        else
            {
                console.log('Red');
                let $data = {
                'Dewar': $dataA,
                'Master Clock Offset': $dataB,
                'Local Frequency': $dataC
                };   
        }

        // console.log($table.children[row].children[col].textContent);
        $content = $('#stationpage');
        $content.html('');
        switch (col) {
            case 1:
                grid_letter = 'solo';
                block_letter = 'a';
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
            //console.log(title);
            if ($content[0].innerHTML === '') {
                $grid = {};
            }
            $grid[title] = $('<div>', { class: `ui-grid-solo ui-responsive`});
           // $grid[title].append($(`<div>`, { class: `ui-block-${block_letter}`}).html(title));
            
            $grid[title].append($(`<div>`, { class: `ui-block-${block_letter}`}).html(`<div class="ui-bar ui-bar-b">${title}</div>`));
            
            $grid[`${title} body`] = $('<div>', { class: `ui-grid-${grid_letter} ui-responsive` });
            $content.append($grid[title]);
            $content.append($grid[`${title} body`]);

            for (const ele in $row) {
                // debugger;
                // if (ele === '') debugger;
                const elementA = $row[ele];
                // $('#' + ele + ' span').text($table.children[elementA[0]].children[elementA[1]].textContent);
                $block = $('<div>', { class: 'ui-block-' + block_letter });
                $grid[`${title} body`].append($block);
                $block.append($(`<div class="ui-bar ui-bar-a">${ele}: <span class="ui-li-count">${$table[title].children[elementA[0]].children[elementA[1]].textContent} </span></div>`)); // changed here innerhtml to textcontent
                
                //console.log($table[title].children[elementA[0]].children[elementA[1]].textContent);
                
//                if ($table[title].children[elementA[0]].children[elementA[1]].textContent.localeCompare(" No active session! ")==0)
//                    {
//                    console.log(elementA[0]);
//                    console.log('Green');
//                
//                    }
                
            }
            
                
            $content.append($('<br>'));
        }
        // console.log(data);
       // $.mobile.loading("hide");
    });
}