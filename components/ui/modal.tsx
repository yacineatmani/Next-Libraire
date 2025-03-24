'use client';

import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assurez-vous que cette fonction utilitaire est définie

interface ModalProps {
  children: React.ReactNode;
  className?: string;
}

export function Modal({ children, className }: ModalProps) {
  return (
    <Dialog.Root>
      {children}
    </Dialog.Root>
  );
}

export function ModalTrigger({ children }: React.PropsWithChildren<{}>) {
    return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
  }


export function ModalContent({ children, className }: ModalProps) {
  const [mounted, setMounted] = React.useState(false);

  // Assurez-vous que le composant est monté côté client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Ne pas rendre le contenu côté serveur
  if (!mounted) return null;

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      <Dialog.Content
        className={cn(
          'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 z-50',
          className
        )}
      >
        {children}
        <Dialog.Close asChild>
          <button
            aria-label="Close"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function ModalTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function ModalDescription({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{children}</div>;
}