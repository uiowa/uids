// Instantiate tables on the page.
const tables = document.getElementsByTagName('table');

for (let i = 0; i < tables.length; i++) {
    let table = tables[i];
    if(!table.closest('.table-responsive-container')) {

        //Prepare table caption variables.
        let caption_id = '';
        let caption_labeledby = '';
        //If the table catption exists and doesnt have an Id...
        if (table.getElementsByTagName('caption') && !table.getElementsByTagName('caption')[0].id) {
            caption_id = 'table-' + i;
            caption_labeledby = 'aria-labelledby="' + caption_id + '"';

            //Give the caption an Id.
            table.getElementsByTagName('caption')[0].id = caption_id;
        }

        // Wrap the table in a responsive table div, and make sure aria knows what caption labels it, if any.
        wrap(
            '<div class="table-responsive-container" role="region" ' + caption_labeledby + ' tabindex="0">',
            table,
            '</div>'
        );
        
        // // Determine if there are thead TH's without scope.
        // if (table.querySelectorAll('thead tr') && table.querySelectorAll('thead tr')[0].lastElementChild.tagName === 'TH') {
        //     console.log('kjahsdf')
        // };
    }
}

// Wrap any selected HTML with other HTML.
function wrap(top, wrap_object, bottom) {
    var modified = top + wrap_object.outerHTML + bottom;
    wrap_object.outerHTML = modified;
}