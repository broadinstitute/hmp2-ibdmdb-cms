/**
 * Javascript code for WMGX visualization summary page
 */

jQuery(document).ready(function(){
    var qc_paired_read_counts_table = $('#qc_filtered_reads_paired_counts_table').DataTable({
        ajax: {
            url: 'data/qc_counts_pairs_table.json',
            dataSrc: ''
        },
        pageLength: 15,
        searching: false,
        deferLoading: 0,
        lengthChange: false,
        scrollCollapse: false,
        columns: [
            {data: 'Sample'},
            {data: 'Raw', render: $.fn.dataTable.render.number( ',', '.', 0)},
            {data: 'Trim', render: $.fn.dataTable.render.number( ',', '.', 0)},
            {data: 'hg38', render: $.fn.dataTable.render.number( ',', '.', 0)},
        ]
    });

    var qc_orphan_read_counts_table = $('#qc_filtered_reads_orphan_counts_table').DataTable({
        ajax: {
            url: 'data/qc_counts_orphans_table.json',
            dataSrc: ''
        },
        pageLength: 15,
        searching: false,
        deferLoading: 0,
        lengthChange: false,
        scrollCollapse: false,
        columns: [
            {data: 'Sample'},
            {data: 'Trim orphan1', render: $.fn.dataTable.render.number( ',', '.', 0)},
            {data: 'Trim orphan2', render: $.fn.dataTable.render.number( ',', '.', 0)},
            {data: 'hg38 orphan1', render: $.fn.dataTable.render.number( ',', '.', 0)},
            {data: 'hg38 orphan2', render: $.fn.dataTable.render.number( ',', '.', 0)}
        ]
    });

    var qc_microbial_prop_table = $('#qc_filtered_reads_microbial_proportion').DataTable({
        ajax: {
            url: 'data/microbial_counts_table.json',
            dataSrc: ''
        },
        pageLength: 15,
        searching: false,
        deferLoading: 0,
        lengthChange: false,
        scrollCollapse: false,
        columns: [
            {data: 'Sample'},
            {data: 'hg38 / Trim'},
            {data: 'hg38 / Raw'}
        ]
    });

    Plotly.d3.json('data/qc_counts_pairs_plot_plotly.json', function(err, fig) {
        fig.layout.title = "Paired-end Reads";

        Plotly.plot('qc_filtered_reads_paired_counts_plotly', fig.data, fig.layout);
    });

    Plotly.d3.json('data/qc_counts_orphans_plot_plotly.json', function(err, fig) {
        fig.layout.title = "Orphans Reads";

        Plotly.plot('qc_filtered_reads_orphan_counts_plotly', fig.data, fig.layout);
    });

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
            {
                data: 'Pathway',
                render: function(data, type, row, meta) {
                    return '<a href="' + get_metacyc_url(data) + '" target="_blank">' + data + '</a>';
                }
            },
            {data: 'Average abundance'},
            {data: 'Variance'}
        ]
    });
 })
