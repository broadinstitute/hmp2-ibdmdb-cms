/**
 * Javascript needed for dataset summary MVX page on the IBDMDB website.
 */

jQuery(document).ready(function() {
    var qc_read_counts_table = $('#qc_filtered_reads_counts_table').DataTable({
        ajax: {
            url: 'data/HMP2.Virome.VirMAP_Stats.json',
            dataSrc: ''
        },
        pageLength: 15,
        searching: false,
        deferLoading: 0,
        lengthChange: false,
        scrollCollapse: false,
        columns: [
            {data: 'Sample'},
            {data: 'Raw Reads', render: $.fn.dataTable.render.number( ',', '.', 0)},
            {data: 'Trimmed Reads', render: $.fn.dataTable.render.number( ',', '.', 0)},
            {data: 'Viral Reads', render: $.fn.dataTable.render.number( ',', '.', 0)}
        ]
    });

    var qc_proportions_table = $('#qc_filtered_reads_viral_proportion').DataTable({
        ajax: {
            url: 'data/viral_read_proportions.json',
            dataSrc: ''
        },
        pageLength: 15,
        searching: false,
        deferLoading: 0,
        lengthChange: false,
        scrollCollapse: false,
        columns: [
            {data: 'Sample'},
            {data: 'raw_proportion'},
            {data: 'trim_proportion'}
        ]
    });

    var qc_proportions_table = $('#metaphlan2_tax_species_count_table').DataTable({
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

    var qc_proportions_table = $('#tax_species_count_table').DataTable({
        ajax: {
            url: 'data/species_counts_table_virmap.json',
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


    Plotly.d3.json('data/HMP2.Virome.VirMAP_Stats_plotly.json', function(err, fig) {
        fig.layout.title = "Viral Reads"
        Plotly.plot('qc_filtered_viral_read_counts_plotly', fig.data, fig.layout);
    });

    $('.plotly').each(function() {
        $(this).on('plotly_afterplot', function() {
            var resized = $(this).attr('data-plot-resized');
            if (resized == "false") {
                var d3 = Plotly.d3;
                var gd3 = d3.select("div[id='" + $(this).attr('id') + "']");
                var gd = gd3.node();

                var correct_div_width = $('#qc_tab').innerWidth();
                Plotly.relayout(gd, { width: correct_div_width });

                $(this).attr('data-plot-resized', 'true');
            }
        });
    });
 })