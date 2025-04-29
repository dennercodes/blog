import * as AvatarPrimitive from '@radix-ui/react-avatar';

interface AvatarProps {
  initials: string;
}

export function Avatar({ initials }: AvatarProps) {
  return (
    <AvatarPrimitive.Root className="inline-flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 align-middle">
      <AvatarPrimitive.Fallback className="leading-1 flex h-full w-full items-center justify-center font-medium text-white">
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
