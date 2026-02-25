import { cn } from '@/lib/utils';

interface ProfileCardProps {
  name: string;
  role: string;
  avatarUrl?: string;
  onAction?: () => void;
  actionLabel?: string;
  gradient?: string;
  className?: string;
}

export function ProfileCard({
  name,
  role,
  avatarUrl,
  onAction,
  actionLabel = 'Follow',
  gradient = 'from-purple-600 via-indigo-500 to-violet-400',
  className,
}: ProfileCardProps) {
  return (
    <div
      className={cn(
        'mx-auto w-[190px] rounded-xl bg-gradient-to-br pt-3',
        gradient,
        className
      )}
    >
      {/* Avatar */}
      <div className="mx-auto mt-5 flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-full bg-gray-200">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-2xl font-bold text-gray-500">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* Info */}
      <span className="mt-3 block text-center text-lg font-semibold text-white">
        {name}
      </span>
      <p className="mt-1 text-center text-sm text-white/80">{role}</p>

      {/* Action */}
      <button
        onClick={onAction}
        className="mx-auto mt-7 block rounded-lg bg-gray-200 px-6 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
      >
        {actionLabel}
      </button>

      {/* Bottom padding */}
      <div className="h-6" />
    </div>
  );
}
