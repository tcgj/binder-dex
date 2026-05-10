import styles from './EditorPage.module.css'
import { BinderPage } from './components/BinderPage'
import { CardsPanel } from './components/CardsPanel'
import { EditorToolbar } from './components/EditorToolbar'
import { ToolsPanel } from './components/ToolsPanel'
import { useBinderState } from './hooks/useBinderState'
import { useEditorState } from './hooks/useEditorState'
import { useToolbarState } from './hooks/useToolbarState'

export function EditorPage() {
  const binder = useBinderState()
  const editor = useEditorState({
    activePage: binder.workspace.activePage,
    slotAssignments: binder.workspace.slotAssignments,
  })
  const toolbar = useToolbarState({
    activePage: binder.workspace.activePage,
    onPageChange: binder.actions.goToPage,
  })

  return (
    <div className={styles.appShell}>
      <ToolsPanel
        sidebar={binder.sidebar}
        controls={{
          isOpen: editor.toolsPanel.isOpen,
          isCardsPanelOpen: editor.cardsPanel.isOpen,
          close: editor.toolsPanel.close,
          toggle: editor.toolsPanel.toggle,
        }}
        binderSettings={{
          setPreset: binder.actions.setBinderPreset,
          setConfigField: binder.actions.setConfigField,
        }}
        pageNavigation={{
          goToPage: binder.actions.goToPage,
        }}
      />

      <main className={styles.pageShell}>
        <section className={styles.pageHeader}>
          <div className={styles.contextBlock}>
            <h2>{binder.workspace.title}</h2>
            <p className={styles.pageContext}>
              Page {editor.page.activePage + 1} of {binder.workspace.pageCount}
            </p>
          </div>
        </section>

        <section className={styles.pageViewport}>
          <BinderPage
            columns={binder.workspace.columns}
            slots={binder.workspace.currentPageSlots}
            selectedSlotId={editor.selectedSlot.id}
            showSlotDetails={toolbar.showSlotDetails}
            cardsById={binder.workspace.cardsById}
            onSelectSlot={(slotId) => {
              editor.selectedSlot.select(slotId)
            }}
            onClearSlot={binder.actions.clearSlotById}
          />
        </section>
      </main>

      <EditorToolbar
        activePage={editor.page.activePage}
        pageCount={binder.workspace.pageCount}
        pageInput={toolbar.pageInput}
        showSlotDetails={toolbar.showSlotDetails}
        onPageInputChange={toolbar.setPageInput}
        onCommitPageInput={toolbar.commitPageInput}
        onPageChange={binder.actions.goToPage}
        onToggleSlotDetails={toolbar.toggleSlotDetails}
      />

      <CardsPanel
        key={editor.selectedSlot.id ?? 'browse'}
        selectedSlot={editor.selectedSlot}
        cardsById={binder.workspace.cardsById}
        controls={{
          isOpen: editor.cardsPanel.isOpen,
          isToolsPanelOpen: editor.toolsPanel.isOpen,
          close: editor.cardsPanel.close,
          toggle: editor.cardsPanel.toggle,
        }}
        cardAssignment={{
          assignCardToSlot: binder.actions.assignCardToSlot,
          clearSelectedSlot: () => {
            if (editor.selectedSlot.id) {
              binder.actions.clearSlotById(editor.selectedSlot.id)
            }
          },
        }}
      />
    </div>
  )
}
