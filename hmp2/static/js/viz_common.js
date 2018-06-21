/**
 * Common functions that are used in any dataset summary/viz pages
 */

 function get_metacyc_url(pathway) {
     /**
      * Takes a pathway string in format PATHWAY ID: PATHWAY NAME and generates
      * a valid metacyc URL.
      */
    var metacyc_query_url = "https://metacyc.org/META/NEW-IMAGE?type=NIL&object="
    var pathway_elts = pathway.split(':')

    return metacyc_query_url + pathway_elts[0]
 }