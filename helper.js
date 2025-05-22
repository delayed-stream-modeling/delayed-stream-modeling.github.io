function createAudioHTML(path) {
  return '<audio controls controlslist="nodownload" class="px-1"> <source src=' +
      path +
      ' type="audio/mpeg">Your browser does not support the audio element.</audio>';
}

function generateExampleRow(table_row, base_dir, dirs, filename, col_offset) {
  for (var i = 0; i < dirs.length; i++) {
    let cell = table_row.cells[col_offset + i];
    let p = base_dir + '/' + dirs[i] + '/' + filename;
      if (p.endsWith('txt')) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
          if (this.readyState === this.DONE) {
            cell.innerHTML = '<font size="-1">' + req.responseText + '</font>';
          }
        };
        req.open('GET', p);
        req.send(null);
      } else {
        cell.innerHTML = cell.innerHTML + createAudioHTML(p);
      }
  }
}


function generateLongForm(tableId) {
  let table = document.getElementById(tableId);
  let base_dir = 'data'
  let dirs = ['source', 'generated'];
  let filenames = [
    "malala_yousafzai.mp3",
    "edward_viii_abdication.mp3",
    "degaulle_bayeux.mp3",
    "simone_veil_1974.mp3"
  ];

  for (var i = 0; i < filenames.length; i++) {
    generateExampleRow(table.rows[1 + i], base_dir, dirs, filenames[i], 0);
  }
}

generateLongForm('long-form-table');
