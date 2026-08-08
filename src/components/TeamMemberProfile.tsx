"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import { CloseIcon } from "~/components/Icons";
import { councilMembers } from "~/data/site";

type CouncilMember = (typeof councilMembers)[number];

type ProfilePosition = {
  top: number;
  left: number;
  placement: "above" | "below";
};

type TeamMemberProfileProps = {
  member: CouncilMember;
  anchorEl: HTMLElement | null;
  isTouchDevice: boolean;
  onClose: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
};

const VIEWPORT_MARGIN = 12;

function computePosition(
  anchorRect: DOMRect,
  popupRect: DOMRect,
): ProfilePosition {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const spaceBelow = viewportHeight - anchorRect.bottom - VIEWPORT_MARGIN;
  const spaceAbove = anchorRect.top - VIEWPORT_MARGIN;
  const preferBelow = spaceBelow >= popupRect.height || spaceBelow >= spaceAbove;

  let top = preferBelow
    ? anchorRect.bottom + VIEWPORT_MARGIN
    : anchorRect.top - popupRect.height - VIEWPORT_MARGIN;

  top = Math.max(
    VIEWPORT_MARGIN,
    Math.min(top, viewportHeight - popupRect.height - VIEWPORT_MARGIN),
  );

  let left =
    anchorRect.left + anchorRect.width / 2 - popupRect.width / 2;
  left = Math.max(
    VIEWPORT_MARGIN,
    Math.min(left, viewportWidth - popupRect.width - VIEWPORT_MARGIN),
  );

  return {
    top,
    left,
    placement: preferBelow ? "below" : "above",
  };
}

export default function TeamMemberProfile({
  member,
  anchorEl,
  isTouchDevice,
  onClose,
  onPointerEnter,
  onPointerLeave,
}: TeamMemberProfileProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<ProfilePosition | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isTouchDevice) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isTouchDevice, member.id]);

  const updatePosition = useCallback(() => {
    const popup = popupRef.current;
    if (!popup || !anchorEl || isTouchDevice) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    setPosition(computePosition(anchorRect, popupRect));
  }, [anchorEl, isTouchDevice]);

  useLayoutEffect(() => {
    updatePosition();
  }, [updatePosition, member.id, isTouchDevice]);

  useEffect(() => {
    if (!anchorEl || isTouchDevice) return;

    const handleReposition = () => updatePosition();

    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [anchorEl, isTouchDevice, updatePosition]);

  if (!mounted) return null;

  const popupStyle: CSSProperties | undefined = isTouchDevice
    ? undefined
    : position
      ? {
          position: "fixed",
          top: position.top,
          left: position.left,
        }
      : {
          position: "fixed",
          top: -9999,
          left: -9999,
          visibility: "hidden" as const,
        };

  const popup = (
    <div
      ref={popupRef}
      className={`team-profile-popup${isTouchDevice ? " team-profile-popup-mobile" : ""}${position?.placement === "above" ? " team-profile-popup-above" : ""}`}
      style={popupStyle}
      onMouseEnter={isTouchDevice ? undefined : onPointerEnter}
      onMouseLeave={isTouchDevice ? undefined : onPointerLeave}
      role={isTouchDevice ? "dialog" : "tooltip"}
      aria-modal={isTouchDevice ? true : undefined}
      aria-labelledby={`team-profile-name-${member.id}`}
      id={`team-profile-${member.id}`}
      onClick={isTouchDevice ? (event) => event.stopPropagation() : undefined}
    >
      {isTouchDevice ? (
        <button
          ref={closeButtonRef}
          aria-label="Cerrar perfil"
          className="team-profile-close"
          onClick={onClose}
          type="button"
        >
          <CloseIcon />
        </button>
      ) : null}

      <div className="team-profile-accent" aria-hidden="true" />

      <div className="team-profile-content">
        <p className="team-profile-role">
          {member.position} #{member.number}
        </p>
        <h4 className="team-profile-name" id={`team-profile-name-${member.id}`}>
          {member.name}
        </h4>
        <p className="team-profile-bio">{member.bio}</p>
      </div>
    </div>
  );

  if (isTouchDevice) {
    return createPortal(
      <div className="team-profile-overlay" role="presentation">
        <button
          aria-label="Cerrar perfil"
          className="team-profile-backdrop"
          onClick={onClose}
          type="button"
        />
        {popup}
      </div>,
      document.body,
    );
  }

  return createPortal(popup, document.body);
}
