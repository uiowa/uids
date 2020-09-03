// Initialize table observer.
const table_observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
    { threshold: [1] }
);

document.addEventListener("DOMContentLoaded", function () {
    // Instantiate tables on the page.
    const tables = document.querySelectorAll('table:not(.table-static)');

    for (let i = 0; i < tables.length; i++) {
        let table = tables[i];
        if (!table.closest('.table-responsive-container')) {
            // Set table header HTML for future use.
            let header_HTML = '';

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

            // Determine if there are thead TH's without scope.
            if (table.querySelectorAll('thead tr th')[0] && table.querySelectorAll('thead tr')[0].lastElementChild.tagName === 'TH') {
                let theads = table.querySelectorAll('thead tr th');
                for (let j = 0; j < theads.length; j++) {
                    let thead = theads[j];
                    if (!thead.hasAttribute('scope')) {

                        // If they dont have the scope attribute, give thema  scope of "col".
                        thead.setAttribute('scope', 'col');
                        thead.classList.add("invisible-header");
                        thead.setAttribute('data-table-heading', 't-' + i + '-h-' + j);

                        // Give the html to header_HTML for later usage.
                        header_HTML = header_HTML +
                            '<div class="track-heading" data-scroller-heading="t-' + i + '-h-' + j + '">\
                                <div class="text-positioner">' + 
                                    thead.innerHTML + 
                                '</div>\
                            </div>'
                        ;
                    };
                }
            };

            // Determine if there are tbody TH's without scope.
            let trows = table.querySelectorAll('tbody tr');
            for (let j = 0; j<trows.length; j++) {
                let trow = trows[j];
                if (trow.firstElementChild && trow.firstElementChild.tagName === 'TH' && !trow.firstElementChild.hasAttribute('scope')) {

                    // If they dont have the scope attribute, give thema  scope of "row".
                    trow.firstElementChild.setAttribute('scope', 'row');
                };
            }

            // Create the header scroller with the header html we saved a while back.
            let header_scroller = '\
            <div id="headers-table-' + i + '" class="headers-table" aria-hidden="true">\
                <div class="scroller syncscroll" name="sync-table-' + i + '">\
                    ' + header_HTML + '\
                </div>\
            </div>';

            // Wrap the table in a responsive table div, and make sure aria knows what caption labels it, if any.
            // This should be done last as to not mess up any scoping of previous functions.
            let classes = table.classList.contains('is-striped')? 'is-striped': '';
            table.outerHTML = 
                '<div id="table-responsive-' + i + '" class="table-responsive-container ' + classes +'" role="region" ' + caption_labeledby + ' tabindex="0">' + 
                    header_scroller +
                    '<div class="table-container syncscroll" name="sync-table-' + i + '">' +
                        table.outerHTML +
                    '</div>' +
                '</div>'
            ;

            let table_bounding_box_selector = document.querySelector('#table-responsive-' + i);
            let table_bounding_box_selector_table_container = table_bounding_box_selector.querySelector('.table-container');

            // Resize the visible headers every window resize and when the page is first rendered.
            window.addEventListener('resize', function () {
                resizeScrollerheaders(i);
            });
            resizeScrollerheaders(i);

            document.addEventListener('scroll', throttle(tableSetStickyHeaders, table_bounding_box_selector, 300));
            table_bounding_box_selector_table_container.addEventListener('scroll', throttle(tableSetStickyHeaders, table_bounding_box_selector, 50));
            tableSetStickyHeaders(table_bounding_box_selector);
        }
    }
});

// This function resizes the headers for a given table "i".
function resizeScrollerheaders(i) {
    let invisible_headers = document.querySelectorAll('#headers-table-' + i + ' + .table-container table .invisible-header');
    for (let j = 0; j < invisible_headers.length; j++) {
        let header = invisible_headers[j]
        let header_tag = header.getAttribute('data-table-heading');
        let header_width = header.offsetWidth;
        let header_height = header.offsetHeight;
        let visible_header = document.querySelector('#headers-table-' + i + ' [data-scroller-heading="' + header_tag + '"]');
        visible_header.style.width = header_width + 'px';
        visible_header.style.height = (header_height + 1) + 'px';
    }
    let table_container = document.querySelector('#headers-table-' + i + ' + .table-container');
    let thead_height = table_container.querySelector('table thead').offsetHeight;
    table_container.style.marginTop = '-' + (thead_height + 1) + 'px';
}

/*!
 * Check if an element is out of the viewport
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}  elem The element to check
 * @return {Object}     A set of booleans for each side of the element
 */
function tableSetStickyHeaders(elem) {

    let elem_table = elem.querySelector('.table-container table');

    // Get element's bounding.
    var bounding = elem_table.getBoundingClientRect();

    // Check if it's out of the viewport on each side.
    var out = {};
    out.top = bounding.top < 0;
    out.left = bounding.left < -10;
    // out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
    // out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
    // out.any = out.top || out.left || out.bottom || out.right;
    // out.all = out.top && out.left && out.bottom && out.right;

    // Check if the top bounding box is out and if it is then assign appropriate class.
    if (out.top) {
        elem.classList.add('isSticky-Top');
    }
    else {
        elem.classList.remove('isSticky-Top');
    }

    // Check if the left bounding box is out and if it is then assign appropriate class.
    if (out.left) {
        elem.classList.add('isSticky-Left');
    }
    else {
        elem.classList.remove('isSticky-Left');
    }
};

// For throttling scroll functions.
function throttle(fn, argument, wait) {
    var time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn(argument);
            time = Date.now();
        }
    }
}

// This is the copied syncscroll script needed to maintain syncronized scrolling between the table and the viaual headers.
// https://github.com/asvd/syncscroll
!function (e, n) { "function" == typeof define && define.amd ? define(["exports"], n) : n("undefined" != typeof exports ? exports : e.syncscroll = {}) }(this, function (e) { var n = "Width", t = "Height", o = "Top", r = "Left", f = "scroll", i = "client", s = "EventListener", d = "add" + s, c = "length", a = Math.round, u = {}, l = function () { var e, l, p, y, m, h = document.getElementsByClassName("sync" + f); for (m in u) if (u.hasOwnProperty(m)) for (e = 0; e < u[m][c]; e++)u[m][e]["remove" + s](f, u[m][e].syn, 0); for (e = 0; e < h[c];)if (y = l = 0, p = h[e++], m = p.getAttribute("name")) { for (p = p[f + "er"] || p; l < (u[m] = u[m] || [])[c];)y |= u[m][l++] == p; y || u[m].push(p), p.eX = p.eY = 0, function (e, s) { e[d](f, e.syn = function () { var d, l = u[s], p = e[f + r], y = e[f + o], m = p / (e[f + n] - e[i + n]), h = y / (e[f + t] - e[i + t]), v = p != e.eX, g = y != e.eY, X = 0; for (e.eX = p, e.eY = y; X < l[c];)d = l[X++], d != e && (v && a(d[f + r] - (p = d.eX = a(m * (d[f + n] - d[i + n])))) && (d[f + r] = p), g && a(d[f + o] - (y = d.eY = a(h * (d[f + t] - d[i + t])))) && (d[f + o] = y)) }, 0) }(p, m) } }; "complete" == document.readyState ? l() : window[d]("load", l, 0), e.reset = l });