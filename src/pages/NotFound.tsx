import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const NotFound = () => {
  useSEO({
    title: "페이지를 찾을 수 없음",
    description: "요청한 Uikki 페이지를 찾을 수 없습니다.",
  });

  return (
    <section className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center text-center">
      <p className="text-sm font-bold tracking-[0.3em] text-blue-600 uppercase dark:text-blue-400">
        404
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-900 dark:text-slate-100">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        주소가 변경되었거나 존재하지 않는 페이지입니다.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:ring-offset-slate-950"
      >
        홈으로 돌아가기
      </Link>
    </section>
  );
};

export default NotFound;
