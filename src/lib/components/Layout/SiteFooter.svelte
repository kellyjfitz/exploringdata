<!--
@component
SiteFooter.svelte — Site Footer Component

A footer with multi-column layout, branding, navigation links, and copyright notice id provided.

USAGE EXAMPLE:
<SiteFooter />
-->
<script>
  let {
    navLinks = [
    ],
    aboutLinks = [
    ],
    orgName = 'https://github.com/kellyjfitz',
  } = $props();

  const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="footer-main">
    <div class="footer-container">
      <div class="footer-grid">

        <!-- Navigation Column -->
        <div class="footer-col">
          <!-- <h3 class="footer-heading">ABOUT</h3> -->
          <nav aria-label="Footer navigation">
            <ul class="footer-list">
              {#each aboutLinks as link (link.href)}
                <li>
                  <a href={link.href} class="footer-link"
                    >{link.label.toUpperCase()}</a
                  >
                </li>
              {/each}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom bar with copyright -->
  <div class="footer-bottom">
    <div class="footer-container">
      <p class="footer-copyright">
        &copy; {currentYear}
        {orgName}
      </p>
    </div>
  </div>
</footer>

<style lang="scss">
  @use '../../styles' as *;

  .site-footer {
    margin-top: var(--spacing-xxl);
  }

  .footer-main {
    background-color: var(--color-cuny-blue-dark);
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .footer-container {
    max-width: var(--max-width-wide);
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  /* Brand column */
  .footer-brand {
    text-align: left;
  }

  .footer-logo-link {
    display: inline-block;
    text-decoration: none;
    color: var(--color-white);
  }

  .cuny-logo {
    width: 100%;
    max-width: var(--max-width-footer-logo);
    height: auto;
    margin: 0 auto;
    display: block;
    transition: var(--transition-opacity);
  }

  .footer-logo-link:hover .cuny-logo {
    opacity: var(--opacity-hover);
  }

  .footer-tagline {
    color: var(--color-border);
    font-family: var(--font-serif);
    font-size: var(--font-size-sm);
    line-height: var(--leading-normal);
    margin-top: var(--spacing-sm);
    margin-bottom: 0;
  }

  /* Column headings */
  .footer-heading {
    color: var(--color-white);
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-wider);
    text-transform: uppercase;
    margin-bottom: var(--spacing-sm);
    padding-bottom: var(--spacing-xs);
    // border-bottom: var(--border-width-thin) solid var(--color-medium-gray);
  }

  /* Link lists */
  .footer-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .footer-list li {
    margin-bottom: var(--spacing-xs);
  }

  .footer-link {
    color: var(--color-border);
    text-decoration: none;
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-normal);
    letter-spacing: var(--letter-spacing-wider);
    transition: var(--transition-color);
  }

  .footer-link:hover {
    color: var(--color-white);
  }

  /* Bottom copyright bar */
  .footer-bottom {
    background-color: var(--color-cuny-blue-dark);
    padding: var(--spacing-sm) var(--spacing-md);
    text-align: center;
  }

  .footer-copyright {
    color: var(--color-border);
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    letter-spacing: var(--letter-spacing-wide);
    margin: 0;
  }

  /* Tablet and up: multi-column layout */
  @include tablet {
    .footer-grid {
      grid-template-columns: 2fr 1fr 1fr;
      gap: var(--spacing-xl);
    }

    .footer-brand {
      text-align: left;
    }

    .cuny-logo {
      margin: 0;
    }
  }
</style>
