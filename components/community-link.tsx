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
        text-[10px] text-muted-foreground/25
        hover:text-muted-foreground/50
        transition-colors duration-500
        tracking-wider
      "
    >
      join the grove
    </a>
  );
}
