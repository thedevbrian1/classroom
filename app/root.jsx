import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/tailwind.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const sidenavItems = ['Class', 'Archived classes', 'Settings'];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="text-brand-gray">
        <header className="flex justify-between px-16 py-8">
          <img src="/logo.png" alt="Classroom logo" className="max-w-full" />
          <img src="/usericon.png" alt="User icon" className="object-contain max-w-full" />
        </header>
        <main>
          <div className="w-full flex gap-8 divide-x mt-8">
            <div className="w-72 h-screen">
              {/* Sidebar */}

              <ul className="divide-y divide-solid mt-10">
                {sidenavItems.map((item, index) => (
                  <li key={index} className={`px-10 py-4 w-full hover:bg-brand-orange transition ease-in-out duration-300 ${index === 0} ? 'bg-brand-orange': ''`}>{item}</li>
                ))}
              </ul>
            </div>
            {/* Main content */}
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
