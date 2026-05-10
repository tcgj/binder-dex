import type { CardRecord } from '../../data/mockCards'
import type {
  EditorSidebarState,
  EditorWorkspaceState,
  SelectedSlotMeta,
} from '../core/types'
import styles from '../EditorPage.module.css'
import { BinderPage } from './BinderPage'
import { CardsPanel } from './CardsPanel'
import type { CardsPanelCardAssignment, CardsPanelControls } from './CardsPanel'
import { ToolsPanel } from './ToolsPanel'
import type {
  ToolsPanelBinderSettings,
  ToolsPanelControls,
  ToolsPanelPageNavigation,
} from './ToolsPanel'

export type EditorMainContentProps = {
  workspace: Pick<
    EditorWorkspaceState,
    | 'title'
    | 'activePage'
    | 'pageCount'
    | 'columns'
    | 'currentPageSlots'
    | 'cardsById'
  >
  selectedSlot: {
    id: string | null
    select: (slotId: string) => void
  }
  display: {
    showSlotDetails: boolean
  }
  slotActions: {
    clearSlotById: (slotId: string) => void
  }
}

export type EditorToolsSectionProps = {
  sidebar: EditorSidebarState
  controls: ToolsPanelControls
  binderSettings: ToolsPanelBinderSettings
  pageNavigation: ToolsPanelPageNavigation
}

export type EditorCardsSectionProps = {
  selectedSlot: {
    id: string | null
    meta: SelectedSlotMeta | null
    currentCardId: string | null
  }
  cardsById: Record<string, CardRecord>
  controls: CardsPanelControls
  cardAssignment: CardsPanelCardAssignment
}

export function EditorMainContent({
  workspace,
  selectedSlot,
  display,
  slotActions,
}: EditorMainContentProps) {
  return (
    <main className={styles.pageShell}>
      <section className={styles.pageHeader}>
        <div className={styles.contextBlock}>
          <h2>{workspace.title}</h2>
          <p className={styles.pageContext}>
            Page {workspace.activePage + 1} of {workspace.pageCount}
          </p>
        </div>
      </section>

      <section className={styles.pageViewport}>
        <BinderPage
          columns={workspace.columns}
          slots={workspace.currentPageSlots}
          selectedSlotId={selectedSlot.id}
          showSlotDetails={display.showSlotDetails}
          cardsById={workspace.cardsById}
          onSelectSlot={(slotId) => {
            selectedSlot.select(slotId)
          }}
          onClearSlot={slotActions.clearSlotById}
        />
      </section>
    </main>
  )
}

export function EditorToolsSection(props: EditorToolsSectionProps) {
  return <ToolsPanel {...props} className={styles.toolsMount} />
}

export function EditorCardsSection(props: EditorCardsSectionProps) {
  return <CardsPanel {...props} className={styles.cardsMount} />
}
