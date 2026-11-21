/**
 * BLOOM — Clean SVG Icon System
 * High-performance, self-contained SVG icons styled for Apple Liquid Glass.
 */

export type IconName =
  | 'sun'
  | 'calendar'
  | 'book-open'
  | 'clipboard-check'
  | 'flower'
  | 'sparkles'
  | 'timer'
  | 'arrow-right'
  | 'arrow-left'
  | 'check'
  | 'x'
  | 'play'
  | 'pause'
  | 'rotate-ccw'
  | 'bookmark'
  | 'alert-circle'
  | 'lock'
  | 'unlock'
  | 'external-link'
  | 'plus'
  | 'trash'
  | 'edit'
  | 'shield-check';

export function icon(name: IconName, size = 18, className = 'icon'): string {
  const common = `class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;

  switch (name) {
    case 'sun':
      return `<svg ${common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
    case 'calendar':
      return `<svg ${common}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`;
    case 'book-open':
      return `<svg ${common}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
    case 'clipboard-check':
      return `<svg ${common}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`;
    case 'flower':
      return `<svg ${common}><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m4.5 3a4.5 4.5 0 1 1-4.5 4.5M16.5 12H15m-3 4.5a4.5 4.5 0 1 1-4.5-4.5M12 16.5V15m-4.5-3A4.5 4.5 0 1 1 12 7.5M7.5 12H9"/><circle cx="12" cy="12" r="2"/></svg>`;
    case 'sparkles':
      return `<svg ${common}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>`;
    case 'timer':
      return `<svg ${common}><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>`;
    case 'arrow-right':
      return `<svg ${common}><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    case 'arrow-left':
      return `<svg ${common}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`;
    case 'check':
      return `<svg ${common}><polyline points="20 6 9 17 4 12"/></svg>`;
    case 'x':
      return `<svg ${common}><path d="M18 6 6 18M6 6l12 12"/></svg>`;
    case 'play':
      return `<svg ${common}><polygon points="6 3 20 12 6 21 6 3"/></svg>`;
    case 'pause':
      return `<svg ${common}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
    case 'rotate-ccw':
      return `<svg ${common}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`;
    case 'bookmark':
      return `<svg ${common}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`;
    case 'alert-circle':
      return `<svg ${common}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;
    case 'lock':
      return `<svg ${common}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
    case 'unlock':
      return `<svg ${common}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`;
    case 'external-link':
      return `<svg ${common}><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`;
    case 'plus':
      return `<svg ${common}><path d="M5 12h14M12 5v14"/></svg>`;
    case 'trash':
      return `<svg ${common}><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;
    case 'edit':
      return `<svg ${common}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`;
    case 'shield-check':
      return `<svg ${common}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`;
    default:
      return `<svg ${common}><circle cx="12" cy="12" r="10"/></svg>`;
  }
}
