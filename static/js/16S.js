/**
 * Javascript needed for dataset summary 16S taxonomy functionality
 * on the IBDMDB website.
 */

jQuery(document).ready(function() {
    var qc_read_counts_table = $('#qc_filtered_read_counts_table').DataTable({
        ajax: {
            url: 'data/read_counts_final.json',
            dataSrc: ''
        },
        pageLength: 15,
        searching: false,
        deferLoading: 0,
        lengthChange: false,
        scrollCollapse: false,
        columns: [
            {data: 'SampleID'},
            {data: 'Raw', render: $.fn.dataTable.render.number( ',', '.', 0)},
            {data: 'Filtered', render: $.fn.dataTable.render.number( ',', '.', 0)},
            {data: 'Mapped', render: $.fn.dataTable.render.number( ',', '.', 0)},
            {data: 'Unmapped', render: $.fn.dataTable.render.number( ',', '.', 0)},
        ]
    });

    Plotly.d3.json('data/read_counts_final_plotly.json', function(err, fig) {
        fig.layout.title = ""
        Plotly.plot('qc_filtered_16S_read_counts_plotly', fig.data, fig.layout);
    });

    Plotly.d3.json('data/top_genera_avg_abund_plotly.json', function(err, fig) {
        fig.layout.title = "Top 15 genera by average abundance";
        Plotly.plot('tax_top15_genera_avg_abund_plotly', fig.data, fig.layout);
    });

    Plotly.d3.json('data/top_terminal_genera_avg_abund_plotly.json', function(err, fig) {
        fig.layout.title = "Top 15 terminal genera by average abundance";
        Plotly.plot('terminal_tax_top15_genera_avg_abund_plotly', fig.data, fig.layout);
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