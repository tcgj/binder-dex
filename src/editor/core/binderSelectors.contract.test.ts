import {
  getFilledSlotCount,
  getPageSlots,
  getSlotsPerPage,
  getTotalSlotCount,
} from './binder'
import type { BinderConfig, PageSlot, SlotAssignment } from './types'

const config: BinderConfig = {
  title: 'Selector contract',
  preset: 'custom',
  rows: 2,
  columns: 3,
  pageCount: 4,
}

const slotAssignments: SlotAssignment = {
  'page-0-slot-0': 'card-1',
  'page-0-slot-1': null,
  'page-1-slot-0': 'card-2',
}

const slotsPerPage: number = getSlotsPerPage(config)
const totalSlotCount: number = getTotalSlotCount(config)
const filledSlotCount: number = getFilledSlotCount(slotAssignments)
const pageSlots: PageSlot[] = getPageSlots(config, slotAssignments, 1)

export const binderSelectorsContract = {
  filledSlotCount,
  pageSlots,
  slotsPerPage,
  totalSlotCount,
}
