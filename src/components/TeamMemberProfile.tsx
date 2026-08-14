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
  onClose: () => void;
};

const VIEWPORT_MARGIN = 12;
const MOBILE_LAYOUT_QUERY = "(max-width: 767px)";

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
  onClose,
}: TeamMemberProfileProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<ProfilePosition | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_LAYOUT_QUERY);
    const syncLayout = () => setIsMobileLayout(media.matches);
    syncLayout();
    media.addEventListener("change", syncLayout);
    return () => media.removeEventListener("change", syncLayout);
  }, []);

  useEffect(() => {
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [member.id]);

  const updatePosition = useCallback(() => {
    const popup = popupRef.current;
    if (!popup || !anchorEl || isMobileLayout) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    setPosition(computePosition(anchorRect, popupRect));
  }, [anchorEl, isMobileLayout]);

  useLayoutEffect(() => {
    updatePosition();
  }, [updatePosition, member.id, isMobileLayout]);

  useEffect(() => {
    if (!anchorEl || isMobileLayout) return;

    const handleReposition = () => updatePosition();

    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [anchorEl, isMobileLayout, updatePosition]);

  if (!mounted) return null;

  const popupStyle: CSSProperties | undefined = isMobileLayout
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

  return createPortal(
    <div className="team-profile-overlay" role="presentation">
      <button
        aria-label="Cerrar perfil"
        className="team-profile-backdrop"
        onClick={onClose}
        type="button"
      />
      <div
        ref={popupRef}
        className={`team-profile-popup${position?.placement === "above" ? " team-profile-popup-above" : ""}`}
        style={popupStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`team-profile-name-${member.id}`}
        id={`team-profile-${member.id}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          aria-label="Cerrar perfil"
          className="team-profile-close"
          onClick={onClose}
          type="button"
        >
          <CloseIcon />
        </button>

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
    </div>,
    document.body,
  );
}
