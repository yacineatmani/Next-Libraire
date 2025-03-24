'use client';

import { Modal, ModalTrigger, ModalContent, ModalTitle, ModalDescription } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Book } from '@/types/book';

interface BookModalProps {
  book: Book;
}

export default function BookModal({ book }: BookModalProps) {
  return (
    <Modal>
      <ModalTrigger>
        <Button className="mt-2">Voir plus de détails</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalTitle>{book.title}</ModalTitle>
        <ModalDescription>
          <p className="mt-2">{book.description}</p>
          <p className="mt-2 font-semibold">Auteur : {book.authors}</p>
          <p className="mt-2 text-green-600 font-bold">Prix : {book.price} €</p>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
}