import "./globals.css";
import Nav from "./components/Nav.jsx";

export const metadata = {
  title: "Flux",
  description: "Stream movies and TV shows",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <div className="pt-[76px]">{children}</div>
      </body>
    </html>
  );
}
