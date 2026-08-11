import fs from 'node:fs/promises';
import path from 'node:path';

// Input files
const geositePath = path.resolve('src/lib/data/Geoheritage.json');
const regionPath = path.resolve('src/lib/data/DBCA_Region_Boundaries.json');
// Output file
const outputPath = path.resolve('src/lib/data/Geoheritage.points.json');

// Compute bbox center for any geometry
function bboxCenterFromCoords(coords, type) {
  let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
  const visit = ([lng, lat]) => {
    if (lng < minLng) minLng = lng;
    if (lat < minLat) minLat = lat;
    if (lng > maxLng) maxLng = lng;
    if (lat > maxLat) maxLat = lat;
  };
  if (type === 'Point') visit(coords);
  else if (type === 'MultiPoint' || type === 'LineString') coords.forEach(visit);
  else if (type === 'Polygon' || type === 'MultiLineString') coords.forEach(ring => ring.forEach(visit));
  else if (type === 'MultiPolygon') coords.forEach(poly => poly.forEach(ring => ring.forEach(visit)));
  else return null;
  if (!Number.isFinite(minLng)) return null;
  return { longitude: (minLng + maxLng) / 2, latitude: (minLat + maxLat) / 2 };
}

// Point-in-polygon test (ray casting)
function pointInRing(point, ring) {
  const x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
    const intersects = ((yi > y) !== (yj > y)) &&
      (x < ((xj - xi) * (y - yi)) / (yj - yi + 0.0) + xi);
    if (intersects) inside = !inside;
  }
  return inside;
}
function pointInPolygon(point, polygonCoords) {
  if (!polygonCoords || polygonCoords.length === 0) return false;
  if (!pointInRing(point, polygonCoords[0])) return false;
  for (let i = 1; i < polygonCoords.length; i++) {
    if (pointInRing(point, polygonCoords[i])) return false;
  }
  return true;
}
function pointInRegionFeature(point, regionFeature) {
  const geom = regionFeature?.geometry;
  if (!geom) return false;
  if (geom.type === 'Polygon') return pointInPolygon(point, geom.coordinates);
  if (geom.type === 'MultiPolygon') return geom.coordinates.some(poly => pointInPolygon(point, poly));
  return false;
}
function findRegionNameForPoint(point, regionFeatures) {
  for (const region of regionFeatures) {
    if (pointInRegionFeature(point, region)) {
      return region?.properties?.drg_region_name ?? null;
    }
  }
  return null;
}

async function main() {
  const geositesRaw = await fs.readFile(geositePath, 'utf8');
  const regionsRaw = await fs.readFile(regionPath, 'utf8');
  const geosites = JSON.parse(geositesRaw);
  const regions = JSON.parse(regionsRaw);
  const regionFeatures = regions.features || [];

  const features = (geosites.features || []).map((feature) => {
    const geometry = feature.geometry || {};
    const center = bboxCenterFromCoords(geometry.coordinates, geometry.type);
    if (!center) return null;
    const regionName = findRegionNameForPoint([center.longitude, center.latitude], regionFeatures);
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [center.longitude, center.latitude]
      },
      properties: {
        ...feature.properties,
        region: regionName
      }
    };
  }).filter(Boolean);

  const out = { type: 'FeatureCollection', features };
  await fs.writeFile(outputPath, JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote', outputPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});