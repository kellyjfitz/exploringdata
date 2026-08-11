<!--
@component
SiteHeader.svelte — NYCity News Service Style Header
-->
<script>
 import { base } from '$app/paths';
 let {
    navLinks = [
      { label: 'Home', href: `${base}/` },
      { label: 'GeoHeritage Sites', href: `${base}/geoheritageSites` },
    ],
  } = $props();
</script>

<header class="site-header">
  <!-- Compact masthead with logo left and nav right -->
  <div class="masthead-wrapper">
    <div class="masthead">
      <a
        href="https://github.com/kellyjfitz"
        class="logo"
      >
        <!-- Compact HTML/CSS Logo with thin white border -->
        <span class="logo-text">
          <span class="logo-left">K</span><span class="logo-right"
            >M</span
          >
        </span>
      </a>

      <!-- Navigation inline with logo -->
      {#if navLinks.length > 0}
        <nav class="main-nav" aria-label="Main navigation">
          <ul class="nav-list">
            {#each navLinks as link (link.href)}
              <li>
                <a href={link.href} class="nav-link">{link.label}</a>
              </li>
            {/each}
          </ul>
        </nav>
      {/if}
    </div>
  </div>
</header>

<style lang="scss">
  @use '../../styles' as *;

  .site-header {
    border-bottom: 0px solid var(--color-accent);
    box-shadow: 0 2px 4px var(--color-shadow);
  }

  /* Full-width blue background with animated dark-to-light gradient */
  .masthead-wrapper {
    background: linear-gradient(
      90deg,
      var(--color-cuny-blue-dark) 0%,
      var(--color-accent) 50%,
      var(--color-cuny-blue-light) 100%
    );
    background-size: 200% 100%;
    animation: gradient-sweep 6s ease-in-out infinite;
  }

  @keyframes gradient-sweep {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  /* Compact Masthead - Mobile: centered */
  .masthead {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xs) var(--spacing-sm);
    max-width: var(--max-width-wide);
    margin: 0 auto;
  }

  .logo {
    display: inline-block;
    text-decoration: none;
  }

  .logo:hover {
    text-decoration: none;
  }

  .logo-text {
    display: inline-flex;
    align-items: stretch;
    border: 1px solid var(--color-white);
    border-radius: 4px;
  }

  .logo-left {
    background-color: var(--color-white);
    color: var(--color-accent);
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-extrabold);
    padding: var(--logo-padding-mobile);
    letter-spacing: var(--letter-spacing-wide);
    display: flex;
    align-items: center;
  }

  .logo-right {
    color: var(--color-white);
    border-radius: 4px;
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-light);
    padding: var(--logo-padding-mobile);
    letter-spacing: var(--letter-spacing-tight);
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }

  /* Navigation - hidden on mobile */
  .main-nav {
    display: none;
  }

  .nav-list {
    display: flex;
    flex-wrap: nowrap;
    list-style: none;
    gap: var(--spacing-md);
    margin: 0;
    padding: 0;
  }

  .nav-link {
    color: var(--color-white);
    text-decoration: none;
    font-family: var(--font-sans);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
    white-space: nowrap;
    transition: var(--transition-opacity);
  }

  .nav-link:hover {
    color: var(--color-white);
    opacity: var(--opacity-hover);
    text-decoration: none;
  }

  /* Desktop styles - show nav, space-between layout, larger logo */
  @include desktop {
    .masthead {
      justify-content: space-between;
      padding: var(--font-size-xs) var(--spacing-md);
    }

    .logo-left {
      font-size: var(--font-size-base);
      padding: var(--logo-padding-desktop);
    }

    .logo-right {
      font-size: var(--font-size-base);
      padding: var(--logo-padding-desktop);
    }

    .main-nav {
      display: flex;
      align-items: center;
    }
  }
</style>
