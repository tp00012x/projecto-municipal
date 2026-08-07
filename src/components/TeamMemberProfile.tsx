"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
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
  isMobile: boolean;
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
  isMobile,
  onPointerEnter,
  onPointerLeave,
}: TeamMemberProfileProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<ProfilePosition | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    const popup = popupRef.current;
    if (!popup || !anchorEl) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    setPosition(computePosition(anchorRect, popupRect));
  }, [anchorEl]);

  useLayoutEffect(() => {
    updatePosition();
  }, [updatePosition, member.id, isMobile]);

  useEffect(() => {
    if (!anchorEl) return;

    const handleReposition = () => updatePosition();

    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [anchorEl, updatePosition]);

  if (!mounted) return null;

  const popupStyle: CSSProperties = isMobile
    ? {
        position: "fixed",
        left: VIEWPORT_MARGIN,
        right: VIEWPORT_MARGIN,
        bottom: VIEWPORT_MARGIN,
        top: "auto",
      }
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
    <div
      ref={popupRef}
      className={`team-profile-popup${isMobile ? " team-profile-popup-mobile" : ""}${position?.placement === "above" ? " team-profile-popup-above" : ""}`}
      style={popupStyle}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
      role="tooltip"
      id={`team-profile-${member.id}`}
    >
      <div className="team-profile-accent" aria-hidden="true" />

      <div className="team-profile-content">
        <p className="team-profile-role">
          {member.position} #{member.number}
        </p>
        <h4 className="team-profile-name">{member.name}</h4>
        <p className="team-profile-bio">{member.bio}</p>
      </div>
    </div>,
    document.body,
  );
}
