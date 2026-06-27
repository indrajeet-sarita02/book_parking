'use client';
import { Button } from '@/components/ui/button';

export function Pagination({ page = 1, totalPages = 1, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onChange?.(page - 1)}
        >
          ← Prev
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onChange?.(page + 1)}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
