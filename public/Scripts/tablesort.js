//https://www.w3schools.com/howto/howto_js_sort_table.asp

function tableSort() {
    //declaring variables
    var table, rows, switching, i, x, y, shouldSwitch;
    //access the table that this function is used for
    table = document.getElementById("ordertable");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {                          //indexing tables rows - td and row index counter
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {     //comparison between consecutive rows
          shouldSwitch = true;                                           //if row[i] is greater than row[i+1] then true
          break;                                                         //AKA row[i] is alphabetically greater than row[i+1] - z vs. a
        }
      }
      if (shouldSwitch) {                                                //if true, then row[i+1] is inserted before
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

