/**
 * Functional profiling dataset summary javascript code and functions.
 */

 jQuery(document).ready(function(){
    var func_pathways_count_table = $('#func_pathways_count_table').DataTable({
        ajax: {
            url: 'data/all_average_pathways_names.json',
            dataSrc: ''
        },
        pageLength: 15,
        searching: false,
        deferLoading: 0,
        lengthChange: false,
        scrollCollapse: false,
        columns: [
            {data: 'Pathway'},
            {data: 'Average abundance'},
            {data: 'Variance'}
        ]
    });
 })