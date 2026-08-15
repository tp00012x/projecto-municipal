"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { CSSProperties } from "react";

import { CloseIcon } from "~/components/Icons";
import type { councilMembers } from "~/data/site";

type CouncilMember = (typeof councilMembers)[number];

type TeamMemberProfileProps = {
  member: CouncilMember;
  onClose: () => void;
};

export default function TeamMemberProfile({
  member,
  onClose,
}: TeamMemberProfileProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [member.id, onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleTab(event: KeyboardEvent) {
      if (event.key !== "Tab" || focusable.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    dialog.addEventListener("keydown", handleTab);
    return () => dialog.removeEventListener("keydown", handleTab);
  }, [member.id]);

  if (!mounted) return null;

  return createPortal(
    <div className="profile-modal-overlay" role="presentation">
      <button
        aria-label="Cerrar perfil"
        className="profile-modal-backdrop"
        onClick={onClose}
        type="button"
      />

      <div
        ref={dialogRef}
        aria-labelledby={`profile-modal-name-${member.id}`}
        aria-modal="true"
        className="profile-modal"
        id={`profile-modal-${member.id}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        style={
          {
            "--profile-position": member.objectPosition,
          } as CSSProperties
        }
      >
        <button
          ref={closeButtonRef}
          aria-label="Cerrar perfil"
          className="profile-modal__close"
          onClick={onClose}
          type="button"
        >
          <CloseIcon />
        </button>

        <div className="profile-modal__photo">
          <Image
            alt={member.alt}
            className="profile-modal__photo-image"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 378px"
            src={member.src}
            style={{
              objectFit: "cover",
              objectPosition: member.objectPosition,
            }}
          />
        </div>

        <div className="profile-modal__content">
          <p className="profile-modal__role">
            {member.position} #{member.number}
          </p>
          <h4 className="profile-modal__name" id={`profile-modal-name-${member.id}`}>
            {member.name}
          </h4>
          <p className="profile-modal__bio">{member.bio}</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
