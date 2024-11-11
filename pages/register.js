
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserIdFromCookies } from '../lib/auth';

export default function Register({ authenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.replace('/');
    }
  }, [authenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.status === 201) {
      router.push('/');
    } else {
      setError(data.message);
    }
  };

  if (authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Kullanıcı Adı</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Kullanıcı adınızı girin"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Şifre</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Şifrenizi girin"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Kayıt Ol
          </button>
        </form>
        <p className="mt-4 text-center">
          Zaten hesabınız var mı?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Giriş Yapın
          </a>
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const userId = getUserIdFromCookies(req);
  const authenticated = userId ? true : false;

  return {
    props: {
      authenticated,
    },
  };
}
