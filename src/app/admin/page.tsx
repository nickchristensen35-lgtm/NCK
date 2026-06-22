'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 font-mono">
      <div className="w-full max-w-sm">
        {/* Terminal header */}
        <div className="bg-gray-900 rounded-t-lg px-4 py-3 flex items-center gap-2 border border-gray-800">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 text-gray-500 text-xs">nck-admin — bash</span>
        </div>

        <div className="bg-gray-900 border border-t-0 border-gray-800 rounded-b-lg px-6 py-6">
          <p className="text-green-400 text-sm mb-1">Norwood Commercial Kitchen</p>
          <p className="text-gray-500 text-xs mb-6">Admin access only. Unauthorised use prohibited.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs block mb-1">$ username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-green-400 text-sm px-3 py-2 rounded focus:outline-none focus:border-green-500 placeholder-gray-600"
                placeholder="enter username"
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">$ password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-green-400 text-sm px-3 py-2 rounded focus:outline-none focus:border-green-500 placeholder-gray-600"
                placeholder="enter password"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs">✗ {error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-black font-bold text-sm py-2 rounded transition-colors duration-150"
            >
              {loading ? 'authenticating...' : '→ login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
