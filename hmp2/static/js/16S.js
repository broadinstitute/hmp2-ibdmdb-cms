/**
 * Javascript needed for dataset summary 16S taxonomy functionality
 * on the IBDMDB website.
 */

jQuery(document).ready(function() {
    Plotly.d3.json('data/top_genera_avg_abund.json', function(err, fig) {
        fig.layout.title = "Top 15 genera by average abundance";
        Plotly.plot('tax_top15_genera_avg_abund_plotly', fig.data, fig.layout);
    });

    Plotly.d3.json('data/top_terminal_genera_avg_abund.json', function(err, fig) {
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