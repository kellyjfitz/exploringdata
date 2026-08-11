<!--
@component
This is your page!
-->
<script>
  // Import all the news furniture components
  import DatabaseHeader from '$lib/components/Data/DatabaseHeader.svelte';
  import ArticleBody from '$lib/components/Article/ArticleBody.svelte';
  import CardGrid from '$lib/components/Data/CardGrid.svelte'; 
  import Card from '$lib/components/Data/Card.svelte';
  import Map from '$lib/components/Maps/Map.svelte';
  import MapLayer from '$lib/components/Maps/MapLayer.svelte';
  import DropdownInput from '$lib/components/Forms/DropdownInput.svelte';
  
  // Article metadata
  let headline = 'GeoHeritage sites in WA';
  let description = 'Explore natural features in Western Australia which have significant geoscientific and educational value'
  let byline = 'Based on Department of Mines, Petroleum and Exploration material';

  let {data} = $props();
  let regions = $derived([...new Set(data.features.map(feat => feat.properties.region))].sort());
  let selectedRegion = $state("");
  let filteredSites = $derived(
    data.features.filter(feat => 
    {
      if (selectedRegion !== "" && feat.properties.region !== selectedRegion) return false;
      return true;
    }
    )
  )
  let pointData = $derived({
type: 'FeatureCollection',
features: filteredSites
});
let regionBoundaries = $derived(data.regions);
let numResults = $derived(
  filteredSites.length === 1 ? 'One result' : `${filteredSites.length} results`
);

let regionToShow = $derived({
  type: 'FeatureCollection',
  features: regionBoundaries.filter(feat => {
  if (selectedRegion !== '' && feat.properties.drg_region_name !== selectedRegion) return false;
  return true;
  })
});

let regionPaint = {'fill-color': '#2E8B57', 'fill-opacity': 0.25}
let regionPairs = $derived(
  regions.map((region) => ({
  value: region,
  label: region
  }))
);

</script>

<!-- This sets the page title in the browser tab -->
<svelte:head>
  <title>{headline} | GeoHeritage sites in WA</title>
  <meta
    name="description"
    content="GeoHeritage sites in Western Australia."
  />
</svelte:head>
 

<div class="container">
  <DatabaseHeader headline={headline} description={description} byline={byline}/>

    <ArticleBody>
      <br/>
      <p>Click on map points for more information. Use the dropdown list under the map to filter to a region.</p>
  </ArticleBody> 
  <Map id="waMap" theme="liberty" zoom=3.8>
    <MapLayer id="siteLayer" data={pointData} popup={(feature) => {
      const p = feature.properties;
      return `<strong>${p.GEONAME}</strong><br/>${p.GEOL_DESC}`;
    }}>
    </MapLayer>
    <MapLayer id="regionLayer" data={regionToShow} type={"fill"} paint={regionPaint}></MapLayer>
  </Map>

  <div class=dropdown-wrapper>
    <DropdownInput options={regionPairs} label={numResults} placeholder={'Choose a region'} bind:value={selectedRegion}>
    </DropdownInput>
  </div>
  <CardGrid>
    {#each filteredSites as feature}
      <Card>
        <h3>{feature.properties.GEONAME}</h3>
        <p><strong>Description:</strong> {feature.properties.GEOL_DESC}</p>
        <p><strong>Age:</strong> {feature.properties.GEOL_AGE}</p>
        <p><strong>Tectonic unit:</strong> {feature.properties.TECT_UNIT}</p>
        <p><strong>Significance:</strong> {feature.properties.SIG_DESC}</p>
        <p><strong>Region:</strong> {feature.properties.region}</p>
      </Card>
    {/each}
  </CardGrid>

</div>
<style lang="scss">
 
  .dropdown-wrapper {
    margin-bottom: 20px;
  }
  </style>
