/**
 * Javascript needed for dataset summary taxonomy functionality
 * on the IBDMDB website.
 */

 jQuery(document).ready(function(){
    var tax_species_count_table = $('#tax_species_count_table').DataTable({
        ajax: {
            url: 'data/species_counts_table.json',
            dataSrc: ''
        },
        pageLength: 15,
        searching: false,
        deferLoading: 0,
        lengthChange: false,
        scrollCollapse: false,
        columns: [
            {data: 'Sample'},
            {data: 'Total'},
            {data: 'After filter'}
        ]
    });
 })