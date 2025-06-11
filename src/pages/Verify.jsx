import { useSearchParams } from 'react-router-dom';

export default function Verify() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const desc = searchParams.get("desc");
  const date = searchParams.get("date");

  if (!name || !desc || !date) {
    return <div className="text-red-500 text-center mt-10">Invalid or incomplete certificate link.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-2xl font-bold text-green-600 mb-4">This certificate is verified</h1>

      <div
        className="relative w-[800px] h-[600px] bg-no-repeat bg-contain"
        style={{ backgroundImage: `url('../assets/Certificate.png')` }}
      >
        <div className="absolute top-[220px] left-[80px] text-[24px] font-bold">{name}</div>
        <div className="absolute top-[300px] left-[80px] text-[18px]">{desc}</div>
        <div className="absolute top-[380px] left-[80px] text-[16px]">{date}</div>
      </div>
    </div>
  );
}