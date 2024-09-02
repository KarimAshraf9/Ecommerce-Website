import errorPage from "../../assets/images/NotFound.png";

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-55px)] flex items-center w-full">
      <img src={errorPage} className="object-cover" alt="Error page" />
    </section>
  );
}
