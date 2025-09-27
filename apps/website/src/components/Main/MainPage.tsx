import {Button, Badge} from '@codeimage/ui';
import {useRouteData} from '@solidjs/router';
import {createSignal} from 'solid-js';
import {
  advertisingBadge,
  advertisingDescription,
} from '~/components/Main/MainPage.css';
import * as styles from '~/components/Main/MainPage.css';
import {breakpoints} from '~/theme/breakpoints';
import {betterCommentsForGitHubLink, mainWebsiteLink} from '~/core/constants';
import {routeData} from '~/routes';
import {GitHubButton} from '../GitHubButton/GitHubButton';
import {Header} from '../Header/Header';

export default function MainPage() {
  let imageBox: HTMLDivElement;
  const [loading] = createSignal(false);
  const data = useRouteData<typeof routeData>();

  const stars = () => data()?.repo?.stars ?? '?';

  return (
    <>
      <Header />
      <section class={styles.main}>
        <div class={styles.content}>
          <div class={styles.textBox}>
            <div class={styles.heroContainer}>
              <h1 class={styles.heading}>
                <span class={styles.screenshot}>Beautify</span> your{' '}
                <span class={styles.screenshot}>code</span> screenshots
              </h1>

              <p class={styles.mobileDescription}>
                Instantly manage your code snippets, make them beautiful to read
                and share them to everyone.
              </p>
            </div>

            <div class={styles.ctaContainer}>
              <Button
                as={'a'}
                rel={'canonical'}
                href={mainWebsiteLink}
                size={'xl'}
                variant={'solid'}
                theme={'primary'}
              >
                Getting started
              </Button>

              <GitHubButton loading={loading()} stars={stars()} />
            </div>

            <div class={styles.ctaContainer}>
              <div class={styles.advertisingBanner}>
                <span class={styles.advertisingBadge}>NEW!</span>

                <div class={styles.advertisingDescription}>
                  Improve now your <strong>GitHub comments experience</strong>!
                  Try the new browser extension from <strong>CodeImage</strong>{' '}
                  creator!
                </div>

                <Button
                  as={'a'}
                  rel={'canonical'}
                  href={betterCommentsForGitHubLink}
                  size={'md'}
                  variant={'solid'}
                  theme={'primaryAlt'}
                >
                  Try Better Comments For GitHub
                </Button>
              </div>
            </div>
          </div>
          <div class={styles.imagePerspectiveBox} ref={imageBox}>
            <div class={styles.imageSection}>
              <div class={styles.imageBox}>
                <picture>
                  <source
                    type="image/webp"
                    srcset={'/landing/codeimage_preview_mobile_ultra.webp'}
                    media={`(max-width: ${breakpoints.tablet - 1}px)`}
                  />
                  <source
                    type="image/webp"
                    srcset={'/landing/codeimage_preview_mobile.webp'}
                    media={`(min-width: ${breakpoints.tablet}px)`}
                  />
                  <source
                    type="image/webp"
                    srcset={'/landing/codeimage_preview_desktop.webp'}
                    media={`(min-width: ${breakpoints.desktop}px)`}
                  />
                  <img
                    class={styles.imageLeft}
                    loading={'lazy'}
                    src={'/landing/codeimage_preview_lite.png'}
                    alt={'Preview of CodeImage snippet'}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
