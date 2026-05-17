"use client";

import { trackEvent } from "@/lib/analytics";

const LINKTREE_URL = "https://linktr.ee/chatgptree.ai";

export function CommunityLink() {
  const handleClick = () => {
    trackEvent("linktree_clicked");
  };

  return (
    <a
      href={LINKTREE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="
        text-xs text-muted-foreground/50
        hover:text-primary/70
        transition-colors
      "
    >
      enter the grove &rarr;
    </a>
  );
}
