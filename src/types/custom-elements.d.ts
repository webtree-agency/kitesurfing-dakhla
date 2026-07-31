// Typdeklaration fuer das <l-line-wobble>-Custom-Element (ldrs-Preloader).
// React 19: JSX.IntrinsicElements wird ueber das 'react'-Modul augmentiert.

import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'l-line-wobble': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        size?: string;
        stroke?: string;
        'bg-opacity'?: string;
        speed?: string;
        color?: string;
      };
    }
  }
}
