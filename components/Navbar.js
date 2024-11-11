import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = ({ authenticated }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.status === 200) {
        router.push("/login");
      } else {
        alert("Çıkış yapılamadı.");
      }
    } catch (error) {
      console.error(error);
      alert("Çıkış yapılırken bir hata oluştu.");
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-xl font-bold cursor-pointer">
            OMA's Issue Chasing System
          </span>
        </Link>
        <div className="flex space-x-4">
          <Link href="/">
            <span className="text-gray-300 hover:text-white px-3 cursor-pointer">
              Ana Sayfa
            </span>
          </Link>
          <Link href="/about">
            <span className="text-gray-300 hover:text-white px-3 cursor-pointer">
              Proje Hakkında
            </span>
          </Link>
          {!authenticated ? (
            <>
              <Link href="/login">
                <span className="text-gray-300 hover:text-white px-3 cursor-pointer">
                  Giriş Yap
                </span>
              </Link>
              <Link href="/register">
                <span className="text-gray-300 hover:text-white px-3 cursor-pointer">
                  Kayıt Ol
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/non-existing-page">
                <span className="text-gray-300 hover:text-white px-3 cursor-pointer">
                  Hata Sayfası
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white px-3"
              >
                Çıkış Yap
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
