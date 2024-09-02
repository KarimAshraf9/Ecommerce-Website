export default function OfflineToast() {
  return (
    <div className="text-center p-3 bg-red-600 flex justify-center items-center text-md text-white fixed bottom-5 start-5 rounded ">
      <i className="fa-solid fa-wifi me-2"></i>
      <span>Internet Issue</span>
    </div>
  );
}
