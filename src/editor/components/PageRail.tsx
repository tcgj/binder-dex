import type { PageOverview } from '../core/types'
import styles from './PageRail.module.css'

type PageRailProps = {
  pageOverviews: PageOverview[]
  activePage: number
  onPageChange: (pageIndex: number) => void
}

export function PageRail({
  pageOverviews,
  activePage,
  onPageChange,
}: PageRailProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.sectionHeading}>
        <p className={styles.sectionLabel}>Pages</p>
      </div>

      <div className={styles.pageRail}>
        {pageOverviews.map((page) => (
          <button
            key={page.pageIndex}
            className={`${styles.pageRailButton} ${
              page.pageIndex === activePage ? styles.pageRailButtonActive : ''
            }`}
            onClick={() => onPageChange(page.pageIndex)}
            aria-current={page.pageIndex === activePage ? 'page' : undefined}
            aria-label={`Page ${page.pageIndex + 1}, ${page.filledSlots} of ${page.totalSlots} slots filled`}
            title={`${page.filledSlots} of ${page.totalSlots} slots filled`}
          >
            <span className={styles.pageRailRow}>
              <span className={styles.pageRailTitle}>
                Page {page.pageIndex + 1}
              </span>
              <span className={styles.pageRailMeta}>
                <span className={styles.pageRailCount}>
                  {page.filledSlots}/{page.totalSlots}
                </span>
                <span
                  className={styles.pageProgressWheel}
                  aria-hidden="true"
                  style={{
                    ['--page-fill-ratio' as string]: `${page.filledSlots / page.totalSlots}`,
                  }}
                />
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
