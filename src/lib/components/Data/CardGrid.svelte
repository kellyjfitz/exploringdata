<!--
@component
CardGrid.svelte — A responsive grid layout for Card components.

Displays children in a single column on mobile, two columns on tablet,
and three columns on desktop.
-->
<script>
  let { children } = $props();
</script>

<div class="card-grid">
  {@render children()}
</div>

<style lang="scss">
  @use '$lib/styles' as *;

  .card-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desktop {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
