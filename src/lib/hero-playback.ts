/**
 * Hero video playback
 * -------------------
 * Contract:
 * - Autoplay is only attempted while muted + playsInline (browser policy).
 * - Poster/image remains visible until playback actually starts.
 * - If autoplay is blocked, we stay on the poster. No pause-retry loops.
 * - Unmute is a user gesture; playback continues from the same element.
 */

export type HeroPlaybackState = "poster" | "playing" | "unavailable";

export function configureHeroVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;
  video.preload = "auto";
}

export async function startHeroPlayback(
  video: HTMLVideoElement,
): Promise<HeroPlaybackState> {
  configureHeroVideo(video);

  try {
    await video.play();
    return video.paused ? "poster" : "playing";
  } catch {
    return "unavailable";
  }
}

export async function setHeroMuted(
  video: HTMLVideoElement,
  muted: boolean,
): Promise<void> {
  video.muted = muted;

  // User gesture path: if they unmute, ensure playback is running.
  if (!muted && video.paused) {
    try {
      await video.play();
    } catch {
      // Ignore — browser may still block; UI stays honest via muted state.
    }
  }
}
