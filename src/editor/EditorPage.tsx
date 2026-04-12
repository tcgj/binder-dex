import styles from './EditorPage.module.css'
import { BinderPage } from './components/BinderPage'
import { EditorDrawer } from './components/EditorDrawer'
import { EditorInspector } from './components/EditorInspector'
import { EditorToolbar } from './components/EditorToolbar'
import { useBinderState } from './hooks/useBinderState'
import { useEditorState } from './hooks/useEditorState'
import { useToolbarState } from './hooks/useToolbarState'

export function EditorPage() {
  const binder = useBinderState()
  const editor = useEditorState({
    slotAssignments: binder.workspace.slotAssignments,
  })
  const toolbar = useToolbarState({
    activePage: binder.workspace.activePage,
    onPageChange: binder.actions.goToPage,
  })

  return (
    <div className={styles.appShell}>
      <EditorDrawer
        sidebar={binder.sidebar}
        isOpen={editor.drawer.isOpen}
        isInspectorOpen={editor.inspector.isOpen}
        onClose={editor.drawer.close}
        onToggle={editor.drawer.toggle}
        onPresetChange={binder.actions.setBinderPreset}
        onConfigChange={binder.actions.setConfigField}
        onPageChange={binder.actions.goToPage}
      />

      <main className={styles.pageShell}>
        <section className={styles.pageHeader}>
          <div className={styles.contextBlock}>
            <h2>{binder.workspace.title}</h2>
            <p className={styles.pageContext}>
              Page {binder.workspace.activePage + 1} of {binder.workspace.pageCount}
            </p>
          </div>
        </section>

        <section className={styles.pageViewport}>
          <BinderPage
            columns={binder.workspace.columns}
            slots={binder.workspace.currentPageSlots}
            selectedSlotId={editor.inspector.selectedSlotId}
            showSlotDetails={toolbar.showSlotDetails}
            cardsById={binder.workspace.cardsById}
            onSelectSlot={(slotId) => {
              editor.inspector.selectSlot(slotId)
            }}
            onClearSlot={binder.actions.clearSlotById}
          />
        </section>
      </main>

      <EditorToolbar
        activePage={binder.workspace.activePage}
        pageCount={binder.workspace.pageCount}
        pageInput={toolbar.pageInput}
        showSlotDetails={toolbar.showSlotDetails}
        onPageInputChange={toolbar.setPageInput}
        onCommitPageInput={toolbar.commitPageInput}
        onPageChange={binder.actions.goToPage}
        onToggleSlotDetails={toolbar.toggleSlotDetails}
      />

      <EditorInspector
        key={editor.inspector.selectedSlotId ?? 'browse'}
        inspector={editor.inspector}
        cardsById={binder.workspace.cardsById}
        isOpen={editor.inspector.isOpen}
        isDrawerBlocked={editor.drawer.isOpen}
        onClose={editor.inspector.close}
        onToggle={editor.inspector.toggle}
        onAssignCardToSlot={binder.actions.assignCardToSlot}
        onClearSlot={() => {
          if (editor.inspector.selectedSlotId) {
            binder.actions.clearSlotById(editor.inspector.selectedSlotId)
          }
        }}
      />
    </div>
  )
}
