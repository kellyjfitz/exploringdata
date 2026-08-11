// Page settings
// These values are passed to the layout to control what appears on the page.
import geosites from '$lib/data/Geoheritage.points.json';
import regions from '$lib/data/DBCA_Region_Boundaries.json';

export function load() {
  return {
    features: geosites.features,
    regions: regions.features,
    // Set to false to hide the  header
    showHeader: true,
    // Set to false to hide the site footer
    showFooter: true,
  };
}
