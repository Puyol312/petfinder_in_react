import React, { FormEvent, useEffect } from "react";
import { Modal } from "bootstrap";

import { PetWanted } from "../../types/pet";

type IonContact = ({ id, name, message, phone }: { id: number, name: string, message: string, phone: string }) => void;

type ContactModalProp = {
  card: PetWanted | null;
  onContact: IonContact;
}

const ContactModal = ({ card, onContact }: ContactModalProp) => {
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());
    const id = Number(obj.cardId);
    const name = JSON.stringify(obj.name);
    const message = JSON.stringify(obj.message);
    const phone = JSON.stringify(obj.phone);
    onContact({ id, name, message, phone });
    form.reset();

    const modalElement = document.getElementById('contactModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
  useEffect(() => {
    const modalElement = document.getElementById('contactModal');
    
    const handleHidden = () => {
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(b => b.remove());
    };
    
    modalElement?.addEventListener('hidden.bs.modal', handleHidden);
    
    return () => {
      modalElement?.removeEventListener('hidden.bs.modal', handleHidden);
    };
  }, []);
  return (
    <div
      className="modal fade"
      id="contactModal"
      tabIndex={-1}
      aria-labelledby="contactModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog d-flex justify-content-center">
        <div className="modal-content w-75">
          <div className="modal-header">
            <h5
              className="modal-title fw-bold text-center text-primary"
            >
              {card ? `Escribile a ${card.name}` : "Escribinos a nosotros"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              {/* input oculto */}
              <input
                type="hidden"
                name="cardId"
                value={card?.id || ""}
              />

              <div className="mb-3">
                <label className="form-label fw-bold">Nombre</label>
                <input type="text" className="form-control" name="name" required={true} placeholder="Ej: Juan Perez" />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Telefono</label>
                <input type="tel" className="form-control" name="phone" placeholder="Ej: +598 99 123 456" required/>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Message</label>
                <textarea className="form-control" rows={4} name="message" required={true} placeholder="Buenas, lo vi en..."/>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ContactModal };