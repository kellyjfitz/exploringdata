<script>
  import LocatorMap from '$lib/components/Maps/LocatorMap.svelte';


  let { feature, id = 'mini', height = 140, zoom = 8 } = $props();

  const data = $derived({
    type: 'FeatureCollection',
    features: feature ? [feature] : []
  });

  const center = $derived.by(() => {
    const g = feature?.geometry;
    if (!g) return [115.86, -31.95];
    if (g.type === 'Point') return g.coordinates;

    let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
    const visit = ([lng, lat]) => {
      minLng = Math.min(minLng, lng); minLat = Math.min(minLat, lat);
      maxLng = Math.max(maxLng, lng); maxLat = Math.max(maxLat, lat);
    };

    if (g.type === 'Polygon') g.coordinates.forEach(r => r.forEach(visit));
    if (g.type === 'MultiPolygon') g.coordinates.forEach(p => p.forEach(r => r.forEach(visit)));

    return Number.isFinite(minLng) ? [(minLng + maxLng) / 2, (minLat + maxLat) / 2] : [115.86, -31.95];
  });
</script>

<LocatorMap
  longitude={center[0]}
  latitude={center[1]}
  zoom={13}
  theme="liberty"
  dot={true}
/>
