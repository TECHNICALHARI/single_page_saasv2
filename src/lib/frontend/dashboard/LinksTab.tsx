'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useState } from 'react';
import SortableLink from './SortableLink';
import LinkFormModal from './LinkFormModal';
import CustomModal from './CustomModal';
import styles from '@/styles/dashboard.module.css';
import { Pencil, Trash2 } from 'lucide-react';

export default function LinksTab({ form, setForm }: { form: any; setForm: (f: any) => void }) {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showHeaderModal, setShowHeaderModal] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const [editHeaderIndex, setEditHeaderIndex] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ---- Links ----

  const handleAddLink = (data: any) => {
    const updatedLinks = [...form.links];
    if (editIndex !== null) {
      updatedLinks[editIndex] = data;
      setEditIndex(null);
    } else {
      updatedLinks.push({ ...data, id: `link-${Date.now()}` });
    }
    setForm({ ...form, links: updatedLinks });
    setShowModal(false);
  };

  const handleDeleteLink = (index: number) => {
    const updatedLinks = form.links.filter((_, i) => i !== index);
    setForm({ ...form, links: updatedLinks });
  };

  const handleEditLink = (index: number) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDragEndLinks = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active?.id || !over?.id || active.id === over.id) return;
    const oldIndex = form.links.findIndex((i) => i.id === active.id);
    const newIndex = form.links.findIndex((i) => i.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(form.links, oldIndex, newIndex);
      setForm({ ...form, links: reordered });
    }
  };

  // ---- Headers ----

  const handleSaveHeader = () => {
    const updated = [...form.headers];
    if (editHeaderIndex !== null) {
      updated[editHeaderIndex].title = headerTitle;
      setEditHeaderIndex(null);
    } else {
      updated.push({ id: `header-${Date.now()}`, title: headerTitle });
    }
    setForm({ ...form, headers: updated });
    setHeaderTitle('');
    setShowHeaderModal(false);
  };

  const handleEditHeader = (index: number) => {
    setEditHeaderIndex(index);
    setHeaderTitle(form.headers[index].title);
    setShowHeaderModal(true);
  };

  const handleDeleteHeader = (index: number) => {
    const updated = form.headers.filter((_, i) => i !== index);
    setForm({ ...form, headers: updated });
  };

  const handleDragEndHeaders = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active?.id || !over?.id || active.id === over.id) return;
    const oldIndex = form.headers.findIndex((i) => i.id === active.id);
    const newIndex = form.headers.findIndex((i) => i.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(form.headers, oldIndex, newIndex);
      setForm({ ...form, headers: reordered });
    }
  };

  return (
    <>
      <div className="mb-10">
        <h3 className="text-xl font-bold text-brand mb-2">Manage Your Links</h3>
        <p className="text-sm text-muted mb-4">
          Add custom links to your profile — reorder, highlight or include thumbnails.
        </p>

        {/* Header Section */}
        <div className="bg-white border border-muted rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-brand">Headers</h4>
            <button className="btnFull max-w-fit" onClick={() => setShowHeaderModal(true)}>
              + Add Header
            </button>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndHeaders}>
            <SortableContext items={form.headers.map((h: any) => h.id)} strategy={verticalListSortingStrategy}>
              <div className="grid gap-3">
                {form.headers.map((header: any, index: number) => (
                  <SortableLink
                    key={header.id}
                    id={header.id}
                    link={{ ...header, type: 'header' }}
                    onEdit={() => handleEditHeader(index)}
                    onDelete={() => handleDeleteHeader(index)}
                    isHeader
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Link Section */}
        <div className="bg-white border border-muted rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-brand">Links</h4>
            <button className="btnFull max-w-fit" onClick={() => setShowModal(true)}>
              + Add Link
            </button>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndLinks}>
            <SortableContext items={form.links.map((l: any) => l.id)} strategy={verticalListSortingStrategy}>
              <div className="grid gap-4">
                {form.links.map((link: any, index: number) => (
                  <SortableLink
                    key={link.id}
                    id={link.id}
                    link={link}
                    onDelete={() => handleDeleteLink(index)}
                    onEdit={() => handleEditLink(index)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <LinkFormModal
          onSave={handleAddLink}
          onClose={() => {
            setShowModal(false);
            setEditIndex(null);
          }}
          initialData={editIndex !== null ? form.links[editIndex] : undefined}
        />
      )}

      {showHeaderModal && (
        <CustomModal onClose={() => setShowHeaderModal(false)} width="400px">
          <h2 className="text-lg font-bold text-brand mb-4">
            {editHeaderIndex !== null ? 'Edit Header' : 'Add Header'}
          </h2>
          <input
            className={styles.input}
            placeholder="Header Title"
            value={headerTitle}
            onChange={(e) => setHeaderTitle(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="text-sm text-muted border px-4 py-2 rounded-md"
              onClick={() => {
                setShowHeaderModal(false);
                setHeaderTitle('');
                setEditHeaderIndex(null);
              }}
            >
              Cancel
            </button>
            <button className={styles.btnPrimary} onClick={handleSaveHeader}>
              Save
            </button>
          </div>
        </CustomModal>
      )}
    </>
  );
}
