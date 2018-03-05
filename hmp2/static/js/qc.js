/**
 * Javascript needed for dataset summary qc functionality
 * on the IBDMDB website.
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
            {data: 'Raw'},
            {data: 'Trim'},
            {data: 'hg38'},
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
            {data: 'Trim orphan1'},
            {data: 'Trim orphan2'},
            {data: 'hg38 orphan1'},
            {data: 'hg38 orphan2'}
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

    Plotly.d3.json('data/qc_counts_pairs_plot.json', function(err, fig) {
        fig.layout.title = "DNA Paired-end Reads";

        Plotly.plot('qc_filtered_reads_paired_counts_plotly', fig.data, fig.layout);
    });

    Plotly.d3.json('data/qc_counts_orphans_plot.json', function(err, fig) {
        fig.layout.title = "DNA Orphans Reads";

        Plotly.plot('qc_filtered_reads_orphan_counts_plotly', fig.data, fig.layout);
    });

 })