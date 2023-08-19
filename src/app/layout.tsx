import SideBar from "@commonSideBar";
import "@styles";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang = "en">
      <body>
      {/* 전체 화면 */}
      <div className="flex flex-row">
        {/* 사이드 바 1/4 */}
        <div className="bg-gray-900 text-white items-center h-screen w-1/5 p-4">
          <SideBar />
        </div>
        {/* 컨텐츠 3/4 */}
        <div className="bg-sky-950 text-white items-center h-screen w-4/5">
          {children}
        </div>
      </div>
      </body>
    </html>
  );
}
