import { BinderSetupPanel } from './BinderSetupPanel'
import { PageRail } from './PageRail'
import styles from './ToolsPanel.module.css'
import type { EditorSidebarState } from '../core/types'

export type ToolsPanelControls = {
  isOpen: boolean
  isCardsPanelOpen: boolean
  close: () => void
  toggle: () => void
}

export type ToolsPanelBinderSettings = {
  setPreset: (preset: EditorSidebarState['config']['preset']) => void
  setConfigField: <K extends keyof EditorSidebarState['config']>(
    key: K,
    value: EditorSidebarState['config'][K],
  ) => void
}

export type ToolsPanelPageNavigation = {
  goToPage: (pageIndex: number) => void
}

export type ToolsPanelProps = {
  sidebar: EditorSidebarState
  controls: ToolsPanelControls
  binderSettings: ToolsPanelBinderSettings
  pageNavigation: ToolsPanelPageNavigation
  className?: string
}

export function ToolsPanel({
  sidebar,
  controls,
  binderSettings,
  pageNavigation,
  className,
}: ToolsPanelProps) {
  return (
    <>
      <aside
        className={`${styles.toolsPanel} ${className ?? ''} ${
          controls.isOpen ? styles.toolsPanelOpen : ''
        }`}
      >
        <div className={styles.surface}>
          <div className={styles.content}>
            <BinderSetupPanel
              config={sidebar.config}
              filledSlots={sidebar.filledSlots}
              slotsPerPage={sidebar.slotsPerPage}
              totalSlotCount={sidebar.totalSlotCount}
              onPresetChange={binderSettings.setPreset}
              onConfigChange={binderSettings.setConfigField}
            />

            <PageRail
              pageOverviews={sidebar.pageOverviews}
              activePage={sidebar.activePage}
              onPageChange={(pageIndex) => {
                pageNavigation.goToPage(pageIndex)
                controls.close()
              }}
            />
          </div>
        </div>

        <div
          className={`${styles.rail} ${
            controls.isCardsPanelOpen ? styles.railHidden : ''
          }`}
          onClick={() => {
            if (controls.isOpen) {
              controls.close()
            }
          }}
        >
          <button
            className={styles.handle}
            onClick={(event) => {
              event.stopPropagation()
              controls.toggle()
            }}
            aria-label={
              controls.isOpen ? 'Close tools panel' : 'Open tools panel'
            }
            title={controls.isOpen ? 'Close tools panel' : 'Open tools panel'}
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
        className={`${styles.backdrop} ${
          controls.isOpen ? styles.backdropVisible : ''
        }`}
        onClick={controls.close}
        aria-label="Close tools"
      />
    </>
  )
}
