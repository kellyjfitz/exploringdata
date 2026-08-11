<!--
@component
This is your page!
-->
<script>
  import { base } from '$app/paths';
  // Import all the news furniture components
  import DatabaseHeader from '$lib/components/Data/DatabaseHeader.svelte';
  import ArticleBody from '$lib/components/Article/ArticleBody.svelte';
  import ArticleHeader from '$lib/components/Article/ArticleHeader.svelte';
  import Blockquote from '$lib/components/Article/Blockquote.svelte';
  import Image from '$lib/components/Media/Image.svelte';
  import CardGrid from '$lib/components/Data/CardGrid.svelte'; 
  import Card from '$lib/components/Data/Card.svelte';
  import Map from '$lib/components/Maps/Map.svelte';
  import MapLayer from '$lib/components/Maps/MapLayer.svelte';
  import DropdownInput from '$lib/components/Forms/DropdownInput.svelte';
  
  // Article metadata
  let headline = 'Exploring data';
  let description = 'Finding interesting public data'
  let leadImage = `${base}/photos/chart.png`


  //let {data} = $props();
  

</script>

<!-- This sets the page title in the browser tab -->
<svelte:head>
  <title>{headline}</title>
  <meta
    name="description"
    content={description}
  />
</svelte:head>
 

<div class="container">
  <ArticleHeader
    headline={headline}
  />

  <Image
    src={leadImage}
    credit="Image by janjf93/Pixabay"
  />

  <ArticleBody>
    <p class="dropcap">
      This site is a work in progress, but is intended to be a place to surface interesting data in different ways.
    </p>
    <p>
      It will be sparse to begin with.    
    </p>
  
  </ArticleBody>
</div>
<style lang="scss">

  </style>
