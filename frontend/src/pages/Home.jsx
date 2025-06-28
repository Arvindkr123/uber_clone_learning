import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex">
      <div className="hidden sm:block left bg-cover bg-center bg-[url(https://imgs.search.brave.com/e-pax145Ma163xzzLaNqNC-O69gvPMg_OOzvQucsafk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dWJlci1hc3NldHMu/Y29tL2ltYWdlL3Vw/bG9hZC9mX2F1dG8s/cV9hdXRvOmVjbyxj/X2ZpbGwsaF8zNjgs/d181NTIvdjE2NDc0/Nzg0MzcvYXNzZXRz/L2IwL2VhMTNkYy05/ZDk5LTQyNDktYjU4/MS0yZjRiZTMzOTdm/YTcvb3JpZ2luYWwv/c3ViZmVhdHVyZS0z/X3ByaW9yaXR5LXNl/cnZpY2UtMngucG5n)] h-screen flex justify-between pt-8 flex-col w-full bg-red-400"></div>
      <div className="bg-cover bg-center bg-[url(https://imgs.search.brave.com/I31KusjJj30HWvQlY_oeBP6IlZO8yYPfpiDVinpSoGs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzc2LzgxLzgz/LzM2MF9GXzI3Njgx/ODMwNF9LZmlpd0N0/bWowOThvSUNXMWtz/ZGZrWnBIZFdreFVu/OC5qcGc)] h-screen flex justify-between pt-8 flex-col w-full bg-red-400">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white py-4 px-3 pb-7">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to={"/login"}
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
