import styles from './EditorPage.module.css'
import {
  EditorCardsSection,
  EditorMainContent,
  EditorToolsSection,
} from './components/EditorSections'
import { EditorToolbar } from './components/EditorToolbar'
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
      <EditorMainContent
        workspace={{
          title: binder.workspace.title,
          activePage: editor.page.activePage,
          pageCount: binder.workspace.pageCount,
          columns: binder.workspace.columns,
          currentPageSlots: binder.workspace.currentPageSlots,
          cardsById: binder.workspace.cardsById,
        }}
        selectedSlot={{
          id: editor.selectedSlot.id,
          select: editor.selectedSlot.select,
        }}
        display={{
          showSlotDetails: toolbar.showSlotDetails,
        }}
        slotActions={{
          clearSlotById: binder.actions.clearSlotById,
        }}
      />

      <EditorToolsSection
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

      <EditorCardsSection
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
