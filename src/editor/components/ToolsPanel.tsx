import { BinderSetupPanel } from './BinderSetupPanel'
import { PageRail } from './PageRail'
import styles from './ToolsPanel.module.css'
import type { EditorSidebarState } from '../core/types'

type ToolsPanelProps = {
  sidebar: EditorSidebarState
  isOpen: boolean
  isCardsPanelOpen: boolean
  onClose: () => void
  onToggle: () => void
  onPresetChange: (preset: EditorSidebarState['config']['preset']) => void
  onConfigChange: <K extends keyof EditorSidebarState['config']>(
    key: K,
    value: EditorSidebarState['config'][K],
  ) => void
  onPageChange: (pageIndex: number) => void
}

export function ToolsPanel({
  sidebar,
  isOpen,
  isCardsPanelOpen,
  onClose,
  onToggle,
  onPresetChange,
  onConfigChange,
  onPageChange,
}: ToolsPanelProps) {
  return (
    <>
      <aside
        className={`${styles.toolsPanel} ${isOpen ? styles.toolsPanelOpen : ''}`}
      >
        <div className={styles.surface}>
          <div className={styles.content}>
            <BinderSetupPanel
              config={sidebar.config}
              filledSlots={sidebar.filledSlots}
              slotsPerPage={sidebar.slotsPerPage}
              onPresetChange={onPresetChange}
              onConfigChange={onConfigChange}
            />

            <PageRail
              pageOverviews={sidebar.pageOverviews}
              activePage={sidebar.activePage}
              onPageChange={(pageIndex) => {
                onPageChange(pageIndex)
                onClose()
              }}
            />
          </div>
        </div>

        <div
          className={`${styles.rail} ${isCardsPanelOpen ? styles.railHidden : ''}`}
          onClick={() => {
            if (isOpen) {
              onClose()
            }
          }}
        >
          <button
            className={styles.handle}
            onClick={(event) => {
              event.stopPropagation()
              onToggle()
            }}
            aria-label={isOpen ? 'Close tools panel' : 'Open tools panel'}
            title={isOpen ? 'Close tools panel' : 'Open tools panel'}
          >
            <span className={styles.handleIcon} aria-hidden="true">
              <span className={styles.handleLine} />
              <span className={styles.handleLine} />
              <span className={styles.handleLine} />
            </span>
          </button>
        </div>
      </aside>

      <button
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={onClose}
        aria-label="Close tools"
      />
    </>
  )
}
