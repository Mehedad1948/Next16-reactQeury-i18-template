import { useQueryState, parseAsBoolean } from 'nuqs';

export function useUrlModal(key: string) {
  const [isOpen, setIsOpen] = useQueryState(
    key,
    parseAsBoolean.withDefault(false).withOptions({
      history: 'push', // Allows Back Button usage
      shallow: true,   // <--- CRITICAL: No server round-trip / No refetch
      clearOnDefault: true 
    })
  );

  return {
    isOpen,
    setIsOpen,
  };
}
