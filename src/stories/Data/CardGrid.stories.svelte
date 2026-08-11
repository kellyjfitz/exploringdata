<!--
  A responsive grid layout for Card components.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CardGrid from '$lib/components/Data/CardGrid.svelte';
  import Card from '$lib/components/Data/Card.svelte';

  const { Story } = defineMeta({
    title: 'Data/CardGrid',
    component: CardGrid,
    tags: ['autodocs'],
  });
</script>

<Story name="Default">
  <CardGrid>
    <Card>
      <h3>M.A. in Journalism</h3>
      <p>
        Our flagship program trains reporters, editors, and multimedia
        journalists.
      </p>
    </Card>
    <Card>
      <h3>Engagement Journalism</h3>
      <p>Building trust and deepening connections with communities.</p>
    </Card>
    <Card>
      <h3>Bilingual Journalism</h3>
      <p>For students fluent in English and Spanish.</p>
    </Card>
  </CardGrid>
</Story>
