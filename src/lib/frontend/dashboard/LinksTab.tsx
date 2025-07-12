'use client';

import { useState } from 'react';
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

import SortableLink from './SortableLink';
import LinkFormModal from './LinkFormModal';
import styles from '@/styles/dashboard.module.css';
import { Pencil, Trash2 } from 'lucide-react';
import CustomModal from './CustomModal';

export default function LinksTab() {
  const [links, setLinks] = useState<any[]>([]);
  const [headers, setHeaders] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showHeaderModal, setShowHeaderModal] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const [editHeaderIndex, setEditHeaderIndex] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddLink = (data: any) => {
    if (editIndex !== null) {
      setLinks((prev) =>
        prev.map((item, idx) => (idx === editIndex ? data : item))
      );
      setEditIndex(null);
    } else {
      setLinks((prev) => [...prev, { ...data, id: `link-${Date.now()}` }]);
    }
    setShowModal(false);
  };

  const handleDelete = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleSaveHeader = () => {
    if (headerTitle.trim()) {
      if (editHeaderIndex !== null) {
        setHeaders((prev) =>
          prev.map((h, idx) => (idx === editHeaderIndex ? { ...h, title: headerTitle } : h))
        );
        setEditHeaderIndex(null);
      } else {
        setHeaders((prev) => [
          ...prev,
          { id: `header-${Date.now()}`, title: headerTitle },
        ]);
      }
      setHeaderTitle('');
      setShowHeaderModal(false);
    }
  };

  const handleEditHeader = (index: number) => {
    setEditHeaderIndex(index);
    setHeaderTitle(headers[index].title);
    setShowHeaderModal(true);
  };

  const handleDeleteHeader = (index: number) => {
    setHeaders((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEndHeaders = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active?.id && over?.id && active.id !== over.id) {
      const oldIndex = headers.findIndex((item) => item.id === active.id);
      const newIndex = headers.findIndex((item) => item.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setHeaders((prev) => arrayMove(prev, oldIndex, newIndex));
      }
    }
  };

  const handleDragEndLinks = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active?.id && over?.id && active.id !== over.id) {
      const oldIndex = links.findIndex((item) => item.id === active.id);
      const newIndex = links.findIndex((item) => item.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setLinks((prev) => arrayMove(prev, oldIndex, newIndex));
      }
    }
  };

  return (
    <>
      <div className="mb-10">
        <h3 className="text-xl font-bold text-brand mb-2">Manage Your Links</h3>
        <p className="text-sm text-muted mb-4">
          Add custom links to your profile — reorder, highlight or include thumbnails.
        </p>

        {/* HEADER SECTION */}
        <div className="bg-white border border-muted rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-brand">Headers</h4>
            <button className="btnFull max-w-fit" onClick={() => setShowHeaderModal(true)}>
              + Add Header
            </button>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndHeaders}>
            <SortableContext items={headers.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              <div className="grid gap-3">
                {headers.map((header, index) => (
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

        {/* LINK SECTION */}
        <div className="bg-white border border-muted rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-brand">Links</h4>
            <button className="btnFull max-w-fit" onClick={() => setShowModal(true)}>
              + Add Link
            </button>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndLinks}>
            <SortableContext items={links.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              <div className="grid gap-4">
                {links.map((link, index) => (
                  <SortableLink
                    key={link.id}
                    id={link.id}
                    link={link}
                    onDelete={() => handleDelete(index)}
                    onEdit={() => handleEdit(index)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* LINK MODAL */}
      {showModal && (
        <LinkFormModal
          onSave={handleAddLink}
          onClose={() => {
            setShowModal(false);
            setEditIndex(null);
          }}
          initialData={editIndex !== null ? links[editIndex] : undefined}
        />
      )}

      {/* HEADER MODAL */}
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
