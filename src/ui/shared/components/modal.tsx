import { type PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

type ModalProps = PropsWithChildren & { className?: string };

export const Modal = ({ children, className = '' }: ModalProps) => {
  useEffect(() => {
    const bodyClass = 'noscroll';
    document.body.classList.add(bodyClass);
    return () => document.body.classList.remove(bodyClass);
  }, []);

  return createPortal(
    <div className={styles.backdrop}>
      <div role="dialog" className={className}>
        {children}
      </div>
    </div>,
    document.body
  );
};
