import { Link, useNavigate } from 'react-router-dom';
import { Search, Layers, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useComponentStore } from '@/stores/component-store';

export function Navbar() {
  const navigate = useNavigate();
  const { searchComponents } = useComponentStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchValue('');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
      searchComponents(searchValue.trim());
      navigate(`/explore?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <Layers className="h-6 w-6 text-primary-600" />
            <span>SaaS UI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/explore"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              탐색
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setSearchOpen(true);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-100"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">검색...</span>
            <kbd className="hidden rounded border border-gray-200 bg-white px-1.5 py-0.5 text-xs text-gray-400 sm:inline">
              ⌘K
            </kbd>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-colors hover:text-gray-700"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => {
              setSearchOpen(false);
              setSearchValue('');
            }}
          />
          <form
            onSubmit={handleSearch}
            className="relative z-10 w-full max-w-lg rounded-xl border border-gray-200 bg-white p-4 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="컴포넌트 검색..."
                className="flex-1 bg-transparent text-base outline-none placeholder:text-gray-400"
              />
              <kbd className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-400">
                ESC
              </kbd>
            </div>
          </form>
        </div>
      )}
    </header>
  );
}
