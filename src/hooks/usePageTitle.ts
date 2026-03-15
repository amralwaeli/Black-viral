import { useEffect } from 'react';

/**
 * Helper hook for updating the document title in a standardized way.
 * It appends the site brand after a separator.
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | Black Viral Athletic Club`
      : 'Black Viral Athletic Club';
  }, [title]);
}
